import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Catalogues = () => {
  const [activeCategory, setActiveCategory] = useState('Glazed Vitrified Tiles');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    "Glazed Vitrified Tiles",
    "Gres Tiles",
    "Polished Vitrified Tiles",
    "Ceramic Wall Tiles - EXPORTS",
    "Nepal Catalogues"
  ];

  const catalogues = [
    {
      id: 1,
      title: "UNITERRA",
      subtitle: "June 2026",
      image: "/clean_catalog_cover.jpg",
    },
    {
      id: 2,
      title: "THE ULTIMA NEW COLLECTION",
      subtitle: "North, East & West India",
      image: "/clean_catalog_cover.jpg",
    },
    {
      id: 3,
      title: "KASAWOOD",
      subtitle: "South India",
      image: "/clean_catalog_cover.jpg",
    },
    {
      id: 4,
      title: "THE ULTIMA",
      subtitle: "80x160 cm",
      image: "/clean_catalog_cover.jpg",
    },
    {
      id: 5,
      title: "THE ULTIMA",
      subtitle: "120x100,120x120,28.5x120 cm",
      image: "/clean_catalog_cover.jpg",
    },
    {
      id: 6,
      title: "LUXURY WALL TILES",
      subtitle: "Global Collection",
      image: "/clean_catalog_cover.jpg",
    }
  ];

  return (
    <div className="w-full bg-[#FAFAFA] text-on-surface font-body-md antialiased pt-[70px] md:pt-[105px] pb-24 md:pb-32 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Centered Clean Header (Kajaria Style Screenshot 3 & 4) */}
        <div className="text-center py-6 md:py-10 max-w-2xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 mb-3 font-medium">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-stone-800 font-semibold">Catalogues</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 mb-3 tracking-tight">
            View and Download Our Catalogues
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
            Explore our wide range of products and discover the perfect tiles for every space, available for easy viewing and download.
          </p>

          {/* Mobile Category Dropdown Selector (Exact Kajaria Style) */}
          <div className="mt-6 md:hidden max-w-xs mx-auto">
            <div className="relative">
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full appearance-none py-2.5 px-4 pr-10 bg-white border border-stone-300 rounded font-medium text-xs text-stone-800 focus:outline-none focus:border-primary shadow-xs"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-3 text-stone-500 pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Two-Column / Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Sidebar (Desktop Categories) */}
          <aside className="hidden lg:block w-[260px] shrink-0 sticky top-32 self-start bg-white border border-stone-200 rounded-lg p-2 shadow-xs">
            <div className="flex flex-col">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center justify-between py-3 px-4 rounded text-left transition-colors text-xs font-semibold ${
                    activeCategory === category 
                      ? 'bg-stone-100 text-primary font-bold' 
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{category}</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content Area (2 Columns on Mobile) */}
          <main className="flex-1 w-full min-w-0">
            
            {/* Catalogue Grid (2 Columns on Mobile - Kajaria Layout) */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {catalogues.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col bg-white border border-stone-200 rounded overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 group"
                >
                  
                  {/* Catalog Cover Wrapper */}
                  <div className="relative w-full aspect-[3/4] bg-stone-100 p-4 sm:p-6 flex items-center justify-center overflow-hidden">
                    {/* Booklet Preview */}
                    <div className="w-full h-full shadow-md group-hover:scale-105 transition-transform duration-500 rounded border border-stone-200 overflow-hidden bg-white">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col p-3 sm:p-4 text-center flex-1">
                    {/* Title */}
                    <h3 className="font-bold text-stone-900 text-xs sm:text-sm uppercase tracking-wide mb-1 leading-snug">
                      {item.title}
                    </h3>
                    
                    {/* Subtitle / Region */}
                    <p className="text-stone-500 text-[11px] sm:text-xs mb-4 font-normal flex-1">
                      {item.subtitle}
                    </p>

                    {/* View / Download Action Links */}
                    <div className="flex items-center justify-center gap-3 text-[11px] sm:text-xs font-bold text-[#9E7D3B] border-t border-stone-100 pt-3 mt-auto uppercase tracking-wider">
                      <button className="hover:text-primary transition-colors">
                        VIEW
                      </button>
                      <span className="text-stone-300">|</span>
                      <button className="hover:text-primary transition-colors">
                        DOWNLOAD
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </main>

        </div>
      </div>

      {/* Mobile Sticky Bottom Bar (Exact Kajaria Mobile Layout) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 flex shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <button className="w-1/2 py-3 flex items-center justify-center gap-2 border-r border-stone-200 text-stone-800 font-medium text-xs hover:bg-stone-50">
          <span className="material-symbols-outlined text-[#9E7D3B] text-[18px]">view_in_ar</span>
          <span>View In Room</span>
        </button>
        <button className="w-1/2 py-3 flex items-center justify-center gap-2 text-stone-800 font-medium text-xs hover:bg-stone-50">
          <span className="material-symbols-outlined text-[#9E7D3B] text-[18px]">location_on</span>
          <span>Where to Buy</span>
        </button>
      </div>

    </div>
  );
};

export default Catalogues;
