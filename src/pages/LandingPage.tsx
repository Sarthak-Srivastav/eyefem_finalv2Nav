import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Shield, Beaker, Heart ,AlertTriangle} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import HeroShape from "@/components/HeroShape";
import Footer from "@/components/Footer";
import { usePageContent } from "@/hooks/usePageContent";
import { useServiceCards } from "@/hooks/useServiceCards";
import { useDepartments } from "@/hooks/useDepartments";
import { useWhyChooseUs } from "@/hooks/useWhyChooseUs";
import { MainLayout } from "@/components";
import { supabase } from '@/integrations/supabase/client';


interface DoctorSpeciality {
  id: number;
  name: string;
  specialization: string;
  image_url: string;
}

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [specialities, setSpecialities] = useState<DoctorSpeciality[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);


  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const [hoverEyeCare, setHoverEyeCare] = useState(false);
  const [hoverGynecology, setHoverGynecology] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const specialtiesRef = useRef<HTMLDivElement>(null);

  const { departments, departmentServices, isLoading } = useDepartments();
  const EYE_DEPT_ID = "5f705d17-ce8e-4c99-8d5a-03591dbbd3f6";
  const GYNE_DEPT_ID = "6066b1cf-cc97-4b3b-b75f-a8d00622adc1";

  const eyeCareDept = departments.find((d) => d.id === EYE_DEPT_ID);
  const gynecologyDept = departments.find((d) => d.id === GYNE_DEPT_ID);

  const eyeCareServices = departmentServices[EYE_DEPT_ID] ?? [];
  const gynecologyServices = departmentServices[GYNE_DEPT_ID] ?? [];
   // Default doctors as fallback
   const defaultDoctors = [
    {
      id: -1,
      name: 'Dr. Sanjeev Lehri',
      specialization: 'Ophthalmologist & Eye Surgeon',
      image_url: '/eyefemm_pic_uploads/4f0ab2f1-cfac-48ce-9d14-205a833d4973.png'
    },
    {
      id: -2,
      name: 'Dr. Nisha Bhatnagar',
      specialization: 'Gynecologist & Fertility Specialist',
      image_url: '/eyefemm_pic_uploads/8205aaa8-556e-4663-be5d-9619f8b8ddeb.png'
    }
  ];
  
  useEffect(() => {
    fetchDoctorSpecialities();
  }, []);
  
  // Helper function to ensure image URLs are properly formatted
  const formatImageUrl = (url: string) => {
    if (!url) return '';
    
    // If it's already an absolute URL (starts with http or https)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a relative path
    if (url.startsWith('/')) {
      // For local development, prepend the base URL
      return url;
    }
    
    return url;
  };
  
  const fetchDoctorSpecialities = async () => {
    setLoading(true);
    try {
      // First, check if the table exists by examining its structure
      const { data: tableInfo, error: tableError } = await supabase
        .from('csm_doctors_profile_specilities' as any)
        .select('*')
        .limit(1);
        
      if (tableError) {
        setDebugInfo(`Table error: ${tableError.message}`);
        throw new Error(`Table error: ${tableError.message}`);
      }
      
      // Fetch all data from the table
      const { data, error } = await supabase
        .from('csm_doctors_profile_specilities' as any)
        .select('*');
        
      if (error) {
        setDebugInfo(`Fetch error: ${error.message}`);
        throw new Error(`Fetch error: ${error.message}`);
      }
      
      setDebugInfo(`Data fetched: ${JSON.stringify(data)}`);
      
      if (data && data.length > 0) {
        console.log("Fetched doctor specialties:", data);
        
        // Process the image URLs and handle null safety
        const processedData = data ? data.map(doctor => {
          // Ensure doctor is an object and not null
          if (doctor && typeof doctor === 'object') {
            return {
              id: typeof doctor.id === 'number' ? doctor.id : 0,
              name: typeof doctor.name === 'string' ? doctor.name : '',
              specialization: typeof doctor.specialization === 'string' ? doctor.specialization : '',
              image_url: formatImageUrl(typeof doctor.image_url === 'string' ? doctor.image_url : '')
            };
          }
          // Fallback for null/undefined doctors
          return { id: 0, name: '', specialization: '', image_url: '' };
        }) : [];
        
        // Safety check to ensure we have processed data
        if (processedData.length > 0) {
          setSpecialities(processedData);
          setSelectedDoctorId(Number(processedData[0].id));
        } else {
          // Use default data if nothing was returned
          setDebugInfo("Using default specialties as processed data was empty");
          // Default data handling is already in the else branch below
        }
        
        // State updates are now handled in the if/else block above
      } else {
        setDebugInfo("No data found in database, using defaults");
        console.log("No doctor specialties found in database, using defaults");
        setSpecialities(defaultDoctors);
        setSelectedDoctorId(defaultDoctors[0].id);
      }
    } catch (err) {
      console.error('Error fetching doctor specialities:', err);
      setError(`Failed to load doctor specialties: ${err.message}`);
      
      // Use defaults on error
      setSpecialities(defaultDoctors);
      setSelectedDoctorId(defaultDoctors[0].id);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctorId(doctorId);
  };
  
  const getSelectedDoctor = () => {
    return specialities.find(doctor => doctor.id === selectedDoctorId);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Use a fallback image if the original fails to load
    e.currentTarget.src = '/eyefemm_pic_uploads/default-doctor.png';
    e.currentTarget.onerror = null; // Prevent infinite loop
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const initializeAOS = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({
        duration: 800,
        once: true,
        easing: "ease-in-out",
        mirror: false,
      });
    };
    initializeAOS();
    const scrollTimer = setTimeout(() => {
      if (specialtiesRef.current) {
        specialtiesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 4000);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(scrollTimer);
    };
  }, []);

  const { content, isLoading: contentLoading } =
    usePageContent("home_hero_section");
  const defaultHeading = "Specialized Healthcare for Your Unique Needs";
  const defaultDescription =
    "Experience world-class care in Eye Health and Women's Health with our team of specialists at Eyefem Healthcare.";
  const { cards: serviceCards, isLoading: serviceCardsLoading } =
    useServiceCards();
  const {
    sectionContent: whyChooseUsSection,
    benefitCards,
    isLoading: whyChooseUsLoading,
  } = useWhyChooseUs();

  return (
    <MainLayout>
      <PageTransition>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white pt-0">
          {/* Hero shapes positioned absolutely, hidden on small screens */}
          <HeroShape
            className="hidden sm:block top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
            data-aos="fade-right"
            data-aos-delay="200"
          />
          <HeroShape
            className="hidden sm:block top-3/4 left-1/5 -translate-y-1/2"
            data-aos="fade-left"
            data-aos-delay="400"
          />
          <HeroShape
            className="hidden sm:block top-2/3 right-1/4 translate-x-1/2"
            data-aos="fade-down"
            data-aos-delay="600"
          />
          <HeroShape
            className="hidden sm:block bottom-1/4 right-1/5"
            data-aos="fade-up"
            data-aos-delay="800"
          />

          <div
            className="relative z-10 text-center max-w-3xl mx-auto px-4 py-12 sm:py-0"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-white/20 rounded w-3/4 mx-auto mb-6"></div>
                <div className="h-6 bg-white/20 rounded w-full mx-auto mb-8"></div>
                <div className="h-12 bg-white/20 rounded-full w-48 mx-auto"></div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                  {content?.heading || defaultHeading}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 px-2">
                  {content?.description || defaultDescription}
                </p>
              </>
            )}
          </div>
        </div>
        {/* Our Medical Specialties Section */}
        <section
          ref={specialtiesRef}
          className="py-12 sm:py-16 md:py-20 px-4 bg-white"
          data-aos="fade-up"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Our Medical Specialties
              </h2>
              <div
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"
                data-aos="fade-up"
                data-aos-delay="200"
              ></div>
              <p
                className="text-lg text-gray-600 max-w-3xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Expert care in eye health and women's health from our team of
                specialists.
              </p>
            </div>

            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Eye Care Department Card */}
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  onMouseEnter={() => setHoverEyeCare(true)}
                  onMouseLeave={() => setHoverEyeCare(false)}
                >
                  <div
                    className={`bg-gradient-to-r from-blue-400 to-blue-500 p-6 text-white transition-all duration-300 ${hoverEyeCare ? "scale-105" : ""
                      }`}
                  >
                    <h2 className="text-2xl font-bold">
                      {eyeCareDept?.department || "Eye Care"}
                    </h2>
                    <p className="text-white/90">
                      {eyeCareDept?.tagline ||
                        "Expert treatment for all eye conditions"}
                    </p>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      {eyeCareDept?.doctor_name || "Dr. Sanjeev Lehri"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {eyeCareDept?.doctor_bio ||
                        "Specialist in treating cataracts, glaucoma, refractive errors, and other eye conditions using the latest technology and techniques."}
                    </p>

                    <div className="space-y-2 mb-6">
                      {isLoading ? (
                        Array(4)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-blue-100 rounded-full animate-pulse"></div>
                              <div className="w-32 h-4 bg-gray-100 rounded animate-pulse"></div>
                            </div>
                          ))
                      ) : (
                        eyeCareServices.map((service) => (
                          <div key={service.id} className="flex items-center gap-2">
                            <Check className="text-blue-500 h-5 w-5" />
                            <span>{service.service}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <Link
                      to={eyeCareDept?.link_url || "/eyecare"}
                      className={`w-full block text-center py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors group flex items-center justify-center ${hoverEyeCare ? "bg-blue-600" : ""
                        }`}
                    >
                      {eyeCareDept?.link_text || "Visit Eye Care Department"}
                      <ArrowRight
                        className={`ml-2 transition-transform duration-300 ${hoverEyeCare ? "translate-x-1" : ""
                          }`}
                        size={18}
                      />
                    </Link>
                  </div>
                </div>

                {/* Gynecology Department Card */}
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  onMouseEnter={() => setHoverGynecology(true)}
                  onMouseLeave={() => setHoverGynecology(false)}
                >
                  <div
                    className={`bg-gradient-to-r from-[#D946EF] to-[#d94991] p-6 text-white transition-all duration-300 ${hoverGynecology ? "scale-105" : ""
                      }`}
                  >
                    <h2 className="text-2xl font-bold">
                      {gynecologyDept?.department || "Gynecology"}
                    </h2>
                    <p className="text-white/90">
                      {gynecologyDept?.tagline ||
                        "Comprehensive women's healthcare"}
                    </p>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      {gynecologyDept?.doctor_name || "Dr. Nisha Bhatnagar"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {gynecologyDept?.doctor_bio ||
                        "Expert in women's health, fertility treatments, and IVF with a compassionate approach to address all gynecological concerns."}
                    </p>

                    <div className="space-y-2 mb-6">
                      {isLoading ? (
                        Array(4)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-pink-100 rounded-full animate-pulse"></div>
                              <div className="w-32 h-4 bg-gray-100 rounded animate-pulse"></div>
                            </div>
                          ))
                      ) : (
                        gynecologyServices.map((service) => (
                          <div key={service.id} className="flex items-center gap-2">
                            <Check className="text-[#d94991] h-5 w-5" />
                            <span>{service.service}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <Link
                      to={gynecologyDept?.link_url || "/gynecology"}
                      className={`w-full block text-center py-3 px-4 bg-[#d94991] text-white rounded-md hover:bg-[#c73a7c] transition-colors group flex items-center justify-center ${hoverGynecology ? "bg-[#c73a7c]" : ""
                        }`}
                    >
                      {gynecologyDept?.link_text ||
                        "Visit Gynecology Department"}
                      <ArrowRight
                        className={`ml-2 transition-transform duration-300 ${hoverGynecology ? "translate-x-1" : ""
                          }`}
                        size={18}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Our Expert Doctors Section */}
        <section
          className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="py-8 sm:py-12 md:py-16 px-4 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12" data-aos="fade-up">
                Our Expert Doctors
              </h2>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2].map(i => (
                    <div key={i} className="text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                      <div className="mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden bg-gray-200 animate-pulse"></div>
                      <div className="w-48 h-5 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="w-36 h-4 bg-gray-100 rounded mx-auto mb-4 animate-pulse"></div>
                      <div className="w-56 h-10 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-red-500 flex items-center justify-center gap-2">
                  <AlertTriangle size={20} />
                  <p>Error loading doctor data. Please refresh the page.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {specialities.slice(0, 2).map((doctor, index) => {
                    // Define styling based on specialty type (eye care vs gynecology)
                    const isEyeDoctor = doctor.specialization.toLowerCase().includes('ophthalm') ||
                      doctor.specialization.toLowerCase().includes('eye');

                    const styling = isEyeDoctor
                      ? {
                        borderColor: 'border-blue-200',
                        hoverBorderColor: 'group-hover:border-blue-400',
                        textColor: 'group-hover:text-blue-600',
                        buttonClass: 'border-blue-500 text-blue-500 hover:bg-blue-50 group-hover:bg-blue-500 group-hover:text-white',
                        path: '/eyecare/doctor'
                      }
                      : {
                        borderColor: 'border-[#d94991]/20',
                        hoverBorderColor: 'group-hover:border-[#d94991]',
                        textColor: 'group-hover:text-[#d94991]',
                        buttonClass: 'border-[#d94991] text-[#d94991] hover:bg-[#d94991]/10 group-hover:bg-[#d94991] group-hover:text-white',
                        path: '/gynecology/doctor'
                      };

                    return (
                      <div key={doctor.id} className="text-center group" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                        <div className={`mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 ${styling.borderColor} transition-all duration-300 ${styling.hoverBorderColor} group-hover:shadow-lg`}>
                          <img
                            src={doctor.image_url}
                            alt={doctor.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={handleImageError}
                          />
                        </div>
                        <h3 className={`text-xl font-bold mb-2 transition-colors ${styling.textColor}`}>
                          {doctor.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{doctor.specialization}</p>
                        <Link to={styling.path}>
                          <Button
                            variant="outline"
                            className={styling.buttonClass}
                          >
                            View Profile & Reviews
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            {whyChooseUsLoading ? (
              // Loading state
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 w-64 mx-auto rounded mb-4"></div>
                <div className="h-4 bg-gray-300 w-full max-w-lg mx-auto rounded mb-12"></div>
              </div>
            ) : (
              <>
                <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    Why Choose Us
                  </h2>
                  <div
                    className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  ></div>
                </div>
                <p
                  className="text-center text-gray-600 mb-16 max-w-3xl mx-auto"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {whyChooseUsSection?.description ||
                    "We combine medical expertise with a patient-centered approach to provide the best possible care."}
                </p>
              </>
            )}

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {whyChooseUsLoading ? (
                // Loading state for cards
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 rounded-lg p-8 h-64 animate-pulse"
                    ></div>
                  ))
              ) : benefitCards.length > 0 ? (
                // Dynamic benefit cards
                benefitCards.map((card, index) => {
                  // Determine which icon to use based on card title
                  let IconComponent = Shield;
                  let iconColor = "text-blue-600";
                  let bgColor = "bg-blue-100";

                  if (card.title.toLowerCase().includes("tech")) {
                    IconComponent = Beaker;
                    iconColor = "text-purple-600";
                    bgColor = "bg-purple-100";
                  } else if (
                    card.title.toLowerCase().includes("patient") ||
                    card.title.toLowerCase().includes("care")
                  ) {
                    IconComponent = Heart;
                    iconColor = "text-pink-600";
                    bgColor = "bg-pink-100";
                  }

                  return (
                    <div
                      key={card.id}
                      className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      data-aos="fade-up"
                      data-aos-delay={100 * (index + 1)}
                    >
                      <div
                        className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                      >
                        <IconComponent className={`${iconColor} h-8 w-8`} />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                  );
                })
              ) : (
                // Fallback static content
                <>
                  <div
                    className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="text-blue-600 h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">
                      Expert Specialists
                    </h3>
                    <p className="text-gray-600">
                      Our doctors are leaders in their fields with years of
                      experience and proven results.
                    </p>
                  </div>

                  <div
                    className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Beaker className="text-purple-600 h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">
                      Advanced Technology
                    </h3>
                    <p className="text-gray-600">
                      We utilize the latest medical technologies and procedures
                      for better outcomes.
                    </p>
                  </div>

                  <div
                    className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="text-pink-600 h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">
                      Patient-Centered Care
                    </h3>
                    <p className="text-gray-600">
                      We focus on your unique needs with personalized treatment
                      plans and support.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </PageTransition>
    </MainLayout>
  );
};

export default LandingPage;
