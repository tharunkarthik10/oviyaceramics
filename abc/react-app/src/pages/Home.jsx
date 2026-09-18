import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const REVIEWS = [
  { id: 1, name: "Mouli", location: "Trichy", avatarColor: "bg-primary", quote: "I had a fantastic experience with this company. Their customer service was friendly and responsive. Everything was handled quickly and professionally. The quality of the product/service was outstanding. I would definitely recommend them to others!" },
  { id: 2, name: "Murugan", location: "Madurai", avatarColor: "bg-stone-800", quote: "The product I received was even better than expected. It was delivered on time and in perfect condition. The craftsmanship and attention to detail were impressive. Customer support was helpful and very knowledgeable!" },
  { id: 3, name: "Jakan", location: "Karaikudi", avatarColor: "bg-primary-container", quote: "Highly durable tiles for my new commercial project. The finish is excellent and the pricing was very competitive for the market. Overall a seamless experience from selection to delivery." },
  { id: 4, name: "Priya", location: "Chennai", avatarColor: "bg-stone-900", quote: "Beautiful collection of bathroom tiles. Transformed my space completely. The design team was very patient and helped me choose the perfect combination of colors and textures." },
  { id: 5, name: "Suresh", location: "Coimbatore", avatarColor: "bg-red-800", quote: "Best quality granites in South India. Have been sourcing from them for my architectural firm for over 5 years. The consistency in quality and timely delivery is unmatched." },
  { id: 6, name: "Ananya", location: "Bangalore", avatarColor: "bg-black", quote: "The outdoor paving tiles are incredibly sturdy and weather-resistant. It completely elevated the look of my garden patio. Excellent service and very polite staff!" }
];

const DEALER_LIST = [
  { name: "JNP TILES MARKETING", location: "Pallavaram, Chennai, Tamil Nadu", email: "ksnkumaar@yahoo.co.in", tag: "Dealers" },
  { name: "VRM TRADERS", location: "Perungalathur, Chennai, Tamil Nadu 631003", email: "vrmtiles@gmail.com", tag: "Dealers" },
  { name: "RAFAYA ENTERPRISES", location: "Chrompet, Chennai, Tamil Nadu 600044", email: "inforafaya@gmail.com", tag: "Dealers" },
  { name: "OVIYA CERAMICS HEADQUARTERS", location: "Bathalagundu Road, Pillayarnattam, Dindigul 624002", email: "sindiajoseph1986@gmail.com", tag: "Branch" }
];

