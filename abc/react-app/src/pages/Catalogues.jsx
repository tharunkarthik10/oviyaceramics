import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Catalogues = ({ onOpenInquiry, onOpenVisualizer, onOpenStoreLocator }) => {
  const { catalogues: allCatalogues } = useData();
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    "All",
    "Glazed Vitrified Tiles",
    "Gres Tiles",
    "Polished Vitrified Tiles",
    "Ceramic Wall Tiles - EXPORTS",
    "Nepal Catalogues"
  ];

  const catalogues = allCatalogues.filter(c => {
    if (activeCategory === "All") return true;
    return c.category && c.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[60px] md:pt-[88px] pb-24 md:pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-4 md:mt-6">
        
        {/* Centered Clean Header */}
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

          {/* Mobile Category Dropdown Selector */}
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

          {/* Main Content Area */}
          <main className="flex-1 w-full min-w-0">
            
            {catalogues.length === 0 ? (
              <div className="bg-gradient-to-b from-stone-50 to-white border border-stone-200/80 rounded-2xl p-10 sm:p-14 text-center flex flex-col items-center justify-center my-6 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-3xl">menu_book</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#800000] mb-1">
                  Digital Library
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                  Nothing listed yet
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                  We are finalizing our high-resolution digital brochures and technical specification books for this category. You can request direct PDF copies sent straight to your email or WhatsApp.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button 
                    onClick={() => setActiveCategory('All')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#800000] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-[#660000] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">auto_stories</span>
                    <span>Browse All Catalogues</span>
                  </button>
                  <button
                    onClick={() => onOpenInquiry && onOpenInquiry({ title: 'Full Product Catalog & Lookbook' })}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-stone-300 text-stone-800 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-amber-700 text-sm">mark_email_read</span>
                    <span>Request PDF via Email</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Catalogue Grid */
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {catalogues.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col bg-white border border-stone-200 rounded overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 group"
                >
                  
                  {/* Catalog Cover Wrapper (PDF Booklet Style) */}
                  <div className="relative w-full aspect-[3/4] bg-stone-100 p-4 sm:p-6 flex items-center justify-center overflow-hidden">
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
                    <h3 className="font-bold text-stone-900 text-xs sm:text-sm uppercase tracking-wide mb-1 leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-stone-500 text-[11px] sm:text-xs mb-4 font-normal flex-1">
                      {item.subtitle}
                    </p>

                    {/* View / Download Action Links */}
                    <div className="flex items-center justify-center gap-3 text-[11px] sm:text-xs font-bold text-[#9E7D3B] border-t border-stone-100 pt-3 mt-auto uppercase tracking-wider">
                      <button 
                        onClick={() => {
                          if (item.pdfUrl) {
                            const win = window.open();
                            win.document.write(`<iframe src="${item.pdfUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                          } else if (onOpenInquiry) {
                            onOpenInquiry({ title: item.title, image: item.image });
                          } else {
                            alert(`PDF preview currently unavailable for "${item.title}". You can upload a PDF from the Admin Portal.`);
                          }
                        }}
                        className="hover:text-primary transition-colors cursor-pointer"
                      >
                        VIEW
                      </button>
                      <span className="text-stone-300">|</span>
                      {item.pdfUrl ? (
                        <a 
                          href={item.pdfUrl} 
                          download={`${item.title}.pdf`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          DOWNLOAD
                        </a>
                      ) : (
                        <button 
                          onClick={() => {
                            if (onOpenInquiry) {
                              onOpenInquiry({ title: item.title, image: item.image });
                            } else {
                              alert(`PDF download currently unavailable for "${item.title}". You can upload a PDF from the Admin Portal.`);
                            }
                          }}
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          DOWNLOAD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          </main>

        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 flex shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <button 
          onClick={() => onOpenVisualizer && onOpenVisualizer()}
          className="w-1/2 py-3 flex items-center justify-center gap-2 border-r border-stone-200 text-stone-800 font-medium text-xs hover:bg-stone-50"
        >
          <span className="material-symbols-outlined text-[#9E7D3B] text-[18px]">view_in_ar</span>
          <span>View In Room</span>
        </button>
        <button 
          onClick={() => onOpenStoreLocator && onOpenStoreLocator()}
          className="w-1/2 py-3 flex items-center justify-center gap-2 text-stone-800 font-medium text-xs hover:bg-stone-50"
        >
          <span className="material-symbols-outlined text-[#9E7D3B] text-[18px]">location_on</span>
          <span>Where to Buy</span>
        </button>
      </div>

    </div>
  );
};

export default Catalogues;
