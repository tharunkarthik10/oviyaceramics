import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CategoryBar, { CATEGORIES } from '../components/CategoryBar';

const Products = ({ onOpenVisualizer, onOpenStoreLocator }) => {
  const { products: allProducts } = useData();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All Tiles';
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [selectedEthnicities, setSelectedEthnicities] = useState([]);
  const [gridCols, setGridCols] = useState(2); // 1 or 2 on mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = CATEGORIES;

  const sizes = [
    "120x280 cm",
    "120x240 cm",
    "80x160 cm",
    "60x120 cm",
    "80x80 cm",
    "60x60 cm",
    "30x60 cm",
    "30x45 cm",
    "40x40 cm",
    "30x30 cm",
    "20x30 cm",
    "20x20 cm"
  ];

  const finishes = [
    "Glossy",
    "Matt Carving",
    "Polished Glossy",
    "Mirror Glossy",
    "Endless Glossy",
    "Satin Interior",
    "Digital Vitrified Parking",
    "High Depth Elevation",
    "Dark Light Highlighter Concept"
  ];

  const ethnicities = [
    "Classic Italian Carrara",
    "Mediterranean Ocean Blue",
    "Royal Persian Vein Onyx",
    "Venetian Golden Onyx",
    "Tropical Exotic Green",
    "Nordic Minimalist Slate",
    "Aegean Coastal Marble",
    "Deep Ocean Azure Marble",
    "Tuscan Warm Calacatta",
    "Amazonian River Stone",
    "Contemporary Urban Mineral",
    "Spanish Marquina Black",
    "Royal Dubai Imperial Onyx",
    "Roman Warm Travertine",
    "Maldives Lagoon Turquoise",
    "Continuous Italian Bookmatch",
    "Midnight Blue Lapis Lazuli",
    "Arctic Ice Crystal",
    "Emerald Jadeite Stone",
    "Royal Cobalt Marble",
    "Heritage & Aquatic Concept"
  ];

  const categoryDescriptions = {
    "All Tiles": "Explore Oviya's complete collection of premium ceramic tiles, vitrified slabs, and sanitaryware.",
    "Floor Tiles": "Oviya's premium floor tiles are engineered for lasting durability, rich architectural textures, and seamless elegance across all indoor and outdoor spaces.",
    "Wall Tiles": "Crafted to transform interior walls into striking visual art, Oviya wall tiles offer water-resistant, easy-to-clean ceramic surfaces.",
    "Glazed Vitrified": "High-gloss and matte glazed vitrified tiles designed to bring high-end marble aesthetics to modern residential and commercial floors.",
    "Polished Vitrified": "Ultra-smooth, mirror-finish vitrified tiles with exceptional strength and stain resistance for luxury floor installations.",
    "Outdoor Tiles": "Heavy-duty anti-skid paving tiles engineered to endure weathering, moisture, and high impact for gardens, patios, and driveways.",
    "Commercial Spaces": "Industrial-grade vitrified floor solutions built for high-footfall environments like corporate centers, hotels, and retail showrooms.",
    "Sanitaryware": "Ergonomic, modern ceramic sanitaryware crafted for water efficiency, pristine hygienic finishes, and contemporary bathroom design.",
    "Kitchen Tiles": "Stain, heat, and oil-resistant tiles designed for pristine kitchen backsplashes and heavy-duty cooking environments."
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleFinish = (finish) => {
    setSelectedFinishes(prev => 
      prev.includes(finish) ? prev.filter(f => f !== finish) : [...prev, finish]
    );
  };

  const toggleEthnicity = (eth) => {
    setSelectedEthnicities(prev => 
      prev.includes(eth) ? prev.filter(e => e !== eth) : [...prev, eth]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedFinishes([]);
    setSelectedEthnicities([]);
  };

  const getSubCategories = () => {
    const cat = (activeCategory || '').toLowerCase();

    if (cat.includes('sanitaryware') || cat.includes('sanitarywares')) {
      return [
        "Wall-Hung EWCs",
        "Floor Mounted Closets",
        "Pedestal Wash Basins",
        "Countertop Basins",
        "Commercial Urinals",
        "Concealed Cisterns",
        "Accessibility EWCs"
      ];
    }

    if (cat.includes('fitting') || cat.includes('fittings')) {
      return [
        "Kitchen Faucets",
        "Bathroom Mixers",
        "Overhead Rain Showers",
        "Brass Bath Accessories",
        "Health Faucets"
      ];
    }

    if (cat.includes('granite') || cat.includes('granites')) {
      return [
        "Black Granite Slabs",
        "White & Mint Granite",
        "Red & Copper Granite",
        "Countertop Stones",
        "Staircase Steps"
      ];
    }

    // Default for Tiles & All Products
    return [
      "Floor Tiles",
      "Wall Tiles",
      "Elevation Tiles",
      "Bath Room Tiles",
      "Kitchen Tiles",
      "Glazed Vitrified",
      "Polished Vitrified",
      "Outdoor Pavers"
    ];
  };

  const getSubCategoriesTitle = () => {
    const cat = (activeCategory || '').toLowerCase();
    if (cat.includes('sanitaryware')) return 'SANITARYWARE TYPES';
    if (cat.includes('fitting')) return 'FITTING TYPES';
    if (cat.includes('granite')) return 'GRANITE TYPES';
    return 'TILE & PRODUCT TYPES';
  };

  // Filter products based on active category, size & finish filters
  const products = allProducts.filter(item => {
    const sizeQuery = item.size ? item.size.toLowerCase() : '';
    const descQuery = (item.description || '').toLowerCase();
    const titleQuery = (item.title || '').toLowerCase();
    const catTypeQuery = (item.categoryType || '').toLowerCase();
    const finishQuery = (item.finish || '').toLowerCase();

    const matchesCategory = activeCategory === "All Products" || activeCategory === "All Tiles" || 
      (item.category && item.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
      (item.categoryType && item.categoryType.toLowerCase().includes(activeCategory.toLowerCase())) ||
      (activeCategory.toLowerCase().includes((item.category || '').toLowerCase())) ||
      (item.title && item.title.toLowerCase().includes(activeCategory.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(activeCategory.toLowerCase())) ||
      (activeCategory.toLowerCase() === 'tiles' && (item.categoryType !== 'SANITARYWARE' && item.categoryType !== 'FITTINGS' && item.categoryType !== 'GRANITES'));

    const matchesSize = selectedSizes.length === 0 || selectedSizes.some(s => {
      const cleanS = s.toLowerCase().replace(/\s*tiles/g, '').trim();
      const cleanItem = sizeQuery.replace(/\s*tiles/g, '').trim();
      return cleanItem.includes(cleanS) || cleanS.includes(cleanItem);
    });

    const matchesFinish = selectedFinishes.length === 0 || selectedFinishes.some(f => {
      const cleanF = f.toLowerCase();
      return finishQuery.includes(cleanF) || descQuery.includes(cleanF) || titleQuery.includes(cleanF) || catTypeQuery.includes(cleanF);
    });

    const matchesEthnicity = selectedEthnicities.length === 0 || selectedEthnicities.some(e => {
      const cleanE = e.toLowerCase();
      const itemEth = (item.ethnicity || '').toLowerCase();
      return itemEth.includes(cleanE) || cleanE.includes(itemEth);
    });

    return matchesCategory && matchesSize && matchesFinish && matchesEthnicity;
  });

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[60px] md:pt-[88px] pb-24 md:pb-32 min-h-screen">
      
      {/* Category Navigation Bar (Desktop) */}
      <CategoryBar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-4 md:mt-6">

        {/* Hero Category Banner (White & Red Theme) */}
        <div className="w-full rounded-md overflow-hidden mb-6 shadow-sm border border-stone-200">
          <div className="w-full h-44 sm:h-64 md:h-80 relative overflow-hidden bg-stone-900">
            <img 
              src="/hero_tiles_bg_1788246751274.jpg" 
              alt={activeCategory} 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="bg-[#800000] text-white p-5 sm:p-8">
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              {activeCategory}
            </h1>
            <p className="text-white/90 text-xs sm:text-sm font-light leading-relaxed max-w-3xl mb-4">
              {categoryDescriptions[activeCategory] || "Oviya's premium ceramic tiles, vitrified slabs, sanitaryware, and natural granites are engineered for lasting beauty and architectural mastery."}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link to="/products" className="hover:text-white">Products</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-white font-semibold">{activeCategory}</span>
            </div>
          </div>
        </div>

        {/* Filter & View Control Bar */}
        <div className="bg-stone-50 border border-stone-200 rounded p-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-300 rounded shadow-sm text-xs font-medium text-stone-800 hover:bg-stone-100 lg:hidden"
            >
              <span className="material-symbols-outlined text-[18px] text-[#800000]">tune</span>
              <span>{(selectedSizes.length + selectedFinishes.length + selectedEthnicities.length) > 0 ? `${selectedSizes.length + selectedFinishes.length + selectedEthnicities.length} Filters Active` : 'Filter By'}</span>
            </button>
            <span className="text-xs text-stone-500">{products.length} products available</span>
            {(selectedSizes.length > 0 || selectedFinishes.length > 0 || selectedEthnicities.length > 0) && (
              <button 
                onClick={clearFilters}
                className="text-xs text-[#800000] font-semibold hover:underline ml-2"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded ${gridCols === 2 ? 'bg-[#800000]/10 text-[#800000] font-bold' : 'text-stone-400'}`}
              title="2 Grid View"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button 
              onClick={() => setGridCols(1)}
              className={`p-1.5 rounded md:hidden ${gridCols === 1 ? 'bg-[#800000]/10 text-[#800000] font-bold' : 'text-stone-400'}`}
              title="1 Column View"
            >
              <span className="material-symbols-outlined text-[20px]">view_stream</span>
            </button>
          </div>
        </div>

        {/* Two-Column / Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar (Desktop Filters - White & Dark Red Theme) */}
          <aside className="hidden lg:block w-[340px] shrink-0 sticky top-28 self-start border-2 border-stone-200 rounded-xl overflow-hidden bg-white shadow-md max-h-[85vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b-2 border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#800000] text-xl font-bold">tune</span>
                  <h3 className="font-bold text-lg text-stone-900 uppercase tracking-wide">Filter Products</h3>
                </div>
                {(selectedSizes.length > 0 || selectedFinishes.length > 0 || (activeCategory !== 'All Products' && activeCategory !== 'All Tiles')) && (
                  <button onClick={() => { setActiveCategory('All Products'); clearFilters(); }} className="text-xs text-[#800000] font-bold uppercase hover:underline bg-[#800000]/10 px-2.5 py-1 rounded">
                    Reset All
                  </button>
                )}
              </div>

              {/* 1. Main Collections / Categories */}
              <div>
                <h4 className="font-bold text-xs text-[#800000] uppercase tracking-wider mb-3 pb-1 border-b border-stone-200 flex justify-between items-center">
                  <span>PRODUCT COLLECTIONS</span>
                  <span className="text-[10px] text-stone-400 font-normal">SELECT ONE</span>
                </h4>
                <div className="space-y-2">
                  {["All Products", "Tiles", "Sanitarywares", "Fittings", "Granites"].map(col => {
                    const isActive = activeCategory && activeCategory.toLowerCase() === col.toLowerCase();
                    return (
                      <button
                        key={col}
                        onClick={() => setActiveCategory(col)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold transition-all text-left border ${
                          isActive
                            ? 'bg-[#800000] text-white border-[#800000] shadow-md scale-[1.01]'
                            : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-red-50 hover:border-[#800000] hover:text-[#800000]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[18px]">
                            {col === 'Tiles' ? 'grid_view' : col === 'Sanitarywares' ? 'bathtub' : col === 'Fittings' ? 'faucet' : col === 'Granites' ? 'countertops' : 'space_dashboard'}
                          </span>
                          <span className="tracking-wide">{col}</span>
                        </span>
                        {isActive && <span className="material-symbols-outlined text-base font-bold">check</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Context-Aware Sub-Categories */}
              <div>
                <h4 className="font-bold text-xs text-[#800000] uppercase tracking-wider mb-3 pb-1 border-b border-stone-200 flex justify-between items-center">
                  <span>{getSubCategoriesTitle()}</span>
                  <span className="text-[10px] text-stone-400 font-normal">FILTER BY TYPE</span>
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {getSubCategories().map(cat => {
                    const isActive = activeCategory && activeCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium transition-all text-left border ${
                          isActive
                            ? 'bg-[#800000] text-white border-[#800000] font-bold shadow-md scale-[1.01]'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-red-50 hover:border-[#800000] hover:text-[#800000]'
                        }`}
                      >
                        <span className="tracking-wide">{cat}</span>
                        <span className="material-symbols-outlined text-sm font-bold">
                          {isActive ? 'check' : 'chevron_right'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Tiles by Size (Metric cm) */}
              <div>
                <h4 className="font-bold text-xs text-[#800000] uppercase tracking-wider mb-3 pb-1 border-b border-stone-200">
                  Filter by Size (cm)
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {sizes.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer group hover:text-stone-900 py-0.5">
                      <input 
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleSize(size)}
                        className="accent-[#800000] w-4 h-4 rounded cursor-pointer"
                      />
                      <span className={`text-xs ${selectedSizes.includes(size) ? 'font-bold text-stone-900' : 'text-stone-700 font-normal'}`}>
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Tiles by Finish */}
              <div>
                <h4 className="font-bold text-xs text-[#800000] uppercase tracking-wider mb-3 pb-1 border-b border-stone-200">
                  Filter by Finish & Texture
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {finishes.map(finish => (
                    <label key={finish} className="flex items-center gap-3 cursor-pointer group hover:text-stone-900 py-0.5">
                      <input 
                        type="checkbox"
                        checked={selectedFinishes.includes(finish)}
                        onChange={() => toggleFinish(finish)}
                        className="accent-[#800000] w-4 h-4 rounded cursor-pointer"
                      />
                      <span className={`text-xs ${selectedFinishes.includes(finish) ? 'font-bold text-stone-900' : 'text-stone-700 font-normal'}`}>
                        {finish}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. Tiles by Design Ethnicity & Aesthetic */}
              <div>
                <h4 className="font-bold text-xs text-[#800000] uppercase tracking-wider mb-3 pb-1 border-b border-stone-200 flex justify-between items-center">
                  <span>Design Ethnicity & Style</span>
                  {selectedEthnicities.length > 0 && (
                    <span className="text-[10px] text-[#800000] font-bold">({selectedEthnicities.length})</span>
                  )}
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {ethnicities.map(eth => (
                    <label key={eth} className="flex items-center gap-3 cursor-pointer group hover:text-stone-900 py-0.5">
                      <input 
                        type="checkbox"
                        checked={selectedEthnicities.includes(eth)}
                        onChange={() => toggleEthnicity(eth)}
                        className="accent-[#800000] w-4 h-4 rounded cursor-pointer"
                      />
                      <span className={`text-xs ${selectedEthnicities.includes(eth) ? 'font-bold text-stone-900' : 'text-stone-700 font-normal'}`}>
                        {eth}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Main Content Area (Product Grid) */}
          <main className="flex-1 w-full min-w-0">
            
            {products.length === 0 ? (
              <div className="bg-gradient-to-b from-stone-50 to-white border border-stone-200/80 rounded-2xl p-10 sm:p-14 text-center flex flex-col items-center justify-center my-6 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-3xl">dashboard_customize</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#800000] mb-1">
                  Collection Showcase
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                  Nothing listed yet
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                  We are currently curating and uploading new exquisite surface designs for this category. In the meantime, explore our full catalog or contact our design team for live samples.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button 
                    onClick={() => { setActiveCategory('All Products'); clearFilters(); }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#800000] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-[#660000] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    <span>View All Collections</span>
                  </button>
                  <a
                    href="https://wa.me/919080897776?text=Hi%20Oviya%20Ceramics,%20I'm%20looking%20for%20tiles%20and%20would%20like%20to%20know%20what%20options%20you%20have%20available."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-stone-300 text-stone-800 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs hover:bg-stone-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-emerald-600 text-sm">chat</span>
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Product Grid (Compact Responsive Grid) */
              <div className={`grid gap-3 sm:gap-4 ${gridCols === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'}`}>
                {products.map(product => (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id} 
                    className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col hover:border-[#800000]/40"
                  >
                    {/* Image Area - Compact Aspect Ratio 3:4 */}
                    <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {product.finish && (
                        <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs">
                          {product.finish}
                        </span>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-2.5 sm:p-3 flex-1 flex flex-col text-left">
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        <span className="text-[#800000] font-bold text-[9px] sm:text-[10px] uppercase tracking-wider bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                          {product.categoryType || product.category}
                        </span>
                        {product.ethnicity && (
                          <span className="text-stone-600 font-medium text-[9px] sm:text-[10px] bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 truncate max-w-[110px]" title={product.ethnicity}>
                            {product.ethnicity}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-stone-900 text-xs sm:text-[13px] uppercase tracking-tight mb-1 truncate" title={product.title}>
                        {product.title}
                      </h3>

                      <span className="text-stone-500 text-[10px] sm:text-[11px] truncate mb-2" title={product.size}>
                        {product.size}
                      </span>

                      <div className="mt-auto flex items-baseline justify-between pt-1.5 border-t border-stone-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-stone-900">₹{product.price}</span>
                          <span className="text-stone-400 text-[10px] line-through">₹{product.oldPrice}</span>
                        </div>
                        <span className="text-[10px] text-stone-400">/sq.ft</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Mobile Filter Slide-Over Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <h3 className="font-bold text-lg text-stone-900 uppercase tracking-wider">Filter Tiles</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-1 text-stone-500 hover:text-stone-900">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6 flex-1">
              {/* Category */}
              <div>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider mb-3 pb-1 border-b border-stone-100">
                  Tile Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        activeCategory === cat ? 'bg-[#800000] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiles by Size */}
              <div>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider mb-3 pb-1 border-b border-stone-100">
                  Tiles by Size
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {sizes.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleSize(size)}
                        className="accent-[#800000] w-4 h-4"
                      />
                      <span className="text-xs text-stone-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tiles by Finish */}
              <div>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider mb-3 pb-1 border-b border-stone-100">
                  Tiles by Finish
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {finishes.map(finish => (
                    <label key={finish} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedFinishes.includes(finish)}
                        onChange={() => toggleFinish(finish)}
                        className="accent-[#800000] w-4 h-4"
                      />
                      <span className="text-xs text-stone-700">{finish}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tiles by Ethnicity / Style */}
              <div>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider mb-3 pb-1 border-b border-stone-100">
                  Design Ethnicity & Style
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {ethnicities.map(eth => (
                    <label key={eth} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedEthnicities.includes(eth)}
                        onChange={() => toggleEthnicity(eth)}
                        className="accent-[#800000] w-4 h-4"
                      />
                      <span className="text-xs text-stone-700">{eth}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex gap-3 mt-4">
              <button 
                onClick={clearFilters}
                className="w-1/2 py-2.5 border border-stone-300 rounded text-xs font-semibold uppercase text-stone-600 hover:bg-stone-100"
              >
                Clear All
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-1/2 py-2.5 bg-[#800000] text-white rounded text-xs font-semibold uppercase hover:bg-[#660000]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Bar (Exact Kajaria Mobile Layout) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 flex shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <button 
          onClick={() => onOpenVisualizer && onOpenVisualizer(products[0])}
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

export default Products;
