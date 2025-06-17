import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Star,
  ThumbsUp,
  FileText,
  BookOpen,
  Calendar,
  Baby,
  HeartPulse,
  Stethoscope,
  Syringe,
  Microscope,
  Activity,
  Shield,
  Search,
  Pill,
  FlaskConical,
  Users,
  Hourglass,
  Droplet,
  Hospital,
  TestTube,
  CalendarCheck,
  ClipboardList,
  User,
  AlertCircle,
  Bell,
  Bookmark,
  Heart,
  UserCheck,
  UserPlus,
  Thermometer,
  TimerReset,
  ScanLine,
  Settings,
  Eye,
  EyeOff,
  EyeIcon,
  ZoomIn,
  ZoomOut,
  Focus,
  Glasses,
  Flashlight,
  Monitor,
  Camera,
  Sun,
  Moon,
  ScanSearch,
  Folder,
  FilePlus,
  FileSearch,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Tablet,
  Laptop,
  Cpu,
  Brain,
  Dna,
  ThermometerSun,
  ThermometerSnowflake,
  Bandage,
  HeartCrack,
  TestTubes,
  ClipboardCheck,
  ClipboardX,
  FileWarning,
  FileCheck,
  FileX,
  FileClock,
  FileHeart,
  Beaker,
  Atom,
  Layers,
  AlertTriangle,
  MapPin,
  Globe,
  Scan,
  ScanEye,
  XCircle,
  PlusCircle,
  CheckCircle,
  Loader2,
  Cloud,
  CloudFog,
  CloudMoon,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  SunMoon,
  Radiation,
  Repeat,
  Rocket
} from 'lucide-react';

export const iconMap = {
  Star,
  ThumbsUp,
  FileText,
  BookOpen,
  Calendar,
  Baby,
  HeartPulse,
  Stethoscope,
  Syringe,
  Microscope,
  Activity,
  Shield,
  Search,
  Pill,
  FlaskConical,
  Users,
  Hourglass,
  Droplet,
  Hospital,
  TestTube,
  CalendarCheck,
  ClipboardList,
  User,
  AlertCircle,
  Bell,
  Bookmark,
  Heart,
  UserCheck,
  UserPlus,
  Thermometer,
  TimerReset,
  ScanLine,
  Settings,
  Eye,
  EyeOff,
  EyeIcon,
  ZoomIn,
  ZoomOut,
  Focus,
  Glasses,
  Flashlight,
  Monitor,
  Camera,
  Sun,
  Moon,
  ScanSearch,
  Folder,
  FilePlus,
  FileSearch,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Tablet,
  Laptop,
  Cpu,
  Brain,
  Dna,
  ThermometerSun,
  ThermometerSnowflake,
  Bandage,
  HeartCrack,
  TestTubes,
  ClipboardCheck,
  ClipboardX,
  FileWarning,
  FileCheck,
  FileX,
  FileClock,
  FileHeart,
  Beaker,
  Atom,
  Layers,
  AlertTriangle,
  MapPin,
  Globe,
  Scan,
  ScanEye,
  XCircle,
  PlusCircle,
  Loader2,
  Cloud,
  CloudFog,
  CloudMoon,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  SunMoon,
  Radiation,
  Repeat,
  Rocket
};

export interface DoctorExpertise {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

// Used to map icon string names to actual Lucide React components

export type IconName = keyof typeof iconMap;

export const useDoctorExpertise = () => {
  const [expertise, setExpertise] = useState<DoctorExpertise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchExpertise();
  }, []);

  const fetchExpertise = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('csm_doctor_expertise_latest')
        .select('*')
        .order('sort_order');

      if (error) throw error;

      if (data && data.length > 0) {
        setExpertise(data);
      } else {
        console.log('No expertise data found');
        setExpertise(getDefaultExpertise());
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error(`Error fetching expertise data: ${err}`);
      // Set default data as fallback
      setExpertise(getDefaultExpertise());
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultExpertise = (): DoctorExpertise[] => [
    {
      id: '1',
      title: 'Cataract Surgery',
      description: 'Specializing in phacoemulsification and premium IOL implantation for optimal visual outcomes.',
      icon: 'Eye',
      sort_order: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'LASIK & Refractive Surgery',
      description: 'Cutting-edge vision correction procedures to reduce or eliminate dependency on glasses.',
      icon: 'Glasses',
      sort_order: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Glaucoma Management',
      description: 'Comprehensive approach to glaucoma care, including medication, laser therapy, and surgical interventions.',
      icon: 'Shield',
      sort_order: 3,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Corneal Disorders',
      description: 'Treatment of various corneal conditions, including keratoconus and corneal infections.',
      icon: 'Microscope',
      sort_order: 4,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Diabetic Eye Care',
      description: 'Specialized care for diabetic retinopathy and other diabetes-related eye complications.',
      icon: 'Activity',
      sort_order: 5,
      created_at: new Date().toISOString()
    }
  ];

  const updateExpertise = async (id: string, data: Partial<DoctorExpertise>) => {
    try {
      const { error } = await supabase
        .from('csm_doctor_expertise_latest')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      await fetchExpertise();
      return true;
    } catch (err) {
      console.error(`Error updating expertise: ${err}`);
      return false;
    }
  };

  const addExpertise = async (expertiseItem: Omit<DoctorExpertise, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('csm_doctor_expertise_latest')
        .insert([expertiseItem]);

      if (error) throw error;

      await fetchExpertise();
      return true;
    } catch (err) {
      console.error(`Error adding expertise: ${err}`);
      return false;
    }
  };

  const deleteExpertise = async (id: string) => {
    try {
      const { error } = await supabase
        .from('csm_doctor_expertise_latest')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchExpertise();
      return true;
    } catch (err) {
      console.error(`Error deleting expertise: ${err}`);
      return false;
    }
  };

  return {
    expertise,
    isLoading,
    error,
    refreshExpertise: fetchExpertise,
    updateExpertise,
    addExpertise,
    deleteExpertise
  };
}; 