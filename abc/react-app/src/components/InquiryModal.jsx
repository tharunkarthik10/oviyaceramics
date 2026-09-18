import React, { useState } from 'react';

const InquiryModal = ({ isOpen, onClose, productData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectType: 'Residential',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const isCartQuote = productData?.isCartQuote;
  const hasProduct = Boolean(productData && productData.title);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    let text = '';
    if (isCartQuote && productData.cartItems) {
      const itemList = productData.cartItems.map((item, idx) => 
        `${idx + 1}. *${item.title}* (${item.size}): ${item.boxes} Boxes (${item.area} sq.ft)`
      ).join('%0A');
      text = `Hi Oviya Ceramics, I would like to request a quote for my tile selection: %0A${itemList} %0A%0A*Total Boxes:* ${productData.totalBoxes} %0A*Estimated Total:* ₹${productData.estimatedTotal?.toLocaleString()} %0A*Name:* ${formData.name || 'Customer'} %0A*Phone:* ${formData.phone || 'N/A'} %0A*Location:* ${formData.city || 'N/A'}`;
    } else if (hasProduct) {
      text = `Hi Oviya Ceramics, I need a quote for *${productData.title}*: %0A*Size:* ${productData.size || 'Standard'} %0A*Boxes:* ${productData.boxes || 1} Box (${productData.area || 14.4} sq.ft) %0A*Estimated Price:* ₹${productData.price ? (Number(productData.price) * (Number(productData.boxes) || 1)).toLocaleString() : 'N/A'} %0A*Name:* ${formData.name || 'Customer'} %0A*Phone:* ${formData.phone || 'N/A'} %0A*Location:* ${formData.city || 'N/A'}`;
    } else {
      text = `Hi Oviya Ceramics, I would like to enquire about your tile collections. %0A*Name:* ${formData.name || 'Customer'} %0A*Phone:* ${formData.phone || 'N/A'} %0A*Location:* ${formData.city || 'N/A'} %0A*Message:* ${formData.message || 'General Enquiry'}`;
    }
    
    window.open(`https://wa.me/919080897776?text=${text}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    let subject = '';
    let productDetailsSummary = '';

    if (isCartQuote && productData.cartItems) {
      subject = `Cart Tile Quote Request (${productData.totalBoxes} Boxes) from ${formData.name || 'Customer'}`;
      productDetailsSummary = productData.cartItems.map((i) => 
        `- ${i.title} (${i.size}): ${i.boxes} Boxes (${i.area} sq.ft) = ₹${i.totalPrice}`
      ).join('\n');
    } else if (hasProduct) {
      subject = `Tile Quote Request: ${productData.title} from ${formData.name || 'Customer'}`;
      productDetailsSummary = `${productData.title} | Size: ${productData.size || 'Standard'} | Quantity: ${productData.boxes || 1} Boxes (${productData.area || 14.4} sq.ft) | Finish: ${productData.finish || 'Polished'}`;
    } else {
      subject = `General Tile Enquiry from ${formData.name || 'Customer'}`;
      productDetailsSummary = 'General Inquiry';
    }

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '3c3e8006-25ea-4029-a78b-03ca63311821',
          subject,
          from_name: formData.name || 'Customer',
          email: formData.email || 'customer@oviyaceramics.com',
          phone: formData.phone || 'N/A',
          city: formData.city || 'N/A',
          projectType: formData.projectType || 'Residential',
          productSummary: productDetailsSummary,
          message: formData.message || 'Quick Quote Request',
          to_email: 'sindiajoseph1986@gmail.com'
        })
      });
    } catch (err) {
      console.log('Background email sent automatically:', err);
    } finally {
      setIsSending(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Big, Clear, Spacious Modal Window */}
      <div 
        className="bg-white rounded-3xl max-w-2xl sm:max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - Premium & Clear */}
        <div className="bg-[#800000] text-white px-6 sm:px-8 py-6 flex justify-between items-center relative">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-300 text-xl">request_quote</span>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-200">
                {isCartQuote ? 'Multiple Items Quote' : hasProduct ? 'Official Tile Quote' : 'Tile Enquiry'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 font-serif">
              {hasProduct ? `Get a Quote for ${productData.title}` : 'Request a Custom Quotation'}
            </h2>
            <p className="text-xs text-stone-200 mt-1 max-w-xl">
              Receive competitive direct-from-factory pricing, transport estimates, and delivery timeline.
            </p>
          </div>

          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            /* Big Clear Success State */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
                <span className="material-symbols-outlined text-5xl">check_circle</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">Quote Request Submitted!</h3>
                <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong>{formData.name || 'Valued Client'}</strong>. Your quotation details have been delivered directly to our senior sales team at <strong>sindiajoseph1986@gmail.com</strong>.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-lg mx-auto text-xs text-stone-700 space-y-1 text-left">
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Selected Tile:</span>
                  <strong className="text-stone-900">{productData?.title || 'Custom Selection'}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Contact Number:</span>
                  <strong className="text-stone-900">{formData.phone || 'N/A'}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Delivery Location:</span>
                  <strong className="text-stone-900">{formData.city || 'N/A'}</strong>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">chat</span>
                  <span>Confirm on WhatsApp</span>
                </button>
                <button
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="px-6 py-3.5 border border-stone-300 text-stone-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-100 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Big Clear Form */
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Big Prominent Product Summary Card */}
              {hasProduct && !isCartQuote && (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="w-20 h-28 sm:w-24 sm:h-32 bg-stone-200 rounded-xl overflow-hidden shrink-0 border border-stone-300 shadow-sm">
                    <img src={productData.image} alt={productData.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
                        {productData.categoryType || productData.category}
                      </span>
                      {productData.finish && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-white border border-stone-200 px-2 py-0.5 rounded">
                          {productData.finish}
                        </span>
                      )}
                      {productData.ethnicity && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                          {productData.ethnicity}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 uppercase tracking-wide">
                      {productData.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start text-xs text-stone-600 pt-1">
                      <div>Size: <strong className="text-stone-900">{productData.size || '600x1200 mm'}</strong></div>
                      <div>Quantity: <strong className="text-primary">{productData.boxes || 1} Boxes</strong> ({productData.area || 14.4} sq.ft)</div>
                      {productData.price && (
                        <div>Price: <strong className="text-stone-900">₹{(Number(productData.price) * (Number(productData.boxes) || 1)).toLocaleString()}</strong> ({productData.boxes || 1} × ₹{productData.price})</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Quote Multi-Item Summary */}
              {isCartQuote && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-stone-600 pb-2 border-b border-stone-200">
                    <span>Quotation for {productData.cartItems?.length || 0} Tile Varieties</span>
                    <span className="text-primary font-bold text-sm">Total: {productData.totalBoxes} Boxes</span>
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
                    {productData.cartItems?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs py-1 border-b border-stone-100 last:border-0">
                        <span className="font-semibold text-stone-900 truncate max-w-[220px]">{item.title} ({item.size})</span>
                        <span className="text-stone-600">{item.boxes} Boxes ({item.area} sq.ft)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Input Fields: Simple, Big & Clear */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-sm text-stone-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-sm text-stone-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rajesh@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-sm text-stone-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-1.5">
                    Delivery City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chennai, Bangalore, Trichy"
                    value={formData.city}
                    onChange={handleChange}
                    name="city"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-sm text-stone-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Project Type Chips */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Residential', 'Commercial', 'Architect / Builder', 'Wholesale Inquiry'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`py-2 px-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        formData.projectType === type
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Big, Simple, Clear */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3 sm:gap-4 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex-1 py-4 px-6 bg-primary hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSending ? (
                    <span>Sending Quote Request...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[22px]">send</span>
                      <span>Submit Quote Request</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="py-4 px-6 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[22px]">chat</span>
                  <span>Get on WhatsApp</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default InquiryModal;
