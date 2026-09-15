import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Gallery = ({ onOpenInquiry }) => {
  const { galleryItems } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = [
    'all',
    'Floor Tiles',
    'Wall Tiles',
    'Bathroom Tiles',
    'Portico Tiles',
    'Sanitarywares',
    'Warehouse',
    'Transport'
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category && item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[60px] md:pt-[88px] pb-24 md:pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-4 md:mt-6">
        
        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <div className="max-w-3xl">
            <h1 className="font-headline-xl text-3xl md:text-5xl text-primary font-bold mb-4 tracking-tight">Visualizing Precision</h1>
            <p className="font-body-lg text-base md:text-lg text-stone-600 font-light leading-relaxed">Explore our portfolio of industrial installations, intricate ceramic products, and our state-of-the-art manufacturing facility. A testament to engineering and material mastery.</p>
          </div>
        </section>

        {/* Case Study Highlight */}
        <section className="mb-12">
          <div className="w-full">
            <div className="bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 grid grid-cols-1 lg:grid-cols-2 group hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img 
                  alt="Dindigul Installation" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4TSK161XxfELuuSmoNI3Bk6GydTSt5A4omGBV-_uFtc3MGrZVg5A2fPnUtUUwr7qmJW1AA1n3qlrnMAyvOVFd8mhE0jBHsleZ4nxg3mtU5UMPpreFNbNeQ9pzESHg_RcLjP8ZUPrw_rEvmnag4Tnu4wmR_SYh6jo0AhvNpkswzsXhlq7-3LjKSa_J45vhFIhz8EfGK0YUDfh3tU9RaAOT2I0L16v7QwJJn0R-D09nKSdlD1Qr9BKg" 
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block bg-primary/10 text-primary font-bold text-xs uppercase px-3 py-1 rounded-full mb-4 w-max tracking-wider">
                  Featured Project
                </span>
                <h2 className="font-headline-lg text-2xl md:text-3xl text-stone-900 font-bold mb-4">Dindigul Manufacturing Complex</h2>
                <p className="font-body-md text-stone-600 text-sm md:text-base leading-relaxed mb-6">A comprehensive installation of high-stress ceramic insulators and custom refractory linings for a major industrial plant in Dindigul. Demonstrating our capacity for large-scale, precision-engineered solutions.</p>
                <div>
                  <button 
                    onClick={() => onOpenInquiry && onOpenInquiry({ title: 'Dindigul Manufacturing Complex', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4TSK161XxfELuuSmoNI3Bk6GydTSt5A4omGBV-_uFtc3MGrZVg5A2fPnUtUUwr7qmJW1AA1n3qlrnMAyvOVFd8mhE0jBHsleZ4nxg3mtU5UMPpreFNbNeQ9pzESHg_RcLjP8ZUPrw_rEvmnag4Tnu4wmR_SYh6jo0AhvNpkswzsXhlq7-3LjKSa_J45vhFIhz8EfGK0YUDfh3tU9RaAOT2I0L16v7QwJJn0R-D09nKSdlD1Qr9BKg' })}
                    className="bg-primary hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-widest shadow-md transition-colors"
                  >
                    Enquire Project Specs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid Section */}
        <section className="py-12 bg-white border-t border-stone-100">
          <div className="w-full">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 md:gap-4 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all shadow-xs ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredItems.map((item, idx) => (
                <div 
                  key={item.id || idx} 
                  onClick={() => setLightboxItem(item)}
                  className="aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden group cursor-pointer border border-stone-200 hover:shadow-lg transition-all relative"
                >
                  <img 
                    src={item.src} 
                    alt={item.title || `Gallery Image ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-0.5">{item.category}</span>
                    <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
                    {item.description && <p className="text-[11px] text-stone-300 line-clamp-1">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-12 text-center flex flex-col items-center justify-center my-4">
                <div className="w-16 h-16 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-3xl">photo_library</span>
                </div>
                <h3 className="font-headline-sm text-xl font-bold text-stone-900 mb-2">No Gallery Showcase Items Added Yet</h3>
                <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
                  Showcase installation photos uploaded from the Admin Portal will appear here.
                </p>
                <Link 
                  to="/admin" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded shadow-md hover:bg-red-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                  <span>Add Gallery Items in Admin Portal</span>
                </Link>
              </div>
            )}

          </div>
        </section>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-stone-900 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
            <div className="p-4 bg-stone-950 flex justify-between items-center border-b border-stone-800">
              <span className="text-amber-400 text-xs uppercase font-bold tracking-widest">{lightboxItem.category || 'Gallery'}</span>
              <button 
                onClick={() => setLightboxItem(null)} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img src={lightboxItem.src} alt={lightboxItem.title} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-6 bg-stone-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold">{lightboxItem.title || 'Oviya Ceramics Installation'}</h3>
                {lightboxItem.description && <p className="text-xs text-stone-400 mt-1">{lightboxItem.description}</p>}
              </div>
              <button
                onClick={() => {
                  const item = lightboxItem;
                  setLightboxItem(null);
                  if (onOpenInquiry) onOpenInquiry({ title: item.title, image: item.src });
                }}
                className="bg-primary hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md shrink-0"
              >
                Enquire This Design
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
