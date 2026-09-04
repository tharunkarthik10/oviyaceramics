import React from 'react';

const REVIEWS = [
  { id: 1, name: "Mouli", location: "Trichy", avatarColor: "bg-primary", quote: "I had a fantastic experience with this company. Their customer service was friendly and responsive. Everything was handled quickly and professionally. The quality of the product/service was outstanding. I would definitely recommend them to others!" },
  { id: 2, name: "Murugan", location: "Madurai", avatarColor: "bg-stone-800", quote: "The product I received was even better than expected. It was delivered on time and in perfect condition. The craftsmanship and attention to detail were impressive. Customer support was helpful and very knowledgeable!" },
  { id: 3, name: "Jakan", location: "Karaikudi", avatarColor: "bg-primary-container", quote: "Highly durable tiles for my new commercial project. The finish is excellent and the pricing was very competitive for the market. Overall a seamless experience from selection to delivery." },
  { id: 4, name: "Priya", location: "Chennai", avatarColor: "bg-stone-900", quote: "Beautiful collection of bathroom tiles. Transformed my space completely. The design team was very patient and helped me choose the perfect combination of colors and textures." },
  { id: 5, name: "Suresh", location: "Coimbatore", avatarColor: "bg-red-800", quote: "Best quality granites in South India. Have been sourcing from them for my architectural firm for over 5 years. The consistency in quality and timely delivery is unmatched." },
  { id: 6, name: "Ananya", location: "Bangalore", avatarColor: "bg-black", quote: "The outdoor paving tiles are incredibly sturdy and weather-resistant. It completely elevated the look of my garden patio. Excellent service and very polite staff!" }
];

