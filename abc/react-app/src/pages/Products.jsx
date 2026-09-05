import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'Floor Tiles';
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [gridCols, setGridCols] = useState(2); // 1 or 2 on mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    "Floor Tiles", "Wall Tiles", "Glazed Vitrified", "Polished Vitrified", 
    "Outdoor Tiles", "Commercial Spaces", "Sanitaryware", "Kitchen Tiles"
  ];
  
  const sizes = [
    "120x280 cm", "120x240 cm", "120x120 cm", "60x120 cm", 
    "60x60 cm", "48x24 in", "24x24 in", "12x24 in"
  ];

  const categoryDescriptions = {
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

  const products = [
    {
      id: 1,
      image: "/sanitaryware_1788246783314.jpg",
      title: "BIANCO ONDULUTO",
      categoryType: "GLAZED VITRIFIED TILES",
      size: "119x280 cm-5.5 mm",
      inStock: true,
      price: 84,
      oldPrice: 93
    },
    {
      id: 2,
      image: "/hero_tiles_bg_1788246751274.jpg",
      title: "LITHICO BEIGE",
      categoryType: "GLAZED VITRIFIED TILES",
      size: "119x240 cm",
      inStock: true,
      price: 84,
      oldPrice: 93
    },
    {
      id: 3,
      image: "/floor_wall_tiles_1788246766216.jpg",
      title: "CALCUTA IMPERIAL A",
      categoryType: "GLAZED VITRIFIED TILES",
      size: "119x240 cm",
      inStock: true,
      price: 99,
      oldPrice: 110
    },
    {
      id: 4,
      image: "/granites_elevation_1788246797316.jpg",
      title: "LABURNUM MARFIL",
      categoryType: "GRES TILES",
      size: "60x120 cm",
      inStock: true,
      price: 76,
      oldPrice: 88
    },
    {
      id: 5,
      image: "/macauba_white_1788269599918.jpg",
      title: "MACAUBA WHITE",
      categoryType: "POLISHED VITRIFIED",
      size: "120x240 cm",
      inStock: true,
      price: 92,
      oldPrice: 105
    },
    {
      id: 6,
      image: "/carnabi_bianco_1788269612995.jpg",
      title: "CARNABI BIANCO",
      categoryType: "CERAMIC WALL TILES",
      size: "60x120 cm",
      inStock: true,
      price: 68,
      oldPrice: 79
    }
  ];

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[60px] md:pt-[88px] pb-24 md:pb-32 min-h-screen">
      
      {/* Category Navigation Bar (Desktop) */}
      <div className="w-full bg-stone-100 border-b border-stone-200 overflow-hidden hidden md:block">
        <div className="max-w-[1400px] mx-auto px-2 flex items-center justify-center h-12">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 lg:px-4 h-full flex items-center justify-center font-headline-sm text-[12px] lg:text-[13px] font-medium transition-colors whitespace-nowrap ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'text-on-surface hover:bg-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-4 md:mt-6">

        {/* Hero Category Banner (Kajaria Style) */}
        <div className="w-full rounded-md overflow-hidden mb-6 shadow-sm border border-stone-200">
          {/* Banner Image */}
          <div className="w-full h-44 sm:h-64 md:h-80 relative overflow-hidden bg-stone-900">
            <img 
              src="/hero_tiles_bg_1788246751274.jpg" 
              alt={activeCategory} 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          {/* Banner Warm Gold Block */}
          <div className="bg-[#9E7D3B] text-white p-5 sm:p-8">
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              {activeCategory}
            </h1>
            <p className="text-white/90 text-xs sm:text-sm font-light leading-relaxed max-w-3xl mb-4">
              {categoryDescriptions[activeCategory] || "Oviya's premium ceramic and vitrified tiles are engineered for lasting beauty, superior finish, and effortless architectural styling."}
            </p>
            {/* Correct Breadcrumb Path */}
            <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link to="/products" className="hover:text-white">Products</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-white font-semibold">{activeCategory}</span>
            </div>
          </div>
        </div>

        {/* Mobile Category Dropdown Selector */}
        <div className="md:hidden mb-4">
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Select Category:</label>
          <select 
            value={activeCategory} 
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full py-2.5 px-4 bg-stone-50 border border-stone-300 rounded font-medium text-sm text-stone-800 focus:outline-none focus:border-primary"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Filter & View Control Bar */}
        <div className="bg-stone-50 border border-stone-200 rounded p-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Filter Drawer Trigger Button */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-300 rounded shadow-sm text-xs font-medium text-stone-800 hover:bg-stone-100"
            >
              <span className="material-symbols-outlined text-[18px] text-[#9E7D3B]">tune</span>
              <span>{selectedSizes.length > 0 ? `${selectedSizes.length} Filters Active` : 'Filter By'}</span>
            </button>
            <span className="text-xs text-stone-500 hidden sm:inline">{products.length * 105} tiles available</span>
          </div>

          {/* View Toggle Icons (1 Col vs 2 Cols on mobile) */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-stone-500 mr-2 hidden md:inline">{products.length} tiles available</span>
            <button 
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded ${gridCols === 2 ? 'bg-stone-200 text-[#9E7D3B]' : 'text-stone-400'}`}
              title="2 Columns View"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button 
              onClick={() => setGridCols(1)}
              className={`p-1.5 rounded md:hidden ${gridCols === 1 ? 'bg-stone-200 text-[#9E7D3B]' : 'text-stone-400'}`}
              title="1 Column View"
            >
              <span className="material-symbols-outlined text-[20px]">view_stream</span>
            </button>
          </div>
        </div>

        {/* Two-Column / Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar (Desktop Filters) */}
          <aside className="hidden lg:block w-[260px] shrink-0 sticky top-32 self-start border border-stone-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="p-5">
              <h3 className="font-headline-sm font-bold text-base mb-4 text-on-surface uppercase tracking-wider pb-2 border-b border-stone-100">Filter By Size</h3>
              <div className="space-y-3">
                {sizes.map(size => (
                  <label key={size} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => toggleSize(size)}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="font-body-md text-stone-700 text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area (Product Grid) */}
          <main className="flex-1 w-full min-w-0">
            
            {/* Product Grid (2 columns on mobile by default like Kajaria screenshots) */}
            <div className={`grid gap-4 md:gap-6 ${gridCols === 1 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3'}`}>
              {products.map(product => (
                <Link 
                  to={`/product/${product.id}`} 
                  key={product.id} 
                  className="bg-white border border-stone-200 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                >
                  {/* Image Area with 360 Badge */}
                  <div className="relative aspect-square sm:aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    
                    {/* 360° Icon Overlay Badge (Kajaria Style) */}
                    <div className="absolute bottom-2.5 left-2.5 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-stone-700 font-bold text-[16px] sm:text-[18px]">360</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col text-left">
                    <h3 className="font-bold text-stone-900 text-xs sm:text-sm uppercase tracking-wide mb-1 leading-snug">
                      {product.title}
                    </h3>
                    
                    <span className="text-[#9E7D3B] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mb-1">
                      {product.categoryType}
                    </span>

                    <span className="text-stone-500 text-[11px] sm:text-xs font-normal mb-3">
                      {product.size}
                    </span>

                    <div className="mt-auto flex items-baseline gap-2 pt-2 border-t border-stone-100">
                      <span className="font-bold text-sm sm:text-base text-stone-900">₹{product.price}</span>
                      <span className="text-stone-400 text-xs line-through">₹{product.oldPrice}/sq.ft</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

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
              <div>
                <h4 className="font-semibold text-sm text-stone-900 uppercase tracking-wider mb-3">Tile Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        activeCategory === cat ? 'bg-primary text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-stone-900 uppercase tracking-wider mb-3">Tile Dimensions</h4>
                <div className="space-y-2">
                  {sizes.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleSize(size)}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="text-xs text-stone-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 flex gap-3 mt-6">
              <button 
                onClick={() => setSelectedSizes([])}
                className="w-1/2 py-2.5 border border-stone-300 rounded text-xs font-semibold uppercase text-stone-600 hover:bg-stone-100"
              >
                Clear All
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-1/2 py-2.5 bg-primary text-white rounded text-xs font-semibold uppercase hover:bg-primary-container"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Products;