const Home = ({ onOpenInquiry }) => {
  const navigate = useNavigate();
  const [dealerSearch, setDealerSearch] = useState('');

  const filteredDealers = DEALER_LIST.filter(d => 
    d.name.toLowerCase().includes(dealerSearch.toLowerCase()) ||
    d.location.toLowerCase().includes(dealerSearch.toLowerCase())
  );

  const handleWhatsApp = () => {
    window.open('https://wa.me/919080897776?text=Hi%20Oviya%20Ceramics%2C%20I%20would%20like%20to%20enquire%20about%20your%20tiles.', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919080897776';
  };

  return (
    <div className="w-full bg-surface">
      {/* 1. Hero + Brand Introduction (Bottom Aligned Cinematic) */}
      <section className="relative min-h-[100vh] flex items-end px-4 sm:px-8 md:px-16 lg:px-32 pb-16 md:pb-20 overflow-hidden">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/hero_tiles_bg_1788246751274.jpg')` }}></div>
        {/* Gradient Overlay: Top half 100% bright & transparent, bottom half shaded for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-50% to-transparent z-0"></div>

        {/* Text Content - Bottom Aligned */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-start text-left">
          <span className="inline-block px-4 py-1.5 bg-primary text-white font-semibold uppercase tracking-widest text-[12px] mb-4 shadow-lg rounded-xs">
            Est. 1984
          </span>
          
          <h1 className="font-cinzel text-[36px] sm:text-[52px] md:text-[80px] lg:text-[96px] text-white mb-2 leading-[1.05] tracking-wide font-bold break-words text-shadow-strong">
            OVIYA CERAMICS
          </h1>
          <h2 className="text-xs sm:text-sm md:text-[20px] text-amber-200 font-semibold mb-6 tracking-wider sm:tracking-widest uppercase break-words drop-shadow-md">
            Crafting Quality. Shaping Spaces.
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:items-end w-full border-t border-white/20 pt-6 mt-2 bg-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 shadow-2xl">
            <p className="text-white text-xs sm:text-sm md:text-[16px] max-w-2xl leading-relaxed font-normal mb-0 lg:mr-auto drop-shadow-md">
              Rooted in the industrial heart of Dindigul, we blend centuries-old artisanal traditions with state-of-the-art manufacturing to produce premium ceramics for modern architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 mt-4 lg:mt-0 w-full sm:w-auto">
              <Link 
                to="/products"
                className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition-all duration-300 shadow-xl uppercase tracking-widest rounded-xs" 
              >
                Explore Products
              </Link>
              <button 
                onClick={onOpenInquiry}
                className="inline-flex justify-center items-center px-6 py-3 bg-black/70 text-white border border-white/80 font-bold text-xs sm:text-sm hover:bg-white hover:text-stone-900 transition-all duration-300 backdrop-blur-md uppercase tracking-widest rounded-xs shadow-lg"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Products (Luxury Catalogue) */}
      <section id="products" className="py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center mb-16 relative z-10">
          <h2 className="font-headline-md md:text-[44px] text-on-surface mb-4 font-normal tracking-wide">Find Tiles by Category</h2>
          <p className="font-body-md text-industrial-gray max-w-3xl mx-auto font-light text-sm md:text-base leading-relaxed">
            Oviya Ceramics offers premium wall and floor tiles, combining advanced technology with elegant designs for lasting quality and easy maintenance.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4 max-w-[1400px] mx-auto relative z-10">
          {/* Category 1 */}
          <div onClick={() => navigate('/products?category=Bathroom Tiles')} className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-2 bg-surface-variant/30 rounded-lg shadow-xs">
              <img src="/tailes/pro_bathroom.jpg" alt="BATHROOM TILES" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-headline-sm text-xs sm:text-[13px] text-on-surface uppercase tracking-wider text-center font-bold group-hover:text-primary transition-colors">BATHROOM TILES</h3>
          </div>
          {/* Category 2 */}
          <div onClick={() => navigate('/products?category=Kitchen Tiles')} className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-2 bg-surface-variant/30 rounded-lg shadow-xs">
              <img src="/tailes/pro_kitchen.jpg" alt="KITCHEN TILES" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-headline-sm text-xs sm:text-[13px] text-on-surface uppercase tracking-wider text-center font-bold group-hover:text-primary transition-colors">KITCHEN TILES</h3>
          </div>
          {/* Category 3 */}
          <div onClick={() => navigate('/products?category=Floor Tiles')} className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-2 bg-surface-variant/30 rounded-lg shadow-xs">
              <img src="/tailes/pro_livingroom.jpg" alt="LIVING ROOM TILES" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-headline-sm text-xs sm:text-[13px] text-on-surface uppercase tracking-wider text-center font-bold group-hover:text-primary transition-colors">LIVING ROOM TILES</h3>
          </div>
          {/* Category 4 */}
          <div onClick={() => navigate('/products?category=Floor Tiles')} className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-2 bg-surface-variant/30 rounded-lg shadow-xs">
              <img src="/tailes/pro_bedroom.jpg" alt="BEDROOM TILES" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-headline-sm text-xs sm:text-[13px] text-on-surface uppercase tracking-wider text-center font-bold group-hover:text-primary transition-colors">BEDROOM TILES</h3>
          </div>
          {/* Category 5 */}
          <div onClick={() => navigate('/products?category=Outdoor Tiles')} className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-2 bg-surface-variant/30 rounded-lg shadow-xs">
              <img src="/tailes/pro_outdoor.jpg" alt="OUTDOOR & ELEVATION" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-headline-sm text-xs sm:text-[13px] text-on-surface uppercase tracking-wider text-center font-bold group-hover:text-primary transition-colors">OUTDOOR & ELEVATION</h3>
          </div>
          {/* Category 6 */}
          <div onClick={() => navigate('/products?category=Sanitaryware')} className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-2 bg-surface-variant/30 rounded-lg shadow-xs">
              <img src="/tailes/pro_sanitaryware.jpg" alt="SANITARYWARE & BATHWARE" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-headline-sm text-xs sm:text-[13px] text-on-surface uppercase tracking-wider text-center font-bold group-hover:text-primary transition-colors">SANITARYWARE & BATHWARE</h3>
          </div>
        </div>
      </section>

      {/* 2.5 Browse Tiles By */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-white relative border-t border-surface-variant/50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto mb-12">
          <h2 className="font-headline-md md:text-[44px] text-on-surface mb-2 font-normal tracking-wide">Browse Tiles By Finish & Style</h2>
          <p className="font-body-md text-industrial-gray font-light text-sm md:text-base">
            Discover our diverse range of tiles, categorised by style, size and finish to suit every design vision.
          </p>
        </div>
        
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0 flex flex-col gap-6">
            <div onClick={() => navigate('/products')} className="flex justify-between items-center pb-4 border-b border-surface-variant cursor-pointer text-on-surface hover:text-primary transition-colors">
              <span className="font-headline-sm text-[18px] font-bold">Finishes</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
            <div onClick={() => navigate('/products')} className="flex justify-between items-center pb-4 border-b border-surface-variant cursor-pointer text-industrial-gray hover:text-on-surface transition-colors">
              <span className="font-headline-sm text-[18px]">Sizes</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
            <div onClick={() => navigate('/products')} className="flex justify-between items-center pb-4 border-b border-surface-variant cursor-pointer text-industrial-gray hover:text-on-surface transition-colors">
              <span className="font-headline-sm text-[18px]">Colors & Concepts</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
          
          {/* Main Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6">
            <div onClick={() => navigate('/products')} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3 rounded-lg"><img src="/tailes/high002294.jpg" alt="Blend" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px] font-medium group-hover:text-primary">Blend Concept</span>
            </div>
            <div onClick={() => navigate('/products')} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3 rounded-lg"><img src="/tailes/high002308.jpg" alt="Carving" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px] font-medium group-hover:text-primary">Carving Finish</span>
            </div>
            <div onClick={() => navigate('/products')} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3 rounded-lg"><img src="/tailes/GP01315_b.jpg" alt="HD Polished" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px] font-medium group-hover:text-primary">HD Polished</span>
            </div>
            <div onClick={() => navigate('/products')} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3 rounded-lg"><img src="/tailes/PF01322_b.jpg" alt="Rustic" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px] font-medium group-hover:text-primary">Rustic Wood</span>
            </div>
            
            <div onClick={() => navigate('/products')} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3 rounded-lg"><img src="/tailes/GP01294_b.jpg" alt="High Gloss" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px] font-medium group-hover:text-primary">High Gloss</span>
            </div>
            <div onClick={() => navigate('/products')} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3 rounded-lg"><img src="/tailes/PF01317_b.jpg" alt="Ultra Matt" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px] font-medium group-hover:text-primary">Ultra Matt</span>
            </div>
            <div onClick={() => navigate('/products')} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3 rounded-lg"><img src="/tailes/GP01299_b.jpg" alt="Super Glossy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px] font-medium group-hover:text-primary">Super Glossy</span>
            </div>
            <div onClick={() => navigate('/products')} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3 rounded-lg"><img src="/tailes/PF01328_b.jpg" alt="Polished" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px] font-medium group-hover:text-primary">Polished</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Premium Tile Company Banner */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-end pt-32 pb-0 px-4 md:px-8 bg-surface">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/factory_aerial_1788260913280.jpg" alt="Manufacturing Plant" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Banner Text */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto text-left mb-20 md:mb-32">
          <h2 className="font-headline-lg-mobile text-[48px] md:text-[72px] lg:text-[84px] text-white leading-[1.1] mb-6 font-bold max-w-4xl tracking-tight">
            India's Premium<br/>Tile Company
          </h2>
          <p className="font-body-md text-white/90 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Oviya Ceramics is India's largest manufacturer of ceramic and vitrified tiles, with an annual production capacity of 87.80 million square meters.
          </p>
          <Link to="/about-us" className="inline-flex items-center gap-2 mt-8 text-white font-label-md uppercase tracking-widest hover:text-amber-300 transition-colors">
            READ MORE <span className="material-symbols-outlined text-sm bg-primary/80 rounded-full p-1 text-white">chevron_right</span>
          </Link>
        </div>

        {/* Stats Card Overlapping */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto bg-white shadow-2xl py-12 px-8 -mb-16 rounded-sm border border-surface-variant/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-surface-variant">
            {/* Stat 1 */}
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">factory</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-headline-lg-mobile text-[48px] md:text-[56px] font-bold text-on-surface">87.80</span>
                <span className="font-headline-sm text-lg text-industrial-gray uppercase">MSM</span>
              </div>
              <h4 className="font-label-md uppercase tracking-widest text-on-surface mb-3 text-[13px] font-bold">PRODUCTION CAPACITY</h4>
              <p className="font-body-md text-industrial-gray font-light text-sm max-w-xs mx-auto">Annual production capacity of 87.80 million square meters (MSM).</p>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">grid_view</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-headline-lg-mobile text-[48px] md:text-[56px] font-bold text-on-surface">4k+</span>
              </div>
              <h4 className="font-label-md uppercase tracking-widest text-on-surface mb-3 text-[13px] font-bold">TILES DESIGN</h4>
              <p className="font-body-md text-industrial-gray font-light text-sm max-w-xs mx-auto">More Than 4,000 Options in Wall & Floor Tiles Designs.</p>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">location_on</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-headline-lg-mobile text-[48px] md:text-[56px] font-bold text-on-surface">9</span>
              </div>
              <h4 className="font-label-md uppercase tracking-widest text-on-surface mb-3 text-[13px] font-bold">PLANTS</h4>
              <p className="font-body-md text-industrial-gray font-light text-sm max-w-xs mx-auto">Operates nine state-of-the-art manufacturing plants.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer to account for overlapping card */}
      <div className="h-32 bg-surface"></div>

      {/* 4. Manufacturing & Quality */}
      <section className="py-20 md:py-32 px-4 sm:px-8 md:px-16 lg:px-32 bg-surface-variant/20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-headline-md md:font-headline-xl text-[48px] text-on-surface mb-6">How It's Made</h2>
            <p className="font-body-md text-industrial-gray max-w-3xl mx-auto font-light">From riverbed to luxury centerpiece, our production process is a meticulous symphony of nature and technology.</p>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[1px] bg-outline-variant z-0"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center bg-surface p-6 rounded shadow-sm border border-outline-variant/30 relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-md mx-auto">
                  <span className="material-symbols-outlined text-[28px]">landscape</span>
                </div>
                <h4 className="font-headline-md text-lg text-on-surface mb-2">1. Raw Materials</h4>
                <p className="font-body-md text-industrial-gray font-light text-sm">Ethical sourcing of premium Dindigul red clay.</p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center bg-surface p-6 rounded shadow-sm border border-outline-variant/30 relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-md mx-auto">
                  <span className="material-symbols-outlined text-[28px]">settings_accessibility</span>
                </div>
                <h4 className="font-headline-md text-lg text-on-surface mb-2">2. Production</h4>
                <p className="font-body-md text-industrial-gray font-light text-sm">Precision wheel-throwing and slip-casting.</p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center bg-surface p-6 rounded shadow-sm border border-outline-variant/30 relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-md mx-auto">
                  <span className="material-symbols-outlined text-[28px]">local_fire_department</span>
                </div>
                <h4 className="font-headline-md text-lg text-on-surface mb-2">3. Firing</h4>
                <p className="font-body-md text-industrial-gray font-light text-sm">High-temperature kilns for maximum structural integrity.</p>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center bg-surface p-6 rounded shadow-sm border border-outline-variant/30 relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-md mx-auto">
                  <span className="material-symbols-outlined text-[28px]">brush</span>
                </div>
                <h4 className="font-headline-md text-lg text-on-surface mb-2">4. Finishing</h4>
                <p className="font-body-md text-industrial-gray font-light text-sm">Artisanal glazing and hand-painted detailing.</p>
              </div>
              {/* Step 5 */}
              <div className="flex flex-col items-center text-center bg-surface p-6 rounded shadow-sm border border-outline-variant/30 relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-md mx-auto">
                  <span className="material-symbols-outlined text-[28px]">fact_check</span>
                </div>
                <h4 className="font-headline-md text-lg text-on-surface mb-2">5. Inspection</h4>
                <p className="font-body-md text-industrial-gray font-light text-sm">Rigorous stress and aesthetic quality checks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Applications + Gallery */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-headline-md md:text-[44px] text-on-surface mb-4 font-normal tracking-wide">Spaces We Shape</h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
              <span onClick={() => navigate('/gallery')} className="font-headline-sm text-xs sm:text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1 cursor-pointer">RESIDENTIAL</span>
              <span onClick={() => navigate('/gallery')} className="font-headline-sm text-xs sm:text-sm font-bold uppercase tracking-widest text-industrial-gray hover:text-on-surface transition-colors cursor-pointer">COMMERCIAL</span>
              <span onClick={() => navigate('/gallery')} className="font-headline-sm text-xs sm:text-sm font-bold uppercase tracking-widest text-industrial-gray hover:text-on-surface transition-colors cursor-pointer">HOSPITALITY</span>
              <span onClick={() => navigate('/gallery')} className="font-headline-sm text-xs sm:text-sm font-bold uppercase tracking-widest text-industrial-gray hover:text-on-surface transition-colors cursor-pointer">ARCHITECTURAL</span>
            </div>
          </div>

          {/* Composite Layout Grid matching Image 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 max-w-[1400px] mx-auto">
            {/* Left Tall Card */}
            <div 
              onClick={() => navigate('/gallery')} 
              className="lg:col-span-5 relative min-h-[380px] md:min-h-[460px] overflow-hidden bg-surface-variant/30 rounded-xs shadow-sm group cursor-pointer"
            >
              <img 
                src="/tailes/pro_bathroom.jpg" 
                alt="Residential Spa Bathroom" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>

            {/* Right Stacked Column */}
            <div className="lg:col-span-7 flex flex-col gap-4 md:gap-5">
              {/* Upper Row: 2 Small Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div 
                  onClick={() => navigate('/gallery')} 
                  className="relative h-[210px] md:h-[225px] overflow-hidden bg-surface-variant/30 rounded-xs shadow-sm group cursor-pointer"
                >
                  <img 
                    src="/tailes/pro_kitchen.jpg" 
                    alt="Luxury Kitchen Backsplash" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div 
                  onClick={() => navigate('/gallery')} 
                  className="relative h-[210px] md:h-[225px] overflow-hidden bg-surface-variant/30 rounded-xs shadow-sm group cursor-pointer"
                >
                  <img 
                    src="/tailes/pro_outdoor.jpg" 
                    alt="Outdoor Villa Elevation" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </div>

              {/* Lower Row: Wide Horizontal Card with Label Overlay */}
              <div 
                onClick={() => navigate('/gallery')} 
                className="w-full h-[210px] md:h-[225px] relative overflow-hidden bg-stone-900 rounded-xs shadow-md group cursor-pointer"
              >
                <img 
                  src="/tailes/pro_commercial.jpg" 
                  alt="Commercial Installations" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white font-headline-sm text-lg md:text-xl font-medium tracking-wide drop-shadow-md">
                  Commercial Installations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Locator */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-white border-t border-surface-variant/50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-8 mb-8 border-b border-surface-variant">
            <button className="font-headline-md text-xl font-bold text-on-surface pb-3 border-b-2 border-primary">Dealer Locator</button>
            <button className="font-headline-md text-xl font-normal text-industrial-gray pb-3 hover:text-on-surface">Branches</button>
          </div>
          
          <div className="flex flex-col lg:flex-row h-[600px] border border-surface-variant rounded-sm overflow-hidden shadow-sm">
            {/* Sidebar List */}
            <div className="w-full lg:w-[400px] bg-surface flex flex-col h-full border-r border-surface-variant">
              <div className="p-4 border-b border-surface-variant bg-white">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search city or dealer name..." 
                    value={dealerSearch}
                    onChange={(e) => setDealerSearch(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-variant/20 border border-surface-variant rounded-sm focus:outline-none focus:border-primary font-body-md text-on-surface" 
                  />
                  <span className="material-symbols-outlined absolute right-4 top-3 text-industrial-gray">search</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {filteredDealers.map((dealer, idx) => (
                  <div key={idx} className="p-4 border-b border-surface-variant hover:bg-surface-variant/10 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-headline-sm text-base font-bold text-on-surface">{dealer.name}</h4>
                      <span className="bg-primary text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full tracking-wider">{dealer.tag}</span>
                    </div>
                    <p className="font-body-md text-industrial-gray text-xs mb-1 uppercase">{dealer.location}</p>
                    <a href={`mailto:${dealer.email}`} className="font-body-md text-primary text-xs font-semibold">{dealer.email}</a>
                  </div>
                ))}

                {filteredDealers.length === 0 && (
                  <div className="text-center py-8 text-xs text-stone-400">No dealers matching "{dealerSearch}"</div>
                )}
              </div>
            </div>
            
            {/* Map Area */}
            <div className="flex-1 bg-surface-variant/50 relative min-h-[400px]">
              <iframe 
                src="https://maps.google.com/maps?q=Bathalagundu+Road,+near+saravana+Mill,+opp.+Dindigul,+Pillayarnattam,+Tamil+Nadu+624002&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Oviya Ceramics Location Map"
              >
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-0 bg-surface-container overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 lg:px-32 mb-12">
          <h2 className="font-headline-md text-[28px] md:text-[40px] text-on-surface font-bold">What Client Says About Us</h2>
        </div>
        
        <div className="w-full max-w-full overflow-hidden">
          <div className="flex gap-6 w-max animate-scroll pause-on-hover pb-8 px-4">
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div key={`${review.id}-${idx}`} className="w-[300px] sm:w-[350px] md:w-[400px] shrink-0 bg-white p-8 rounded-md shadow-sm border border-surface-variant flex flex-col">
                <div className="flex text-primary text-[18px] mb-4 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="font-body-md text-industrial-gray italic font-light mb-8 flex-1 leading-relaxed">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-bold text-lg shrink-0`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-headline-sm font-bold text-on-surface text-base">{review.name}</h4>
                    <p className="font-body-md text-industrial-gray text-sm">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final Enquiry CTA & Footer */}
      <section id="contact" className="py-20 md:py-32 px-4 sm:px-8 md:px-16 bg-surface-variant/30 text-on-surface text-center overflow-hidden">
        <div className="max-w-[1000px] mx-auto">
          <span className="material-symbols-outlined text-[64px] mb-8 text-primary/30">handshake</span>
          <h2 className="font-headline-xl text-[48px] md:text-[64px] mb-8 leading-tight">
            Let's Create Something Exceptional.
          </h2>
          <p className="font-body-md text-[20px] text-industrial-gray mb-12 font-light max-w-2xl mx-auto">
            Whether you are an architect, dealer, or interior designer, our team is ready to bring your vision to life with uncompromising quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={onOpenInquiry}
              className="inline-flex justify-center items-center gap-3 px-10 py-4 bg-primary text-white font-label-md text-label-md hover:bg-red-700 transition-colors uppercase tracking-widest shadow-lg rounded-xs"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
              Enquire Now
            </button>
            <button 
              onClick={handleWhatsApp}
              className="inline-flex justify-center items-center gap-3 px-10 py-4 bg-[#25D366] text-white font-label-md text-label-md hover:bg-[#20bd5a] transition-colors uppercase tracking-widest shadow-lg rounded-xs border border-[#25D366]"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              WhatsApp
            </button>
            <button 
              onClick={handleCall}
              className="inline-flex justify-center items-center gap-3 px-10 py-4 bg-transparent text-primary border border-primary font-label-md text-label-md hover:bg-primary/5 transition-colors uppercase tracking-widest rounded-xs"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              Call Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
