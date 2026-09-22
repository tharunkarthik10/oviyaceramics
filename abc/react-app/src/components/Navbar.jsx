import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, openCart } = useCart();
  const { isAdmin } = useAuth();

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

          {isAdmin && (
            <Link 
              to="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 text-[#e6ca85] hover:bg-stone-800 text-xs font-bold rounded uppercase tracking-wider border border-[#9E7D3B]/40 shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-sm text-[#9E7D3B]">admin_panel_settings</span>
              <span>Admin Panel</span>
            </Link>
          )}

          <a
            href="https://wa.me/919080897776?text=Hi%20Oviya%20Ceramics,%20I'm%20interested%20in%20your%20tiles."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-bold rounded uppercase tracking-wider border border-[#25D366]/30 shadow-xs transition-all"
            title="Chat on WhatsApp (+91 90808 97776)"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <Link 
            to="/contact-us"
            className="text-xs md:text-sm uppercase tracking-wider font-semibold px-5 py-2 border transition-all border-primary text-primary hover:bg-primary hover:text-white rounded-xs shadow-xs"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Header Actions */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="https://wa.me/919080897776?text=Hi%20Oviya%20Ceramics,%20I'm%20interested%20in%20your%20tiles."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#128C7E] hover:text-[#25D366] transition-colors"
            title="Chat on WhatsApp (+91 90808 97776)"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>

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
          {isAdmin && (
            <Link 
              to="/admin/dashboard" 
              className="font-label-md text-sm uppercase tracking-widest py-3 text-[#9E7D3B] font-bold border-b border-surface-variant flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-base">admin_panel_settings</span>
              <span>Admin Control Panel</span>
            </Link>
          )}
          <a 
            href="https://wa.me/919080897776?text=Hi%20Oviya%20Ceramics,%20I'm%20interested%20in%20your%20tiles."
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-md text-sm uppercase tracking-widest py-3 text-[#128C7E] font-bold border-b border-surface-variant flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>WhatsApp: 9080897776</span>
          </a>
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
