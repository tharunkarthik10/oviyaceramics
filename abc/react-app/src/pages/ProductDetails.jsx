import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import CategoryBar from '../components/CategoryBar';

const ProductDetails = ({ onOpenInquiry, onOpenVisualizer }) => {
  const { id } = useParams();
  const { products } = useData();
  const { addToCart, openCart } = useCart();
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  
  // Find matching product or fallback to first product
  const product = products.find(p => String(p.id) === String(id)) || products[0] || {
    id: 1,
    image: "/tiles/tile_1.jpg",
    title: "BIANCO ONDULUTO",
    categoryType: "GLAZED VITRIFIED TILES",
    category: "Glazed Vitrified",
    size: "600x1200 mm",
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
      setArea(Number((newBoxes * 14.4).toFixed(2)));
      return newBoxes;
    });
  };

  const handleAreaChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setArea(val);
    setBoxes(Math.max(1, Math.ceil(val / 14.4)));
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

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      boxes,
      area: Number(area),
      price: product.price
    });
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 2500);
    openCart();
  };

  const handleGetQuote = () => {
    if (onOpenInquiry) {
      onOpenInquiry({
        ...product,
        size: selectedSize,
        boxes,
        area: Number(area)
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
          <div className="w-full lg:w-[48%] flex gap-4 h-auto lg:h-[460px]">
            {/* Thumbnails */}
            <div className="w-16 md:w-20 shrink-0 flex flex-col gap-3 overflow-y-auto hide-scrollbar">
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
              {product.ethnicity && (
                <>
                  <span className="mx-2 text-stone-300">|</span>
                  <span className="bg-amber-50 text-amber-900 border border-amber-200 text-xs px-2.5 py-0.5 rounded-md font-semibold">{product.ethnicity}</span>
                </>
              )}
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-headline-sm font-bold text-lg text-on-surface">Area Calculator</h3>
                <span className="text-xs text-stone-500 font-medium">1 Box ≈ 14.4 sq.ft</span>
              </div>
              
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-industrial-gray mb-1">Total area (sq.ft)</label>
                  <input 
                    type="number" 
                    min="1"
                    step="0.1"
                    value={area}
                    onChange={handleAreaChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-industrial-gray mb-1">Boxes</label>
                  <div className="flex items-center border border-gray-300 rounded-lg h-[38px] bg-white">
                    <button 
                      type="button"
                      onClick={() => handleBoxChange(-1)} 
                      className="px-3 text-lg hover:text-primary font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center text-sm font-bold border-x border-gray-300 h-full flex items-center justify-center">
                      {boxes}
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleBoxChange(1)} 
                      className="px-3 text-lg hover:text-primary font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Estimated Price Calculation: Listed price × number of units/boxes */}
              <div className="flex justify-between items-center px-3.5 py-2.5 bg-stone-100 rounded-lg text-xs mb-5 border border-stone-200">
                <span className="text-stone-600 font-medium">
                  Estimated Tile Cost ({boxes} {boxes === 1 ? 'Box' : 'Boxes'} × ₹{product.price || 84}):
                </span>
                <span className="font-bold text-sm text-stone-900 font-serif">
                  ₹{((boxes) * (Number(product.price) || 84)).toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 border-2 font-bold py-3.5 px-4 rounded-xl transition uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    addedToCartToast
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                      : 'bg-white border-primary text-primary hover:bg-red-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {addedToCartToast ? 'check_circle' : 'add_shopping_cart'}
                  </span>
                  <span>{addedToCartToast ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                </button>

                <button 
                  type="button"
                  onClick={handleGetQuote}
                  className="flex-1 bg-primary text-white font-bold py-3.5 px-4 rounded-xl hover:bg-red-700 transition uppercase text-xs tracking-wider shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">request_quote</span>
                  <span>Get a Quote</span>
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
                      
                      {product.ethnicity && (
                        <>
                          <div className="text-industrial-gray">Design Ethnicity</div>
                          <div className="font-semibold text-primary">{product.ethnicity}</div>
                        </>
                      )}
                      
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
          <h2 className="font-headline-xl text-xl font-bold text-on-surface mb-4">Explore Similar Tiles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {similarProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col">
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {product.finish && (
                    <span className="absolute top-1.5 right-1.5 bg-black/70 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                      {product.finish}
                    </span>
                  )}
                </div>
                <div className="p-2.5 flex flex-col flex-1">
                  <h3 className="font-bold text-stone-900 text-xs truncate mb-1" title={product.title}>{product.title}</h3>
                  <div className="flex justify-between items-baseline mt-auto pt-1 border-t border-stone-100">
                    <span className="font-bold text-xs sm:text-sm text-stone-900">₹{product.price}</span>
                    <span className="text-[#888888] text-[10px] line-through">₹{product.oldPrice}</span>
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
