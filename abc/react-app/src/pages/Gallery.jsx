import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Gallery = ({ onOpenInquiry }) => {
  const { galleryItems, products } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Combine gallery items and all catalog products so every current and future posted image is visible in gallery
  const combinedGallery = useMemo(() => {
    const seenSrcs = new Set();
    const list = [];

    // 1. Add all standard gallery items
    (galleryItems || []).forEach(item => {
      if (item && item.src && !seenSrcs.has(item.src)) {
        seenSrcs.add(item.src);
        list.push(item);
      }
    });

    // 2. Add all products (digital wall, elevation, vitrified, sanitaryware, etc.)
    (products || []).forEach(prod => {
      if (prod && prod.image && !seenSrcs.has(prod.image)) {
        seenSrcs.add(prod.image);
        list.push({
          id: `prod_${prod.id}`,
          title: prod.title,
          category: prod.category || 'Wall Tiles',
          categoryType: prod.categoryType || '',
          src: prod.image,
          description: prod.description || `${prod.title} - ${prod.finish || ''} (${prod.size || ''})`,
          isProduct: true,
          productId: prod.id,
          price: prod.price
        });
      }
    });

    return list;
  }, [galleryItems, products]);

  const categories = [
    'all',
    'Wall Tiles',
    'Kitchen Tiles',
    'Elevation Tiles',
    'Floor Tiles',
    'Bathroom Tiles',
    'Portico Tiles',
    'Sanitarywares',
    'Warehouse',
    'Transport'
  ];

  const filteredItems = combinedGallery.filter(item => {
    const itemCat = (item.category || '').toLowerCase();
    const activeCat = activeCategory.toLowerCase();

    const matchesCategory = activeCat === 'all' || 
      itemCat === activeCat ||
      itemCat.includes(activeCat) ||
      activeCat.includes(itemCat);
    
    const matchesSearch = !searchQuery.trim() || 
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (cat) => {
    if (cat === 'all') return combinedGallery.length;
    const catLower = cat.toLowerCase();
    return combinedGallery.filter(item => {
      const itemCat = (item.category || '').toLowerCase();
      return itemCat === catLower || itemCat.includes(catLower) || catLower.includes(itemCat);
    }).length;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  const currentLightboxItem = lightboxIndex !== null && filteredItems[lightboxIndex] 
    ? filteredItems[lightboxIndex] 
    : null;

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[60px] md:pt-[88px] pb-24 md:pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-4 md:mt-6">
        
        {/* Hero Section */}
        <section className="py-8 md:py-12 border-b border-stone-100">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest rounded-full mb-3">
              Official Media & Product Gallery
            </span>
            <h1 className="font-headline-xl text-3xl md:text-5xl text-primary font-bold mb-4 tracking-tight">
              Visualizing Precision
            </h1>
            <p className="font-body-lg text-base md:text-lg text-stone-600 font-light leading-relaxed">
              Explore our complete architectural archive of {combinedGallery.length}+ images spanning industrial installations, living spaces, designer wall & vitrified tiles, sanitaryware suites, and manufacturing facility.
            </p>
          </div>
        </section>

        {/* Case Study / Facility Highlight */}
        <section className="my-6 md:my-8">
          <div className="w-full">
            <div className="bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 grid grid-cols-1 md:grid-cols-12 group hover:shadow-lg transition-shadow duration-300">
              <div className="md:col-span-5 lg:col-span-5 h-48 sm:h-56 md:h-auto min-h-[200px] md:max-h-[270px] overflow-hidden bg-stone-900">
                <img 
                  alt="Oviya Ceramics Branch & Showroom" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                  src="/oviya_showroom.jpg"
                />
              </div>
              <div className="md:col-span-7 lg:col-span-7 p-5 sm:p-6 md:p-7 flex flex-col justify-center">
                <span className="inline-block bg-primary/10 text-primary font-bold text-[11px] uppercase px-2.5 py-1 rounded-full mb-2 w-max tracking-wider">
                  Featured Facility & Showroom
                </span>
                <h2 className="font-headline-md text-xl sm:text-2xl text-stone-900 font-bold mb-2">
                  Dindigul Headquarters & Experience Center
                </h2>
                <p className="font-body-md text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Our flagship showroom, bulk inventory stockyard, and direct branch located on Bathalagundu Road, Dindigul. Showcasing architectural vitrified slabs, elevations, granites, and sanitaryware.
                </p>
                <div>
                  <button 
                    onClick={() => onOpenInquiry && onOpenInquiry({ title: 'Dindigul Headquarters & Experience Center', image: '/oviya_showroom.jpg' })}
                    className="bg-primary hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest shadow-md transition-colors cursor-pointer"
                  >
                    Enquire Branch Specs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid Section */}
        <section className="py-8 bg-white border-t border-stone-100">
          <div className="w-full">
            
            {/* Filter Bar & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              {/* Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const count = getCategoryCount(cat);
                  const isSelected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <span>{cat === 'all' ? 'All Images' : cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px] max-w-sm">
                <input
                  type="text"
                  placeholder="Search photo, finish, stone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                />
                <span className="material-symbols-outlined text-stone-400 text-base absolute left-3 top-2.5">
                  search
                </span>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Gallery Count & Active Filter Indicator */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-6 pb-2 border-b border-stone-100">
              <div>
                Showing <strong className="text-stone-900">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'image' : 'images'}
                {activeCategory !== 'all' && <span> in <span className="text-primary font-semibold">{activeCategory}</span></span>}
                {searchQuery && <span> matching "<span className="text-stone-900 font-semibold">{searchQuery}</span>"</span>}
              </div>
              {activeCategory !== 'all' || searchQuery ? (
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Reset Filters
                </button>
              ) : null}
            </div>

            {/* Gallery Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {filteredItems.map((item, idx) => (
                <div 
                  key={item.id || idx} 
                  onClick={() => setLightboxIndex(idx)}
                  className="aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden group cursor-pointer border border-stone-200 hover:border-primary/50 hover:shadow-xl transition-all relative"
                >
                  <img 
                    src={item.src} 
                    alt={item.title || `Gallery Image ${idx + 1}`} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                    onError={(e) => {
                      e.currentTarget.src = "/hero_tiles_bg_1788246751274.jpg";
                    }}
                  />
                  
                  {/* Subtle hover gradient with details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white">
                    <div className="flex justify-end">
                      <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm">zoom_in</span>
                      </span>
                    </div>
                    <div>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-1.5 py-0.5 rounded mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-xs tracking-tight leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Zero Results State */}
            {filteredItems.length === 0 && (
              <div className="bg-gradient-to-b from-stone-50 to-white border border-stone-200/80 rounded-2xl p-10 sm:p-14 text-center flex flex-col items-center justify-center my-6 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-3xl">photo_camera</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
                  Project Gallery
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                  No images found
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  No images matching your current filter criteria. Click below to view the entire website photo collection.
                </p>
                <button 
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-red-800 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">filter_none</span>
                  <span>View All {combinedGallery.length} Gallery Photos</span>
                </button>
              </div>
            )}

          </div>
        </section>

      </div>

      {/* Lightbox Modal with Next/Prev and Inquiry */}
      {currentLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-stone-900 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 px-6 bg-stone-950 flex justify-between items-center border-b border-stone-800">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-xs uppercase font-bold tracking-widest bg-amber-400/10 px-2.5 py-1 rounded">
                  {currentLightboxItem.category || 'Gallery'}
                </span>
                <span className="text-stone-400 text-xs font-mono">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <button 
                onClick={() => setLightboxIndex(null)} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Modal Main Image & Navigation Arrows */}
            <div className="relative flex-1 max-h-[62vh] min-h-[300px] bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={currentLightboxItem.src} 
                alt={currentLightboxItem.title} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/hero_tiles_bg_1788246751274.jpg";
                }}
              />

              {/* Prev Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
                  aria-label="Previous image"
                >
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
              )}

              {/* Next Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
                  aria-label="Next image"
                >
                  <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 px-6 bg-stone-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-stone-800">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100">
                  {currentLightboxItem.title || 'Oviya Ceramics Installation'}
                </h3>
                {currentLightboxItem.description && (
                  <p className="text-xs text-stone-400 mt-1 max-w-xl leading-relaxed">
                    {currentLightboxItem.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919080897776?text=Hi%20Oviya%20Ceramics,%20I'm%20interested%20in%20this%20design:%20${encodeURIComponent(currentLightboxItem.title || 'Tiles')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>WhatsApp</span>
                </a>

                {currentLightboxItem.productId && (
                  <Link
                    to={`/product/${currentLightboxItem.productId}`}
                    onClick={() => setLightboxIndex(null)}
                    className="flex-1 sm:flex-initial bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    <span>View Details</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    const item = currentLightboxItem;
                    setLightboxIndex(null);
                    if (onOpenInquiry) onOpenInquiry({ title: item.title, image: item.src });
                  }}
                  className="flex-1 sm:flex-initial bg-primary hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  <span>Quote</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
