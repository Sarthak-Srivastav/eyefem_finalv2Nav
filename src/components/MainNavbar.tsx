import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    // { path: "/", label: "Home" },
    // { path: "/specialties", label: "Our Specialties" },
    { path: "/eyecare", label: "Eye Care" },
    { path: "/gynecology", label: "Gynecology" },
    { path: "/eyecare/doctor", label: "Dr. Sanjeev Lehri" },
    { path: "/gynecology/doctor", label: "Dr. Nisha Bhatnagar" },
    { path: "/gallery", label: "Gallery", hideOn: "/gallery" },
    // { path: "/developers", label: "Developers", hideOn: "/developers" }
  ];

  // Filter out links that should be hidden on current page
  const visibleLinks = navLinks.filter(link => link.hideOn !== location.pathname);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white py-3 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center"
          >
            <div className="h-12 w-auto flex items-center">
              <img 
                src="/eyefemm_pic_uploads/6c43213d-6d60-4790-b8ff-d662e634ee59.png"
                alt="EyeFem Clinic"
                className="h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary font-semibold"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {visibleLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 px-3 rounded-lg transition-colors hover:bg-gray-50 ${
                    location.pathname === link.path
                      ? "text-primary font-semibold bg-gray-50"
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar; 