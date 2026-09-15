import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CategoryBar from '../components/CategoryBar';

const ProductDetails = ({ onOpenInquiry, onOpenVisualizer }) => {
  const { id } = useParams();
  const { products } = useData();
  
  // Find matching product or fallback to first product
  const product = products.find(p => String(p.id) === String(id)) || products[0] || {
    id: 1,
    image: "/sanitaryware_1788246783314.jpg",
    title: "BIANCO ONDULUTO",
    categoryType: "GLAZED VITRIFIED TILES",
    category: "Glazed Vitrified",
    size: "119x280 cm",
    inStock: true,
    price: 84,
    oldPrice: 93,
    description: "High-end ceramic slab engineered for elegance and extreme durability."
  };

  const [activeCategory, setActiveCategory] = useState(product.category || 'All Tiles');
  const [activeTab, setActiveTab] = useState('details');
  const [boxes, setBoxes] = useState(1);
  const [area, setArea] = useState(14.4); // e.g. 1 box = 14.4 sqft

  const handleBoxChange = (increment) => {
    setBoxes(prev => {
      const newBoxes = Math.max(1, prev + increment);
      setArea((newBoxes * 14.4).toFixed(2));
      return newBoxes;
    });
  };

  const handleAreaChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setArea(val);
    setBoxes(Math.ceil(val / 14.4));
  };

  // Dynamic similar products from context
  const similarProducts = products.filter(p => String(p.id) !== String(product.id)).slice(0, 4);

  // Handle multiple sizes if separated by commas or slashes
  const availableSizes = (product.size || '').split(/[,/]/).map(s => s.trim()).filter(Boolean);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || product.size);

  useEffect(() => {
    if (availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    }
  }, [id, product.size]);

  const handleInquiryTrigger = () => {
    if (onOpenInquiry) {
      onOpenInquiry({
        ...product,
        size: selectedSize,
        boxes,
        area
      });
    }
  };

  const handleVisualizerTrigger = () => {
    if (onOpenVisualizer) {
      onOpenVisualizer(product);
    }
  };

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[72px] md:pt-[88px] pb-32 min-h-screen">
      {/* Category Navigation Bar */}
      <CategoryBar activeCategory={activeCategory} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-6">
        {/* Breadcrumbs */}
        <div className="font-body-md text-sm text-industrial-gray mb-8">
          <Link to="/" className="hover:text-primary">Home</Link> <span className="mx-1">/</span>
          <Link to="/products" className="hover:text-primary">Tiles</Link> <span className="mx-1">/</span>
          <Link to="/products" className="hover:text-primary">{product.category || activeCategory}</Link> <span className="mx-1">/</span>
          <span className="text-primary font-medium">{product.title}</span>
        </div>

        {/* Main Product Layout */}
        <div className="flex flex-col lg:flex-row gap-10 mb-20">
          
          {/* Left Column - Media */}
          <div className="w-full lg:w-[55%] flex gap-4 h-auto lg:h-[600px]">
            {/* Thumbnails */}
            <div className="w-20 md:w-24 shrink-0 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
              <div className="w-full aspect-square border-2 border-primary rounded-lg overflow-hidden cursor-pointer">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Main Image */}
            <div className="flex-1 bg-surface-variant rounded-2xl relative overflow-hidden flex items-center justify-center border border-stone-200">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="w-full lg:w-[45%] flex flex-col">
            {/* Title & Stock */}
            <div className="flex justify-between items-start mb-2">
              <h1 className="font-headline-xl text-3xl md:text-4xl font-bold text-on-surface uppercase tracking-wide">{product.title}</h1>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
              <span className="font-headline-sm text-on-surface text-[14px] font-semibold">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="mx-2 text-stone-300">|</span>
              <span className="text-stone-500 text-xs uppercase font-semibold">{selectedSize}</span>
            </div>

            {/* Available Sizes Picker */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
                  Available Sizes / Dimensions:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border ${
                        selectedSize === sz
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-headline-xl font-bold text-[32px] text-primary">₹{product.price}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-industrial-gray text-lg line-through">₹{product.oldPrice} MRP</span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm font-bold">Offer</span>
                  </>
                )}
              </div>
              {product.description && (
                <p className="text-stone-600 text-sm mt-3 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Calculator Card */}
            <div className="bg-surface-container border border-surface-variant rounded-xl p-5 mb-8">
              <h3 className="font-headline-sm font-bold text-lg mb-4 text-on-surface">Area Calculator</h3>
              
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-industrial-gray mb-1">Total area (sq.ft)</label>
                  <input 
                    type="number" 
                    value={area}
                    onChange={handleAreaChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-industrial-gray mb-1">Boxes</label>
                  <div className="flex items-center border border-gray-300 rounded-lg h-[38px] bg-white">
                    <button onClick={() => handleBoxChange(-1)} className="px-3 text-lg hover:text-primary">-</button>
                    <div className="flex-1 text-center text-sm font-medium border-x border-gray-300 h-full flex items-center justify-center">
                      {boxes}
                    </div>
                    <button onClick={() => handleBoxChange(1)} className="px-3 text-lg hover:text-primary">+</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleInquiryTrigger}
                  className="flex-1 bg-white border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-red-50 transition uppercase text-xs tracking-wider"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleInquiryTrigger}
                  className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-red-700 transition uppercase text-xs tracking-wider shadow-md"
                >
                  Get a Quote
                </button>
              </div>
            </div>

            {/* Accordions */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Product Details Tab */}
              <div className="border-b border-gray-200">
                <button 
                  className="w-full px-5 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition"
                  onClick={() => setActiveTab(activeTab === 'details' ? '' : 'details')}
                >
                  <span className="font-headline-sm font-bold text-on-surface">Product Details</span>
                  <span className="material-symbols-outlined">
                    {activeTab === 'details' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {activeTab === 'details' && (
                  <div className="px-5 pb-5 bg-white">
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                      <div className="text-industrial-gray">Material</div>
                      <div className="font-medium">{product.material || 'Ceramic / Vitrified'}</div>
                      
                      <div className="text-industrial-gray">Finish</div>
                      <div className="font-medium">{product.finish || 'Polished / Glossy'}</div>
                      
                      <div className="text-industrial-gray">Net Quantity</div>
                      <div className="font-medium">{product.netQuantity || '4 Pieces/Box'}</div>
                      
                      <div className="text-industrial-gray">Brand</div>
                      <div className="font-medium">{product.brand || 'Oviya Ceramics'}</div>
                      
                      <div className="text-industrial-gray">Selected Size</div>
                      <div className="font-medium">{selectedSize || product.size || '60x120 cm'}</div>
                      
                      <div className="text-industrial-gray">Where To Use</div>
                      <div className="font-medium">{product.category || 'Floor, Indoor'}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tool Tab */}
              <div>
                <button 
                  className="w-full px-5 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition"
                  onClick={() => setActiveTab(activeTab === 'tool' ? '' : 'tool')}
                >
                  <span className="font-headline-sm font-bold text-on-surface">Tool</span>
                  <span className="material-symbols-outlined">
                    {activeTab === 'tool' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {activeTab === 'tool' && (
                  <div className="px-5 pb-5 bg-white">
                    <p className="text-sm text-[#555555] mb-4">Need help calculating exactly how many tiles you need for your complex space? Use our advanced calculation tool or request a quote from our experts.</p>
                    <button 
                      onClick={handleInquiryTrigger}
                      className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-red-700 transition uppercase text-xs tracking-wider"
                    >
                      Request Quote
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Explore Similar Tiles */}
        <div>
          <h2 className="font-headline-xl text-2xl font-bold text-on-surface mb-6">Explore Similar Tiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="bg-white border border-surface-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="relative aspect-[4/3] bg-surface-variant overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="p-4 flex flex-col">
                  <h3 className="font-headline-sm font-bold text-on-surface text-sm mb-2">{product.title}</h3>
                  <div className="flex justify-between items-end">
                    <span className="font-headline-sm font-bold text-lg text-on-surface">₹{product.price}</span>
                    <span className="font-body-md text-[#888888] text-xs line-through">₹{product.oldPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
