import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, openCart } = useCart();

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
  const navClasses = `fixed top-0 left-0 right-0 w-full max-w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md text-on-surface ${
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
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-cinzel font-bold text-lg sm:text-xl md:text-2xl tracking-[0.12em] text-stone-900 uppercase shrink-0">
          OVIYA CERAMICS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-xs md:text-sm uppercase tracking-[0.1em] hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary font-bold border-b-2 border-primary pb-0.5' : 'font-semibold text-stone-800'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Cart Button */}
          <button
            onClick={openCart}
            type="button"
            className="relative p-2 text-stone-700 hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-stone-100"
            aria-label="View Cart"
            title="View Quote Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <Link 
            to="/contact-us"
            className="text-xs md:text-sm uppercase tracking-wider font-semibold px-5 py-2 border transition-all border-primary text-primary hover:bg-primary hover:text-white rounded-xs shadow-xs"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Header Actions */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={openCart}
            type="button"
            className="relative p-2 text-stone-700 hover:text-primary transition-colors"
            aria-label="View Cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="flex flex-col items-center justify-center gap-[6px] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-6 h-[2px] transition-all bg-on-surface ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`block w-6 h-[2px] transition-all bg-on-surface ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-[2px] transition-all bg-on-surface ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
        </div>
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
