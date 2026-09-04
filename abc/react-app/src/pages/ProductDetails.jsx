import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState('Floor Tiles');
  const [activeTab, setActiveTab] = useState('details');
  const [boxes, setBoxes] = useState(1);
  const [area, setArea] = useState(14.4); // e.g. 1 box = 14.4 sqft
  
  const categories = [
    "All Tiles", "Wall Tiles", "Floor Tiles", "Athangudi Tiles", "Aqua Faucet", 
    "Sanitaryware", "Kitchen Sink", "Flush Tank", "PTMT Taps", "Adhesive And Grout"
  ];

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

  // Mock similar products
  const similarProducts = [
    { id: 1, image: "/macauba_white_1788269599918.jpg", title: "MACAUBA WHITE", size: "48X24", inStock: true, price: 84, oldPrice: 93 },
    { id: 2, image: "/carnabi_bianco_1788269612995.jpg", title: "CARNABI BIANCO", size: "48X24", inStock: true, price: 84, oldPrice: 93 },
    { id: 3, image: "/carnabi_decor_1788269626300.jpg", title: "CARNABI DECOR", size: "48X24", inStock: true, price: 99, oldPrice: 110 }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[72px] md:pt-[88px] pb-32 min-h-screen">
      {/* Category Navigation Bar */}
      <div className="w-full bg-stone-100 border-b border-stone-200 overflow-hidden hidden md:block">
        <div className="max-w-[1400px] mx-auto px-2 flex items-center justify-center h-12">
          {categories.map((category) => (
            <Link 
              key={category}
              to="/products"
              className={`px-3 lg:px-4 h-full flex items-center justify-center font-headline-sm text-[12px] lg:text-[13px] font-medium transition-colors whitespace-nowrap ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'text-on-surface hover:bg-stone-200'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-6">
        {/* Breadcrumbs */}
        <div className="font-body-md text-sm text-industrial-gray mb-8">
          <Link to="/" className="hover:text-primary">Home</Link> <span className="mx-1">/</span>
          <Link to="/products" className="hover:text-primary">Tiles</Link> <span className="mx-1">/</span>
          <Link to="/products" className="hover:text-primary">{activeCategory}</Link> <span className="mx-1">/</span>
          <span className="text-primary font-medium">BLOOM F</span>
        </div>

        {/* Main Product Layout */}
        <div className="flex flex-col lg:flex-row gap-10 mb-20">
          
          {/* Left Column - Media */}
          <div className="w-full lg:w-[55%] flex gap-4 h-auto lg:h-[600px]">
            {/* Thumbnails */}
            <div className="w-20 md:w-24 shrink-0 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
              <div className="w-full aspect-square border-2 border-primary rounded-lg overflow-hidden cursor-pointer">
                <img src="/brown_patterned_tile.jpg" alt="Thumbnail 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-full aspect-square border border-gray-200 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100">
                <img src="/brown_patterned_tile.jpg" alt="Thumbnail 2" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Main Image */}
            <div className="flex-1 bg-surface-variant rounded-2xl relative overflow-hidden flex items-center justify-center">
              <img src="/brown_patterned_tile.jpg" alt="BLOOM F" className="w-full h-full object-cover" />
              
              {/* Floating Buttons */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                <button className="bg-white/90 backdrop-blur text-on-surface px-4 py-2 rounded-full font-headline-sm text-sm font-semibold shadow-lg hover:bg-white transition flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
                  2D View
                </button>
                <button className="bg-white/90 backdrop-blur text-on-surface px-4 py-2 rounded-full font-headline-sm text-sm font-semibold shadow-lg hover:bg-white transition flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">360</span>
                  360 View
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="w-full lg:w-[45%] flex flex-col">
            {/* Title & Stock */}
            <div className="flex justify-between items-start mb-2">
              <h1 className="font-headline-xl text-3xl md:text-4xl font-bold text-on-surface">BLOOM F</h1>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              <span className="font-headline-sm text-on-surface text-[14px] font-semibold">In Stock</span>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-headline-xl font-bold text-[32px] text-primary">₹84</span>
                <span className="text-industrial-gray text-lg line-through">₹93 MRP</span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm font-bold">10% Off</span>
              </div>
              <p className="text-primary text-sm font-medium mb-3">You save ₹9/sq.ft</p>
              <div className="flex items-center gap-2 text-sm text-[#555555]">
                <span className="material-symbols-outlined text-[18px] text-primary">trending_up</span>
                <span>Trending: 124 people viewed this recently</span>
              </div>
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
                <button className="flex-1 bg-white border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-red-50 transition">
                  Add to Cart
                </button>
                <button className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-container transition">
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
                      <div className="font-medium">Ceramic</div>
                      
                      <div className="text-industrial-gray">Finish</div>
                      <div className="font-medium">Matte</div>
                      
                      <div className="text-industrial-gray">Net Quantity</div>
                      <div className="font-medium">4 Pieces/Box</div>
                      
                      <div className="text-industrial-gray">Brand</div>
                      <div className="font-medium">Oviya Ceramics</div>
                      
                      <div className="text-industrial-gray">Size</div>
                      <div className="font-medium">24x24 Inch</div>
                      
                      <div className="text-industrial-gray">Where To Use</div>
                      <div className="font-medium">Floor, Indoor</div>
                      
                      <div className="text-industrial-gray">Color</div>
                      <div className="font-medium">Brown Patterned</div>
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
                    <button className="w-full border border-primary text-primary font-bold py-2 rounded-lg hover:bg-red-50 transition">
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
