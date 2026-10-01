import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import CategoryBar from '../components/CategoryBar';
import SEO from '../components/SEO';

const ProductDetails = ({ onOpenInquiry }) => {
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

  const activeCategory = product.category || 'All Tiles';
  const [activeTab, setActiveTab] = useState('details');

  // Multi-image gallery handling
  const allImages = (product.images && product.images.length > 0)
    ? product.images
    : (product.image ? [product.image] : ['/tiles/tile_1.jpg']);
  const [activeImage, setActiveImage] = useState(allImages[0]);
  const [imageFitMode, setImageFitMode] = useState('contain'); // 'contain' for whole slab fidelity, 'cover' for close-up fill
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  useEffect(() => {
    const imgs = (product.images && product.images.length > 0)
      ? product.images
      : (product.image ? [product.image] : ['/tiles/tile_1.jpg']);
    setActiveImage(imgs[0]);
  }, [id, product.image, product.images]);

  // Handle ESC key for HD Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  // Handle multiple sizes if separated by commas or slashes
  const availableSizes = (product.size || '').split(/[,/]/).map(s => s.trim()).filter(Boolean);
  const [selectedSize, setSelectedSize] = useState(() => availableSizes[0] || product.size || '600x1200 mm');

  useEffect(() => {
    if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0]);
    }
  }, [id, product.size, availableSizes, selectedSize]);

  // Dynamic Tile Coverage Calculation based on dimensions and pieces per box
  const getTileCoverage = (sizeStr, netQuantityStr) => {
    const isCm = /cm/i.test(sizeStr);
    const match = (sizeStr || '').match(/(\d+(?:\.\d+)?)\s*[xX*×]\s*(\d+(?:\.\d+)?)/);
    let lengthMm = 600, widthMm = 1200;
    if (match) {
      let d1 = parseFloat(match[1]);
      let d2 = parseFloat(match[2]);
      if (isCm) {
        d1 *= 10;
        d2 *= 10;
      } else {
        if (d1 < 100) d1 *= 10;
        if (d2 < 100) d2 *= 10;
      }
      lengthMm = d1;
      widthMm = d2;
    }

    let pieces = 0;
    const qMatch = (netQuantityStr || '').match(/(\d+)\s*(?:Pieces|Pcs|Tiles)/i);
    if (qMatch) {
      pieces = parseInt(qMatch[1], 10);
    }

    const maxDim = Math.max(lengthMm, widthMm);
    const minDim = Math.min(lengthMm, widthMm);

    if (!pieces) {
      if (maxDim >= 2400) pieces = 1;
      else if (maxDim >= 1200 && minDim >= 600) pieces = 2;
      else if (maxDim === 800 && minDim === 800) pieces = 3;
      else if (maxDim === 600 && minDim === 600) pieces = 4;
      else if (maxDim === 450 && minDim === 300) pieces = 6;
      else if (maxDim === 600 && minDim === 300) pieces = 6;
      else if (maxDim === 400 && minDim === 400) pieces = 5;
      else if (maxDim === 300 && minDim === 300) pieces = 9;
      else if (maxDim === 300 && minDim === 200) pieces = 15;
      else pieces = 4;
    }

    const areaSqMPerTile = (lengthMm / 1000) * (widthMm / 1000);
    const areaSqFtPerTile = areaSqMPerTile * 10.7639104;
    const sqFtPerBox = Number((areaSqFtPerTile * pieces).toFixed(2));
    return { lengthMm, widthMm, pieces, sqFtPerBox };
  };

  const coverage = getTileCoverage(selectedSize, product.netQuantity);
  const sqFtPerBox = coverage.sqFtPerBox || 14.4;
  const piecesPerBox = coverage.pieces || 2;

  // Calculator Mode: 'area' (direct sqft) or 'room' (Length x Width)
  const [calcMode, setCalcMode] = useState('area');
  const [areaInput, setAreaInput] = useState('');
  const [roomLength, setRoomLength] = useState('10');
  const [roomWidth, setRoomWidth] = useState('12');
  const [includeWastage, setIncludeWastage] = useState(true);
  const [boxes, setBoxes] = useState(1);
  const [boxesInput, setBoxesInput] = useState('1');

  // Dynamically driven by product.price
  const productPrice = Number(product.price) || 68;

  // Calculate required boxes from user area / room inputs WITHOUT overwriting areaInput
  useEffect(() => {
    let baseArea = 0;
    if (calcMode === 'area') {
      baseArea = parseFloat(areaInput) || 0;
    } else {
      const l = parseFloat(roomLength) || 0;
      const w = parseFloat(roomWidth) || 0;
      baseArea = l * w;
    }

    if (baseArea > 0) {
      const effectiveArea = includeWastage ? baseArea * 1.10 : baseArea;
      const neededBoxes = Math.max(1, Math.ceil(effectiveArea / sqFtPerBox));
      setBoxes(neededBoxes);
      setBoxesInput(String(neededBoxes));
    }
  }, [selectedSize, calcMode, areaInput, roomLength, roomWidth, includeWastage, sqFtPerBox]);

  // Handle user typing directly in Area input
  const handleAreaInputChange = (e) => {
    const val = e.target.value;
    setAreaInput(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      const effective = includeWastage ? parsed * 1.10 : parsed;
      const calculatedBoxes = Math.max(1, Math.ceil(effective / sqFtPerBox));
      setBoxes(calculatedBoxes);
      setBoxesInput(String(calculatedBoxes));
    } else if (val === '') {
      // If user clears area input, keep 1 box default without forcing text into input
      setBoxes(1);
      setBoxesInput('1');
    }
  };

  // Handle user typing directly in Boxes input
  const handleBoxInputChange = (e) => {
    const val = e.target.value;
    setBoxesInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setBoxes(parsed);
    }
  };

  // Handle stepper button clicks on Boxes (+ / -)
  const handleBoxStep = (delta) => {
    const newBoxes = Math.max(1, boxes + delta);
    setBoxes(newBoxes);
    setBoxesInput(String(newBoxes));
  };

  // Pricing: Fully dynamic depending on product.price
  const totalCost = boxes * productPrice;
  const coveredAreaSqFt = Number((boxes * sqFtPerBox).toFixed(1));

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      boxes,
      area: coveredAreaSqFt,
      price: productPrice
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
        area: coveredAreaSqFt,
        price: productPrice
      });
    }
  };


  // Dynamic similar products from context
  const similarProducts = products.filter(p => String(p.id) !== String(product.id)).slice(0, 4);

  const canonicalUrl = `https://oviyaceramics.in/product/${product.id}`;
  const fullImageUrl = (product.image || '').startsWith('http') 
    ? product.image 
    : `https://oviyaceramics.in${(product.image || '').startsWith('/') ? '' : '/'}${product.image || 'tiles/tile_1.jpg'}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        "name": product.title,
        "description": product.description || `${product.title} - ${product.category} in ${product.size} with ${product.finish} finish.`,
        "image": [fullImageUrl],
        "sku": `OVIYA-${product.id}`,
        "mpn": `OVIYA-${product.id}`,
        "brand": {
          "@type": "Brand",
          "name": product.brand || "Oviya Ceramics"
        },
        "category": product.category,
        "material": product.material || "Ceramic / Vitrified",
        "offers": {
          "@type": "Offer",
          "price": productPrice || 80,
          "priceCurrency": "INR",
          "availability": product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "url": canonicalUrl,
          "itemCondition": "https://schema.org/NewCondition",
          "priceValidUntil": "2027-12-31",
          "seller": {
            "@type": "Organization",
            "name": "Oviya Ceramics"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "32"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://oviyaceramics.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products",
            "item": "https://oviyaceramics.in/products"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.category || "Tiles",
            "item": `https://oviyaceramics.in/products?category=${encodeURIComponent(product.category || 'All Tiles')}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": product.title,
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-[72px] md:pt-[88px] pb-32 min-h-screen">
      <SEO 
        title={`${product.title} (${product.size}) | Oviya Ceramics`}
        description={product.description || `${product.title} - ${product.category} available in ${product.size} with ${product.finish} finish. Manufactured & supplied by Oviya Ceramics Dindigul.`}
        keywords={`${product.title}, ${product.category}, ${product.size}, ${product.finish} tile, ${product.material}, buy tiles Dindigul, Oviya Ceramics`}
        canonical={canonicalUrl}
        image={fullImageUrl}
        type="product"
        schema={productSchema}
      />
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
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 mb-20 lg:items-start">
          
          {/* Left Column - Media (Sticky on Desktop) */}
          <div className="w-full lg:w-[48%] xl:w-[50%] lg:sticky lg:top-[90px] lg:self-start flex flex-col-reverse sm:flex-row gap-4 h-auto lg:min-h-[480px] lg:h-[540px]">
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="w-full sm:w-16 md:w-20 shrink-0 flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto hide-scrollbar max-h-[540px] pb-2 sm:pb-0">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 sm:w-full sm:aspect-square rounded-lg overflow-hidden cursor-pointer transition-all border-2 shrink-0 bg-stone-50 ${
                      activeImage === img ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.title} - photo ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Main Image Container */}
            <div 
              className="flex-1 min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] bg-gradient-to-b from-stone-50 via-white to-stone-100/70 rounded-2xl relative overflow-hidden flex items-center justify-center border border-stone-200 group cursor-zoom-in shadow-xs hover:shadow-md transition-all select-none p-3 sm:p-5"
              onClick={() => { setZoomScale(1); setIsLightboxOpen(true); }}
              title="Click to inspect texture in High-Definition (HD Zoom)"
            >
              <img 
                src={activeImage} 
                alt={product.title} 
                className={`transition-all duration-300 ${
                  imageFitMode === 'contain' 
                    ? 'max-h-full max-w-full object-contain drop-shadow-md rounded-lg group-hover:scale-[1.02]' 
                    : 'w-full h-full object-cover rounded-xl group-hover:scale-105'
                }`}
                style={{ 
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />

              {/* Floating Top-Right Controls */}
              <div 
                className="absolute top-3 right-3 flex items-center gap-1.5 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Toggle Fit / Fill */}
                <button
                  type="button"
                  onClick={() => setImageFitMode(m => m === 'contain' ? 'cover' : 'contain')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/95 hover:bg-white text-stone-700 shadow-sm border border-stone-200/90 backdrop-blur-xs flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
                  title={imageFitMode === 'contain' ? "Currently showing Full Slab without cropping. Click for Close-Up Fill." : "Currently showing Close-Up Fill. Click for Full Slab."}
                >
                  <span className="material-symbols-outlined text-sm">
                    {imageFitMode === 'contain' ? 'crop_free' : 'fit_screen'}
                  </span>
                  <span className="hidden sm:inline">{imageFitMode === 'contain' ? 'Full Tile' : 'Close-Up'}</span>
                </button>

                {/* HD Zoom Button */}
                <button
                  type="button"
                  onClick={() => { setZoomScale(1); setIsLightboxOpen(true); }}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#800000] hover:bg-[#600000] text-white shadow-sm flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
                  title="Open High-Definition Zoom Inspector"
                >
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                  <span className="hidden sm:inline">HD Zoom</span>
                </button>
              </div>

              {/* Bottom Hint on Hover */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                <span className="material-symbols-outlined text-xs">search</span>
                Click to inspect texture in HD
              </div>
            </div>
          </div>

          {/* Right Column - Information (Independently Scrollable on Desktop) */}
          <div className="w-full lg:w-[52%] xl:w-[50%] flex flex-col lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-3.5 custom-scrollbar">
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

            {/* Calculator Card - Standard Area Calculator Layout for All Products */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 mb-8 shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#800000] text-xl font-bold">
                    calculate
                  </span>
                  <h3 className="font-headline-sm font-bold text-base sm:text-lg text-on-surface">
                    Area Calculator
                  </h3>
                </div>
                <span className="text-[11px] sm:text-xs text-stone-600 bg-white px-2.5 py-1 rounded-md border border-stone-200 font-semibold shadow-xs">
                  1 Box ≈ <strong className="text-[#800000]">{sqFtPerBox} sq.ft</strong> ({piecesPerBox} {piecesPerBox === 1 ? 'tile' : 'tiles'})
                </span>
              </div>

              {/* Mode Selector */}
              <div className="flex bg-stone-200/70 p-1 rounded-lg mb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCalcMode('area')}
                  className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                    calcMode === 'area'
                      ? 'bg-white text-[#800000] shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Total Area (sq.ft)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode('room')}
                  className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                    calcMode === 'room'
                      ? 'bg-white text-[#800000] shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Room Dimensions (L × W)
                </button>
              </div>

              {/* Inputs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                {calcMode === 'area' ? (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Total Area (sq.ft)
                    </label>
                    <div className="flex rounded-lg border border-stone-300 bg-white overflow-hidden shadow-xs focus-within:border-[#800000] focus-within:ring-1 focus-within:ring-[#800000] h-[38px]">
                      <input 
                        type="number" 
                        min="0.1"
                        step="any"
                        value={areaInput}
                        onChange={handleAreaInputChange}
                        placeholder="Enter sq.ft (e.g. 120)"
                        className="flex-1 px-3 py-2 text-sm focus:outline-none bg-transparent font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="inline-flex items-center px-3 bg-stone-100 text-xs text-stone-500 font-semibold border-l border-stone-200 select-none">
                        sq.ft
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Room Dimensions (feet)
                    </label>
                    <div className="flex items-center gap-2 h-[38px]">
                      <div className="flex rounded-lg border border-stone-300 bg-white overflow-hidden shadow-xs flex-1 h-full focus-within:border-[#800000]">
                        <input 
                          type="number" 
                          min="1"
                          step="any"
                          value={roomLength}
                          onChange={(e) => setRoomLength(e.target.value)}
                          placeholder="Length"
                          className="flex-1 px-2.5 py-2 text-sm focus:outline-none bg-transparent text-center font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="inline-flex items-center px-2 bg-stone-100 text-[10px] text-stone-400 font-bold border-l border-stone-200 select-none">ft</span>
                      </div>
                      <span className="text-stone-400 font-bold">×</span>
                      <div className="flex rounded-lg border border-stone-300 bg-white overflow-hidden shadow-xs flex-1 h-full focus-within:border-[#800000]">
                        <input 
                          type="number" 
                          min="1"
                          step="any"
                          value={roomWidth}
                          onChange={(e) => setRoomWidth(e.target.value)}
                          placeholder="Width"
                          className="flex-1 px-2.5 py-2 text-sm focus:outline-none bg-transparent text-center font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="inline-flex items-center px-2 bg-stone-100 text-[10px] text-stone-400 font-bold border-l border-stone-200 select-none">ft</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 flex justify-between">
                    <span>Boxes</span>
                    <span className="text-[11px] text-stone-500 font-normal">({piecesPerBox * boxes} tiles)</span>
                  </label>
                  <div className="flex items-center border border-stone-300 rounded-lg h-[38px] bg-white overflow-hidden shadow-xs focus-within:border-[#800000] focus-within:ring-1 focus-within:ring-[#800000]">
                    <button 
                      type="button"
                      onClick={() => handleBoxStep(-1)} 
                      className="w-10 h-full flex items-center justify-center text-lg text-stone-600 hover:text-[#800000] hover:bg-stone-50 active:bg-stone-100 font-bold cursor-pointer transition-colors"
                      title="Decrease 1 box"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={boxesInput}
                      onChange={handleBoxInputChange}
                      className="flex-1 text-center text-sm font-bold border-x border-stone-200 h-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button 
                      type="button"
                      onClick={() => handleBoxStep(1)} 
                      className="w-10 h-full flex items-center justify-center text-lg text-stone-600 hover:text-[#800000] hover:bg-stone-50 active:bg-stone-100 font-bold cursor-pointer transition-colors"
                      title="Increase 1 box"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Wastage Checkbox */}
              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer mb-4 select-none group">
                <input 
                  type="checkbox"
                  checked={includeWastage}
                  onChange={(e) => setIncludeWastage(e.target.checked)}
                  className="accent-[#800000] w-4 h-4 rounded cursor-pointer"
                />
                <span className="group-hover:text-stone-900">
                  Add <strong>10% margin</strong> for cutting & corners <span className="text-emerald-700 font-semibold">(Recommended)</span>
                </span>
              </label>

              {/* Dynamic Cost & Calculation Breakdown */}
              <div className="bg-white border border-stone-200 rounded-xl p-3.5 mb-5 space-y-2 text-xs shadow-xs">
                <div className="flex justify-between items-center text-stone-600">
                  <span>Price per Box:</span>
                  <span className="font-semibold text-stone-900">
                    ₹{productPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center text-stone-600">
                  <span>Total Area Covered:</span>
                  <span className="font-semibold text-stone-900">
                    {coveredAreaSqFt} sq.ft <span className="text-stone-400 font-normal">({boxes} {boxes === 1 ? 'box' : 'boxes'} × {sqFtPerBox} sq.ft)</span>
                  </span>
                </div>
                
                <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                      Estimated Tile Cost:
                    </span>
                    <p className="text-[10px] text-stone-500">
                      {boxes} {boxes === 1 ? 'Box' : 'Boxes'} × ₹{productPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-2xl text-[#800000] font-serif">
                      ₹{totalCost.toLocaleString()}
                    </span>
                    <p className="text-[10px] text-stone-400">Excluding transport & tax</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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

              <a 
                href={`https://wa.me/919080897776?text=Hi%20Oviya%20Ceramics,%20I'm%20interested%20in%20${encodeURIComponent(product.title)}%20(Size:%20${encodeURIComponent(selectedSize || product.size || '')},%20${boxes}%20boxes,%20${coveredAreaSqFt}%20sq.ft).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition uppercase text-xs tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Direct WhatsApp (+91 90808 97776)</span>
              </a>
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
                      onClick={handleGetQuote}
                      className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-red-700 transition uppercase text-xs tracking-wider cursor-pointer"
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
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
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

      {/* Full-Screen HD Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col select-none animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header Bar */}
          <div 
            className="flex items-center justify-between px-4 sm:px-6 py-3 bg-stone-900/90 border-b border-stone-800 text-white z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 truncate mr-4">
              <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider truncate text-stone-100">{product.title}</h3>
              <span className="text-stone-400 text-xs hidden sm:inline">| {selectedSize}</span>
              <span className="bg-[#800000]/60 text-red-200 text-[10px] font-semibold uppercase px-2 py-0.5 rounded border border-red-500/40">
                HD Clarity Inspector
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center bg-stone-800/90 rounded-lg p-0.5 border border-stone-700">
                <button
                  type="button"
                  onClick={() => setZoomScale(s => Math.max(0.75, +(s - 0.25).toFixed(2)))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-stone-700 rounded text-stone-200 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="text-xs font-mono font-medium px-2 min-w-[50px] text-center text-stone-300">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale(s => Math.min(3, +(s + 0.25).toFixed(2)))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-stone-700 rounded text-stone-200 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  className="px-2.5 py-1 text-[11px] hover:bg-stone-700 rounded text-stone-300 transition-colors ml-1 font-medium cursor-pointer"
                  title="Reset Zoom to 100%"
                >
                  Reset
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-[#800000] text-stone-300 hover:text-white flex items-center justify-center transition-colors ml-2 cursor-pointer"
                title="Close (Esc)"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* Lightbox Canvas Area */}
          <div 
            className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 cursor-zoom-in"
            onClick={() => setZoomScale(s => s >= 2.5 ? 1 : +(s + 0.5).toFixed(2))}
          >
            <div 
              className="transition-transform duration-200 ease-out max-w-full max-h-full flex items-center justify-center"
              style={{ transform: `scale(${zoomScale})` }}
            >
              <img 
                src={activeImage} 
                alt={product.title} 
                className="max-h-[80vh] max-w-[85vw] object-contain rounded-lg shadow-2xl drop-shadow-2xl"
                style={{ 
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              />
            </div>
          </div>

          {/* Lightbox Footer Note */}
          <div className="py-2.5 px-4 text-center text-stone-400 text-xs bg-stone-900/80 border-t border-stone-800/80 pointer-events-none shrink-0 flex items-center justify-center gap-3">
            <span>🔍 Click image or use controls to zoom</span>
            <span>•</span>
            <span>Scroll to inspect stone veins and finish</span>
            <span>•</span>
            <span>Press <kbd className="bg-stone-800 px-1.5 py-0.5 rounded text-[10px] text-stone-300 border border-stone-700">ESC</kbd> to exit</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