const Home = () => {
  return (
    <div className="w-full bg-surface">
      {/* 1. Hero + Brand Introduction (Bottom Aligned Cinematic) */}
      <section className="relative min-h-[100vh] flex items-end px-8 md:px-16 lg:px-32 pb-20 overflow-hidden">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/hero_tiles_bg_1788246751274.jpg')` }}></div>
        {/* Bottom-Up Gradient Overlay (Lighter for brighter image) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-0"></div>

        {/* Text Content - Bottom Aligned */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-start text-left">
          <span className="inline-block px-4 py-1.5 border border-white/30 text-white font-label-md uppercase tracking-widest text-[12px] mb-6 backdrop-blur-sm">Est. 1984</span>
          
          <h1 className="font-headline-lg-mobile text-[48px] md:text-[80px] lg:text-[100px] text-white mb-2 leading-[1] tracking-tight font-bold">
            OVIYA CERAMICS
          </h1>
          <h2 className="font-headline-md md:text-[24px] text-white/80 mb-8 tracking-widest uppercase">
            Crafting Quality. Shaping Spaces.
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:items-end w-full border-t border-white/20 pt-8 mt-4">
            <p className="font-body-md md:text-[18px] text-white/70 max-w-2xl leading-relaxed font-light mb-0 lg:mr-auto">
              Rooted in the industrial heart of Dindigul, we blend centuries-old artisanal traditions with state-of-the-art manufacturing to produce premium ceramics for modern architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 mt-6 lg:mt-0">
              <a className="inline-flex justify-center items-center px-6 py-2.5 bg-primary text-white font-label-md hover:bg-white hover:text-primary transition-all duration-300 shadow-xl uppercase tracking-widest" href="#products">
                Explore Products
              </a>
              <a className="inline-flex justify-center items-center px-6 py-2.5 bg-transparent text-white border border-white/50 font-label-md hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm uppercase tracking-widest" href="#contact">
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Products (Luxury Catalogue) */}
      <section id="products" className="py-24 px-8 md:px-16 lg:px-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto text-center mb-16 relative z-10">
          <h2 className="font-headline-md md:text-[44px] text-on-surface mb-4 font-normal tracking-wide">Find Tiles by Category</h2>
          <p className="font-body-md text-industrial-gray max-w-3xl mx-auto font-light text-sm md:text-base leading-relaxed">
            Oviya Ceramics offers premium wall and floor tiles, combining advanced technology with elegant designs for lasting quality and easy maintenance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto relative z-10">
          {/* Category 1 */}
          <div className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-4 bg-surface-variant/30">
              <img src="/sanitaryware_1788246783314.jpg" alt="BATHROOM" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="font-headline-sm text-[16px] text-on-surface uppercase tracking-wider text-left">BATHROOM</h3>
          </div>
          {/* Category 2 */}
          <div className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-4 bg-surface-variant/30">
              <img src="/floor_wall_tiles_1788246766216.jpg" alt="KITCHEN" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="font-headline-sm text-[16px] text-on-surface uppercase tracking-wider text-left">KITCHEN</h3>
          </div>
          {/* Category 3 */}
          <div className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-4 bg-surface-variant/30">
              <img src="/hero_tiles_bg_1788246751274.jpg" alt="LIVING ROOM" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="font-headline-sm text-[16px] text-on-surface uppercase tracking-wider text-left">LIVING ROOM</h3>
          </div>
          {/* Category 4 */}
          <div className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-4 bg-surface-variant/30">
              <img src="/bedroom_tiles_1788260871425.jpg" alt="BEDROOM" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="font-headline-sm text-[16px] text-on-surface uppercase tracking-wider text-left">BEDROOM</h3>
          </div>
          {/* Category 5 */}
          <div className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-4 bg-surface-variant/30">
              <img src="/outdoor_tiles_1788260884772.jpg" alt="OUTDOOR" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="font-headline-sm text-[16px] text-on-surface uppercase tracking-wider text-left">OUTDOOR</h3>
          </div>
          {/* Category 6 */}
          <div className="group flex flex-col cursor-pointer">
            <div className="relative aspect-square overflow-hidden mb-4 bg-surface-variant/30">
              <img src="/commercial_tiles_1788260898186.jpg" alt="COMMERCIAL SPACES" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="font-headline-sm text-[16px] text-on-surface uppercase tracking-wider text-left">COMMERCIAL SPACES</h3>
          </div>
        </div>
      </section>

      {/* 2.5 Browse Tiles By */}
      <section className="py-24 px-8 md:px-16 lg:px-32 bg-white relative border-t border-surface-variant/50">
        <div className="max-w-[1400px] mx-auto mb-12">
          <h2 className="font-headline-md md:text-[44px] text-on-surface mb-2 font-normal tracking-wide">Browse Tiles By</h2>
          <p className="font-body-md text-industrial-gray font-light text-sm md:text-base">
            Discover our diverse range of tiles, categorised by style, size and finish to suit every design vision.
          </p>
        </div>
        
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0 flex flex-col gap-6">
            <div className="flex justify-between items-center pb-4 border-b border-surface-variant cursor-pointer text-on-surface">
              <span className="font-headline-sm text-[18px] font-bold">Finishes</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-surface-variant cursor-pointer text-industrial-gray hover:text-on-surface transition-colors">
              <span className="font-headline-sm text-[18px]">Sizes</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-surface-variant cursor-pointer text-industrial-gray hover:text-on-surface transition-colors">
              <span className="font-headline-sm text-[18px]">Colors</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
          
          {/* Main Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3"><img src="/texture_matte_1788261089300.jpg" alt="Blend" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px]">Blend</span>
            </div>
            <div className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3"><img src="/texture_carving_1788261101299.jpg" alt="Carving" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px]">Carving</span>
            </div>
            <div className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3"><img src="/texture_glossy_1788261076466.jpg" alt="HD Polished" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px]">HD Polished</span>
            </div>
            <div className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3"><img src="/texture_rustic_1788261113894.jpg" alt="Rustic" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px]">Rustic Wood</span>
            </div>
            
            <div className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3"><img src="/texture_glossy_1788261076466.jpg" alt="High Gloss" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px]">High Gloss</span>
            </div>
            <div className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3"><img src="/texture_matte_1788261089300.jpg" alt="Ultra Matt" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px]">Ultra Matt</span>
            </div>
            <div className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3"><img src="/texture_carving_1788261101299.jpg" alt="Super Glossy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px]">Super Glossy</span>
            </div>
            <div className="flex flex-col cursor-pointer group">
              <div className="relative aspect-square overflow-hidden mb-3"><img src="/texture_rustic_1788261113894.jpg" alt="Polished" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <span className="font-body-md text-on-surface text-[15px]">Polished</span>
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
          <a href="#about" className="inline-flex items-center gap-2 mt-8 text-white font-label-md uppercase tracking-widest hover:text-primary transition-colors">
            READ MORE <span className="material-symbols-outlined text-sm bg-primary/80 rounded-full p-1 text-white">chevron_right</span>
          </a>
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
      <section className="py-32 px-8 md:px-16 lg:px-32 bg-surface-variant/20">
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
      <section className="py-32 px-8 md:px-4 lg:px-8 bg-surface">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-md md:font-headline-xl text-[48px] text-on-surface mb-6">Spaces We Shape</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              <span className="font-label-md uppercase tracking-widest text-primary border-b border-primary pb-1">Residential</span>
              <span className="font-label-md uppercase tracking-widest text-industrial-gray hover:text-primary transition-colors cursor-pointer">Commercial</span>
              <span className="font-label-md uppercase tracking-widest text-industrial-gray hover:text-primary transition-colors cursor-pointer">Hospitality</span>
              <span className="font-label-md uppercase tracking-widest text-industrial-gray hover:text-primary transition-colors cursor-pointer">Architectural</span>
            </div>
          </div>

          {/* Masonry Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
            {/* Gallery Item 1 - Large (2 rows) */}
            <div className="lg:row-span-2 relative group overflow-hidden bg-surface-variant">
              <img src="/floor_wall_tiles_1788246766216.jpg" alt="Luxury Living Spaces" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <span className="text-white font-headline-md text-2xl drop-shadow-md">Luxury Living Spaces</span>
              </div>
            </div>
            {/* Gallery Item 2 - Normal */}
            <div className="relative group overflow-hidden bg-surface-variant">
              <img src="/sanitaryware_1788246783314.jpg" alt="Modern Bathrooms" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-headline-md text-xl drop-shadow-md">Modern Bathrooms</span>
              </div>
            </div>
            {/* Gallery Item 3 - Normal */}
            <div className="relative group overflow-hidden bg-surface-variant">
              <img src="/granites_elevation_1788246797316.jpg" alt="Exterior Facades" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-headline-md text-xl drop-shadow-md">Exterior Facades</span>
              </div>
            </div>
            {/* Gallery Item 4 - Wide (span 2 cols) */}
            <div className="md:col-span-2 relative group overflow-hidden bg-surface-variant">
              <img src="/hero_tiles_bg_1788246751274.jpg" alt="Commercial Installations" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <span className="text-white font-headline-md text-2xl drop-shadow-md">Commercial Installations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Locator */}
      <section className="py-24 px-8 md:px-16 lg:px-32 bg-white border-t border-surface-variant/50">
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
                  <input type="text" placeholder="Search here..." className="w-full px-4 py-3 bg-surface-variant/20 border border-surface-variant rounded-sm focus:outline-none focus:border-primary font-body-md text-on-surface" />
                  <span className="material-symbols-outlined absolute right-4 top-3 text-industrial-gray">search</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {/* Item 1 */}
                <div className="p-4 border-b border-surface-variant hover:bg-surface-variant/10 cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-sm text-lg font-bold text-on-surface">JNP TILES MARKETING</h4>
                    <span className="bg-primary text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full tracking-wider">Dealers</span>
                  </div>
                  <p className="font-body-md text-industrial-gray text-sm mb-1 uppercase">Pallavaram, Chennai,<br/>Chennai, Tamil Nadu- 000000</p>
                  <a href="mailto:ksnkumaar@yahoo.co.in" className="font-body-md text-primary text-sm">ksnkumaar@yahoo.co.in</a>
                </div>
                {/* Item 2 */}
                <div className="p-4 border-b border-surface-variant hover:bg-surface-variant/10 cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-sm text-lg font-bold text-on-surface">VRM TRADERS</h4>
                    <span className="bg-primary text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full tracking-wider">Dealers</span>
                  </div>
                  <p className="font-body-md text-industrial-gray text-sm mb-1 uppercase">Perungalathur, Chennai,<br/>Chennai, Tamil Nadu- 631003</p>
                  <a href="mailto:vrmtiles@gmail.com" className="font-body-md text-primary text-sm">vrmtiles@gmail.com</a>
                </div>
                {/* Item 3 */}
                <div className="p-4 border-b border-surface-variant hover:bg-surface-variant/10 cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-sm text-lg font-bold text-on-surface">RAFAYA ENTERPRISES</h4>
                    <span className="bg-primary text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full tracking-wider">Dealers</span>
                  </div>
                  <p className="font-body-md text-industrial-gray text-sm mb-1 uppercase">Crompet, Chennai, Chennai,<br/>Tamil Nadu- 600044</p>
                  <a href="mailto:inforafaya@gmail.com" className="font-body-md text-primary text-sm">inforafaya@gmail.com</a>
                </div>
              </div>
            </div>
            
            {/* Map Area */}
            <div className="flex-1 bg-surface-variant/50 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3999902.946320959!2d77.41240167385208!3d11.026774917637851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sTamil%20Nadu!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-0 bg-surface-container">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32 mb-12">
          <h2 className="font-headline-md md:text-[40px] text-on-surface font-bold">What Client Says About Us</h2>
        </div>
        
        <div className="w-full overflow-hidden">
          <div className="flex gap-6 w-max animate-scroll pause-on-hover pb-8 px-8 md:px-16 lg:px-32">
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
      <section id="contact" className="py-32 px-8 md:px-16 bg-surface-variant/30 text-on-surface text-center">
        <div className="max-w-[1000px] mx-auto">
          <span className="material-symbols-outlined text-[64px] mb-8 text-primary/30">handshake</span>
          <h2 className="font-headline-xl text-[48px] md:text-[64px] mb-8 leading-tight">
            Let's Create Something Exceptional.
          </h2>
          <p className="font-body-md text-[20px] text-industrial-gray mb-12 font-light max-w-2xl mx-auto">
            Whether you are an architect, dealer, or interior designer, our team is ready to bring your vision to life with uncompromising quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="inline-flex justify-center items-center gap-3 px-10 py-4 bg-primary text-white font-label-md text-label-md hover:bg-on-surface transition-colors uppercase tracking-widest shadow-lg">
              <span className="material-symbols-outlined text-[20px]">mail</span>
              Enquire Now
            </button>
            <button className="inline-flex justify-center items-center gap-3 px-10 py-4 bg-[#25D366] text-white font-label-md text-label-md hover:bg-[#20bd5a] transition-colors uppercase tracking-widest shadow-lg border border-[#25D366]">
              <span className="material-symbols-outlined text-[20px]">chat</span>
              WhatsApp
            </button>
            <button className="inline-flex justify-center items-center gap-3 px-10 py-4 bg-transparent text-primary border border-primary font-label-md text-label-md hover:bg-primary/5 transition-colors uppercase tracking-widest">
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
