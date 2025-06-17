import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Department {
  id: string;
  department: string;
  tagline: string;
  doctor_name: string;
  doctor_bio: string;
  link_text: string;
  link_url: string;
}

interface DepartmentService {
  id: string;
  department: string;
  service: string;
  department_id?: string | null;
}

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentServices, setDepartmentServices] = useState<Record<string, DepartmentService[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);
  
  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      // Fetch departments
      const { data: deptData, error: deptError } = await supabase
        .from('csm_specialities_departments')
        .select('*')
        .order('created_at');
      
      if (deptError) throw deptError;
      
      // Fetch all services
      const { data: servicesData, error: servicesError } = await supabase
        .from('csm_specialities_departments_services')
        .select('*')
        .order('created_at');
      
      if (servicesError) throw servicesError;
      
      // Build a mapping from department name ➜ id to support look-ups by id
      const nameToId: Record<string, string> = {};
      (deptData || []).forEach((dept) => {
        nameToId[dept.department] = dept.id;
      });

      const servicesByDept: Record<string, DepartmentService[]> = {};

      servicesData?.forEach((service) => {
        const key = nameToId[service.department] || service.department;
        if (!servicesByDept[key]) {
          servicesByDept[key] = [];
        }
        servicesByDept[key].push(service as DepartmentService);
      });
      
      setDepartments(deptData || []);
      setDepartmentServices(servicesByDept);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error(`Error fetching departments: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    departments, 
    departmentServices, 
    isLoading, 
    error, 
    refreshData: fetchDepartments 
  };
};
