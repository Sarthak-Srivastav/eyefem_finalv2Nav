import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Shield,
  Beaker,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import HeroShape from '@/components/HeroShape';
import Footer from '@/components/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import { useServiceCards } from '@/hooks/useServiceCards';
import { useDepartments } from '@/hooks/useDepartments';
import { useWhyChooseUs } from '@/hooks/useWhyChooseUs';
import { MainLayout } from '@/components';

const LandingPage = () => {
  const [hoverEyeCare, setHoverEyeCare] = useState(false);
  const [hoverGynecology, setHoverGynecology] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const specialtiesRef = useRef<HTMLDivElement>(null);

  const { departments, departmentServices, isLoading } = useDepartments();
  const eyeCareDept = departments.find((d) =>
    d.department.toLowerCase().includes('eye')
  );
  const gynecologyDept = departments.find((d) =>
    d.department.toLowerCase().includes('gyn')
  );
  const eyeCareServices =
    departmentServices[eyeCareDept?.department || 'Eye Care'] || [];
  const gynecologyServices =
    departmentServices[gynecologyDept?.department || 'Gynecology'] || [];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const initializeAOS = async () => {
      const AOS = (await import('aos')).default;
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
        mirror: false,
      });
    };
    initializeAOS();
    const scrollTimer = setTimeout(() => {
      if (specialtiesRef.current) {
        specialtiesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 4000);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(scrollTimer);
    };
  }, []);

  const { content, isLoading: contentLoading } = usePageContent('home_hero_section');
  const defaultHeading = 'Specialized Healthcare for Your Unique Needs';
  const defaultDescription =
    "Experience world-class care in Eye Health and Women's Health with our team of specialists at Eyefem Healthcare.";
  const { cards: serviceCards, isLoading: serviceCardsLoading } = useServiceCards();
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
                    className={`bg-gradient-to-r from-blue-400 to-blue-500 p-6 text-white transition-all duration-300 ${hoverEyeCare ? 'scale-105' : ''
                      }`}
                  >
                    <h2 className="text-2xl font-bold">
                      {eyeCareDept?.department || 'Eye Care'}
                    </h2>
                    <p className="text-white/90">
                      {eyeCareDept?.tagline ||
                        'Expert treatment for all eye conditions'}
                    </p>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      {eyeCareDept?.doctor_name || 'Dr. Sanjeev Lehri'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {eyeCareDept?.doctor_bio ||
                        'Specialist in treating cataracts, glaucoma, refractive errors, and other eye conditions using the latest technology and techniques.'}
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
                      ) : eyeCareServices.length > 0 ? (
                        eyeCareServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center gap-2"
                          >
                            <Check className="text-blue-500 h-5 w-5" />
                            <span>{service.service}</span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <Check className="text-blue-500 h-5 w-5" />
                            <span>Cataract Surgery</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="text-blue-500 h-5 w-5" />
                            <span>Glaucoma Management</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="text-blue-500 h-5 w-5" />
                            <span>Refractive Error Correction</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="text-blue-500 h-5 w-5" />
                            <span>Retinal Disorder Treatment</span>
                          </div>
                        </>
                      )}
                    </div>

                    <Link
                      to={eyeCareDept?.link_url || '/eyecare'}
                      className={`w-full block text-center py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors group flex items-center justify-center ${hoverEyeCare ? 'bg-blue-600' : ''
                        }`}
                    >
                      {eyeCareDept?.link_text || 'Visit Eye Care Department'}
                      <ArrowRight
                        className={`ml-2 transition-transform duration-300 ${hoverEyeCare ? 'translate-x-1' : ''
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
                    className={`bg-gradient-to-r from-[#D946EF] to-[#d94991] p-6 text-white transition-all duration-300 ${hoverGynecology ? 'scale-105' : ''
                      }`}
                  >
                    <h2 className="text-2xl font-bold">
                      {gynecologyDept?.department || 'Gynecology'}
                    </h2>
                    <p className="text-white/90">
                      {gynecologyDept?.tagline ||
                        "Comprehensive women's healthcare"}
                    </p>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      {gynecologyDept?.doctor_name || 'Dr. Nisha Bhatnagar'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {gynecologyDept?.doctor_bio ||
                        'Expert in women\'s health, fertility treatments, and IVF with a compassionate approach to address all gynecological concerns.'}
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
                      ) : gynecologyServices.length > 0 ? (
                        gynecologyServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center gap-2"
                          >
                            <Check className="text-[#d94991] h-5 w-5" />
                            <span>{service.service}</span>
                          </div>
                        ))
                      ) : (
                        <>
                          {[
                            'Fertility Treatments',
                            'In Vitro Fertilization (IVF)',
                            "Women's Health Consultations",
                            'Reproductive Health Care',
                          ].map((service, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Check className="text-[#d94991] h-5 w-5" />
                              <span>{service}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    <Link
                      to={gynecologyDept?.link_url || '/gynecology'}
                      className={`w-full block text-center py-3 px-4 bg-[#d94991] text-white rounded-md hover:bg-[#c73a7c] transition-colors group flex items-center justify-center ${hoverGynecology ? 'bg-[#c73a7c]' : ''
                        }`}
                    >
                      {gynecologyDept?.link_text || 'Visit Gynecology Department'}
                      <ArrowRight
                        className={`ml-2 transition-transform duration-300 ${hoverGynecology ? 'translate-x-1' : ''
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
          <div className="container mx-auto max-w-6xl">
            <h2
              className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12"
              data-aos="fade-up"
            >
              Our Expert Doctors
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Dr. Sanjeev Lehri */}
              <div
                className="text-center group"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200 transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg">
                  <img
                    src="/eyefemm_pic_uploads/4f0ab2f1-cfac-48ce-9d14-205a833d4973.png"
                    alt="Dr. Sanjeev Lehri"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/eyefemm_pic_uploads/default-doctor.png";
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-blue-600">
                  Dr. Sanjeev Lehri
                </h3>
                <p className="text-gray-600 mb-4">
                  Ophthalmologist & Eye Surgeon
                </p>
                <Link to="/eyecare/doctor">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50 group-hover:bg-blue-500 group-hover:text-white"
                  >
                    View Profile & Reviews
                  </Button>
                </Link>
              </div>

              {/* Dr. Nisha Bhatnagar */}
              <div
                className="text-center group"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-[#d94991]/20 transition-all duration-300 group-hover:border-[#d94991] group-hover:shadow-lg">
                  <img
                    src="/eyefemm_pic_uploads/8205aaa8-556e-4663-be5d-9619f8b8ddeb.png"
                    alt="Dr. Nisha Bhatnagar"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/eyefemm_pic_uploads/default-doctor.png";
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-[#d94991]">
                  Dr. Nisha Bhatnagar
                </h3>
                <p className="text-gray-600 mb-4">
                  Gynecologist & Fertility Specialist
                </p>
                <Link to="/gynecology/doctor">
                  <Button
                    variant="outline"
                    className="border-[#d94991] text-[#d94991] hover:bg-[#d94991]/10 group-hover:bg-[#d94991] group-hover:text-white"
                  >
                    View Profile & Reviews
                  </Button>
                </Link>
              </div>
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
