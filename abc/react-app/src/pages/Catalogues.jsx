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
      title: "THE ULTIMA NEW COLLECTION",
      subtitle: "South India",
      image: "/clean_catalog_cover.jpg",
    },
    {
      id: 4,
      title: "LUXURY WALL TILES",
      subtitle: "Global Collection",
      image: "/clean_catalog_cover.jpg",
    },
    {
      id: 5,
      title: "WOODEN PLANK SERIES",
      subtitle: "South India",
      image: "/clean_catalog_cover.jpg",
    },
    {
      id: 6,
      title: "OUTDOOR & PARKING",
      subtitle: "All Regions",
      image: "/clean_catalog_cover.jpg",
    }
  ];

  return (
    <div className="w-full bg-[#FDFDFD] text-on-surface font-body-md antialiased pt-[90px] md:pt-[105px] pb-20 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Sleek Compact Hero Header Banner */}
        <div className="bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#1C1917] text-white rounded-2xl p-6 md:p-10 mb-8 shadow-lg relative overflow-hidden">
          {/* Subtle Ambient Red Accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-medium text-stone-400 mb-3 uppercase tracking-wider">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-primary font-semibold">Catalogues</span>
              </div>

              <h1 className="font-headline-xl text-2xl md:text-4xl font-bold mb-3 leading-tight tracking-tight text-white">
                View & Download Our Catalogues
              </h1>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed max-w-xl font-light">
                Explore our full product collections, technical specs, and finish guides available for easy viewing and instant download.
              </p>
            </div>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap sm:flex-nowrap md:flex-col gap-4 shrink-0 border-t md:border-t-0 md:border-l border-stone-700/60 pt-4 md:pt-0 md:pl-8 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">Format</p>
                  <p className="text-xs font-semibold text-white">High-Res PDF Specs</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">Access</p>
                  <p className="text-xs font-semibold text-white">Free Instant Download</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Sidebar (Sticky) */}
          <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-32 self-start bg-transparent">
            <div className="flex flex-col">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center justify-between py-4 px-2 border-b border-gray-200 text-left transition-colors ${
                    activeCategory === category 
                      ? 'text-primary font-bold' 
                      : 'text-[#666666] hover:text-primary'
                  }`}
                >
                  <span className="text-[14px]">{category}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
              {catalogues.map((item) => (
                <div key={item.id} className="flex flex-col bg-[#F5F7FA] border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                  
                  {/* Catalog Cover Wrapper */}
                  <div className="relative w-full aspect-[3/4] flex items-center justify-center p-6 pb-2 overflow-hidden">
                    {/* Catalog Image */}
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 shadow-md">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded shadow-md" 
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col p-6 pt-4 flex-1">
                    {/* Title & Subtitle */}
                    <h3 className="font-headline-sm font-bold text-[#333333] text-[15px] mb-2 text-center uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-[#888888] text-[13px] mb-6 text-center flex-1">
                      {item.subtitle}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-6 text-primary font-semibold text-[13px] w-full border-t border-gray-100 pt-4 mt-auto">
                      <button className="flex items-center gap-1.5 hover:text-primary-container transition-colors">
                        VIEW <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <div className="w-[1px] h-4 bg-gray-300"></div>
                      <button className="flex items-center gap-1.5 hover:text-primary-container transition-colors">
                        DOWNLOAD <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Catalogues;
