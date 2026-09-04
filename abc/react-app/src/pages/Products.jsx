import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('Floor Tiles');
  const [selectedSizes, setSelectedSizes] = useState([]);
  
  const categories = [
    "All Tiles", "Wall Tiles", "Floor Tiles", "Athangudi Tiles", "Aqua Faucet", 
    "Sanitaryware", "Kitchen Sink", "Flush Tank", "PTMT Taps", "Adhesive And Grout"
  ];
  
  const sizes = [
    "12x22 Tiles", "12X8 Tiles", "20X20 Tiles", "40X8 Tiles", "48X24 Tiles", "64X32 Tiles", 
    "72X48 Tiles", "96X32 Tiles", "12X12 Tiles", "24X24 Tiles", "18X12 Tiles", "15X10 Tiles", 
    "16X16 Tiles", "24X12 Tiles"
  ];

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const products = [
    {
      id: 1,
      image: "/macauba_white_1788269599918.jpg",
      title: "MACAUBA WHITE",
      size: "48X24",
      inStock: true,
      price: 84,
      oldPrice: 93
    },
    {
      id: 2,
      image: "/carnabi_bianco_1788269612995.jpg",
      title: "CARNABI BIANCO",
      size: "48X24",
      inStock: true,
      price: 84,
      oldPrice: 93
    },
    {
      id: 3,
      image: "/carnabi_decor_1788269626300.jpg",
      title: "CARNABI DECOR",
      size: "48X24",
      inStock: true,
      price: 99,
      oldPrice: 110
    }
  ];

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[72px] md:pt-[88px] pb-32 min-h-screen">
      
      {/* Category Navigation Bar */}
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

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-6">
        {/* Breadcrumbs */}
        <div className="font-body-md text-sm text-industrial-gray mb-8">
          <Link to="/" className="hover:text-primary">Home</Link> <span className="mx-1">/</span>
          <span className="hover:text-primary cursor-pointer">Tiles</span> <span className="mx-1">/</span>
          <span className="text-primary font-medium">{activeCategory}</span>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar (Sticky Filters) */}
          <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-32 self-start border border-surface-variant rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="p-6">
              <h3 className="font-headline-sm font-bold text-lg mb-6 text-on-surface">Size</h3>
              <div className="space-y-4">
                {sizes.map(size => (
                  <label key={size} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        selectedSizes.includes(size) ? 'bg-primary border-primary' : 'border-industrial-gray group-hover:border-primary'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSize(size);
                      }}
                    >
                      {selectedSizes.includes(size) && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
                    </div>
                    <span 
                      className="font-body-md text-on-surface text-[15px]"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSize(size);
                      }}
                    >
                      {size}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <h1 className="font-headline-xl text-[28px] md:text-[32px] font-bold text-on-surface mb-4">
              {activeCategory}
            </h1>
            <p className="font-body-md text-[#555555] text-base leading-relaxed mb-10 max-w-4xl">
              Floor tiles are durable, versatile materials used for covering floors in residential, commercial, and industrial spaces. Made from ceramic, porcelain, vitrified, or natural stone, they come in various sizes, colors, and textures. Floor tiles are easy to clean, water-resistant, and long-lasting, offering both functionality and aesthetic appeal for different interior and exterior designs.
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="bg-white border border-surface-variant rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow group flex flex-col">
                  
                  {/* Image Area */}
                  <div className="relative aspect-[4/3] bg-surface-variant overflow-hidden cursor-pointer">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    
                    {/* 360 Icon Overlay */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-primary font-bold text-[22px]">360</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-headline-sm font-bold text-on-surface text-base">{product.title}</h3>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-body-md text-[#888888] text-[13px] font-medium">{product.size}</span>
                      {product.inStock && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                          <span className="font-headline-sm text-on-surface text-[13px] font-semibold">In Stock</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto flex items-baseline gap-2">
                      <span className="font-headline-sm font-bold text-[22px] text-on-surface">₹{product.price}</span>
                      <span className="font-body-md text-[#888888] text-[14px] line-through">₹{product.oldPrice}/sq.ft</span>
                    </div>
                  </div>
                  
                </Link>
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Products;
