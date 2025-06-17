import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const DevelopersNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white py-3 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="h-16 w-auto flex items-center">
              <img
                src="/eyefemm_pic_uploads/6c43213d-6d60-4790-b8ff-d662e634ee59.png"
                alt="EyeFem Clinic"
                className="h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/eyecare"
              className="text-gray-800 hover:text-primary transition-colors"
            >
              Eye Care
            </Link>
            <Link
              to="/gynecology"
              className="text-gray-800 hover:text-primary transition-colors"
            >
              Gynecology
            </Link>
            <Link
              to="/gynecology/doctor"
              className="text-gray-800 hover:text-primary transition-colors"
            >
              Dr. Nisha Bhatnagar
            </Link>
            <Link
              to="/eyecare/doctor"
              className="text-gray-800 hover:text-primary transition-colors"
            >
              Dr. Sanjeev Lehri
            </Link>
            <Link
              to="/gallery"
              className="text-gray-800 hover:text-primary transition-colors"
            >
              Gallery
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                to="/eyecare"
                className="block py-2 px-3 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Eye Care
              </Link>
              <Link
                to="/gynecology"
                className="block py-2 px-3 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Gynecology
              </Link>
              <Link
                to="/gynecology/doctor"
                className="block py-2 px-3 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Dr. Nisha Bhatnagar
              </Link>
              <Link
                to="/eyecare/doctor"
                className="block py-2 px-3 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Dr. Sanjeev Lehri
              </Link>
              <Link
                to="/gallery"
                className="block py-2 px-3 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Gallery
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DevelopersNavbar;
