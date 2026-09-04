import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <span className="material-symbols-outlined text-[18px]">share</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
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
          </ul>
        </div>

        {/* Categories */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-label-md text-primary font-bold text-xs uppercase tracking-widest">
            Product Range
          </h3>
          <ul className="space-y-2.5 text-sm text-stone-300 font-light">
            <li><Link to="/products" className="hover:text-white transition-colors">Glazed Vitrified Tiles</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Polished Vitrified Tiles</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Ceramic Wall Tiles</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Outdoor & Parking Tiles</Link></li>
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
              <span>123 Artisan Lane, Industrial Estate, Dindigul, TN 624001</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">mail</span>
              <a href="mailto:sales@oviyaceramics.com" className="hover:text-white transition-colors">sales@oviyaceramics.com</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">call</span>
              <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto pt-6 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <p>© {new Date().getFullYear()} Oviya Ceramics. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
