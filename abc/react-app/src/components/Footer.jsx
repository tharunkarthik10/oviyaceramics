import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PolicyModal from './PolicyModal';

const Footer = () => {
  const [policyType, setPolicyType] = useState(null); // 'privacy' or 'terms'

  return (
    <footer className="w-full bg-[#1C1917] text-white pt-16 pb-8 px-6 md:px-12 lg:px-16 border-t border-stone-800">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
        
        {/* Brand & Mission */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="font-headline-md text-2xl font-bold tracking-widest text-white">
            OVIYA CERAMICS
          </h2>
          <p className="font-body-md text-stone-400 text-sm leading-relaxed max-w-sm font-light">
            India's leading manufacturer of ceramic and vitrified tiles. Delivering world-class architectural craftsmanship, durability, and innovation.
          </p>
          <div className="flex gap-3 pt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
              title="Instagram"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
              title="Facebook"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
              title="LinkedIn"
            >
              <span className="material-symbols-outlined text-[18px]">work</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-label-md text-primary font-bold text-xs uppercase tracking-widest">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-sm text-stone-300 font-light">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link to="/catalogues" className="hover:text-white transition-colors">Catalogues</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-label-md text-primary font-bold text-xs uppercase tracking-widest">
            Product Range
          </h3>
          <ul className="space-y-2.5 text-sm text-stone-300 font-light">
            <li><Link to="/products?category=Glazed Vitrified" className="hover:text-white transition-colors">Glazed Vitrified Tiles</Link></li>
            <li><Link to="/products?category=Polished Vitrified" className="hover:text-white transition-colors">Polished Vitrified Tiles</Link></li>
            <li><Link to="/products?category=Wall Tiles" className="hover:text-white transition-colors">Ceramic Wall Tiles</Link></li>
            <li><Link to="/products?category=Outdoor Tiles" className="hover:text-white transition-colors">Outdoor & Parking Tiles</Link></li>
            <li><Link to="/catalogues" className="hover:text-white transition-colors">Digital Catalogues</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-label-md text-primary font-bold text-xs uppercase tracking-widest">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-stone-300 font-light">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">location_on</span>
              <span>Bathalagundu Road, near saravana Mill, opp. Dindigul, Pillayarnattam, Tamil Nadu 624002</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">mail</span>
              <a href="mailto:info@oviyaceramics.com" className="hover:text-white transition-colors">info@oviyaceramics.com</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">call</span>
              <a href="tel:+919944686000" className="hover:text-white transition-colors">+91 99446 86000</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto pt-6 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <p>© {new Date().getFullYear()} Oviya Ceramics. All Rights Reserved.</p>
        <div className="flex gap-6 items-center">
          <button 
            onClick={() => setPolicyType('privacy')}
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setPolicyType('terms')}
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={!!policyType}
        onClose={() => setPolicyType(null)}
        title={policyType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
        content={
          policyType === 'privacy' ? (
            <>
              <p>Oviya Ceramics Ltd is committed to respecting your privacy and protecting your personal data.</p>
              <h4 className="font-bold text-stone-900 mt-2">1. Data Collection</h4>
              <p>We collect information you provide directly to us when requesting tile quotes, downloading digital catalogues, or reaching out via WhatsApp and email forms.</p>
              <h4 className="font-bold text-stone-900 mt-2">2. Use of Information</h4>
              <p>Your details are strictly used to fulfill architectural quote requests, arrange dealer samples, and provide updates regarding your orders.</p>
            </>
          ) : (
            <>
              <p>Welcome to Oviya Ceramics Ltd. By accessing our site and services, you agree to comply with our terms.</p>
              <h4 className="font-bold text-stone-900 mt-2">1. Product Specifications</h4>
              <p>Tile dimensions, color tones, and textures displayed online are representative samples. Minor natural variations may occur in fired ceramic batches.</p>
              <h4 className="font-bold text-stone-900 mt-2">2. Warranty & Delivery</h4>
              <p>All tile dispatches undergo 5-step stress testing at our Dindigul plant. Freight and delivery schedules are confirmed upon quote approval.</p>
            </>
          )
        }
      />

    </footer>
  );
};

export default Footer;
