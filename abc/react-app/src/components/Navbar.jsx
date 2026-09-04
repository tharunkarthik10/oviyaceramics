import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar styling based on scroll position and route
  const navClasses = `fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md text-on-surface ${
    isScrolled ? 'py-2' : 'py-3'
  }`;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Products', path: '/products' },
    { name: 'Catalogues', path: '/catalogues' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav className={navClasses}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-headline-md font-bold text-xl md:text-2xl tracking-widest uppercase">
          OVIYA CERAMICS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`font-label-md text-xs md:text-sm uppercase tracking-wider hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary font-bold' : 'font-medium text-on-surface/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact-us"
            className="font-label-md text-xs md:text-sm uppercase tracking-wider px-6 py-2 border transition-colors border-primary text-primary hover:bg-primary hover:text-white"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex flex-col items-center justify-center gap-[6px] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-6 h-[2px] transition-all bg-on-surface ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`block w-6 h-[2px] transition-all bg-on-surface ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-[2px] transition-all bg-on-surface ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-surface-variant flex flex-col py-4 px-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`font-label-md text-sm uppercase tracking-widest py-3 border-b border-surface-variant text-on-surface hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact-us" 
            className="font-label-md text-sm uppercase tracking-widest py-3 text-primary font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
