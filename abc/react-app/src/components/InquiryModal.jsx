import React, { useState } from 'react';

const InquiryModal = ({ isOpen, onClose, productData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    projectType: 'Residential',
    notes: ''
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
      text = `Hi Oviya Ceramics, I would like to request a quote: %0A${itemList} %0A%0A*Total Boxes:* ${productData.totalBoxes} %0A*Name:* ${formData.name || 'Customer'} %0A*Phone:* ${formData.phone || 'N/A'} %0A*Location:* ${formData.city || 'N/A'} %0A*Project:* ${formData.projectType}`;
    } else if (hasProduct) {
      text = `Hi Oviya Ceramics, I need a quick quote for *${productData.title}*: %0A*Size:* ${productData.size || 'Standard'} %0A*Quantity:* ${productData.boxes || 1} Box %0A*Name:* ${formData.name || 'Customer'} %0A*Phone:* ${formData.phone || 'N/A'} %0A*Location:* ${formData.city || 'N/A'} %0A*Project:* ${formData.projectType}`;
    } else {
      text = `Hi Oviya Ceramics, I would like to enquire about your tile collections: %0A*Name:* ${formData.name || 'Customer'} %0A*Phone:* ${formData.phone || 'N/A'} %0A*Location:* ${formData.city || 'N/A'} %0A*Project:* ${formData.projectType}`;
    }
    
    window.open(`https://wa.me/919080897776?text=${text}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    let subject = '';
    let productDetailsSummary = '';

    if (isCartQuote && productData.cartItems) {
      subject = `Tile Quote (${productData.totalBoxes} Boxes) - ${formData.name || 'Customer'}`;
      productDetailsSummary = productData.cartItems.map((i) => 
        `- ${i.title} (${i.size}): ${i.boxes} Boxes`
      ).join('\n');
    } else if (hasProduct) {
      subject = `Quote Request: ${productData.title} - ${formData.name || 'Customer'}`;
      productDetailsSummary = `${productData.title} | Size: ${productData.size || 'Standard'} | Qty: ${productData.boxes || 1} Box`;
    } else {
      subject = `General Tile Inquiry - ${formData.name || 'Customer'}`;
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
          phone: formData.phone || 'N/A',
          city: formData.city || 'N/A',
          projectType: formData.projectType || 'Residential',
          productSummary: productDetailsSummary,
          notes: formData.notes || 'None',
          to_email: 'sindiajoseph1986@gmail.com'
        })
      });
    } catch (err) {
      console.log('Quote sent:', err);
    } finally {
      setIsSending(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      {/* Clean, Compact, On-Point Modal Card */}
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - Simple & Clean */}
        <div className="px-5 sm:px-6 pt-5 pb-3.5 flex justify-between items-start border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Quick Enquiry
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight font-serif">
              {hasProduct ? 'Get Product Quote' : isCartQuote ? 'Get Cart Quotation' : 'Contact Factory'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Direct factory pricing, stock availability, and delivery timeline.
            </p>
          </div>

          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
            title="Close"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            /* Simple Success View */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">Request Received!</h3>
                <p className="text-stone-600 text-xs sm:text-sm max-w-sm mx-auto mt-1 leading-relaxed">
                  Thank you, <strong>{formData.name || 'Valued Client'}</strong>. Our team will reach out with the price breakdown shortly.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center max-w-xs mx-auto">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-[#25D366] hover:bg-[#1ebd59] text-white py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Open WhatsApp</span>
                </button>
                <button
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="py-2.5 px-4 border border-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Compact Product Pill */}
              {hasProduct && !isCartQuote && (
                <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200">
                  {productData.image && (
                    <div className="w-12 h-12 bg-stone-200 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                      <img src={productData.image} alt={productData.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {productData.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      <span>{productData.size || '600x1200 mm'}</span>
                      <span>•</span>
                      <span className="text-primary font-semibold">{productData.boxes || 1} Box ({productData.area || 14.4} sq.ft)</span>
                      {productData.finish && (
                        <>
                          <span>•</span>
                          <span>{productData.finish}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Quote Pill */}
              {isCartQuote && (
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <span className="font-semibold text-stone-800">
                    {productData.cartItems?.length || 0} Tile Varieties Selected
                  </span>
                  <span className="text-primary font-bold">
                    {productData.totalBoxes} Total Boxes
                  </span>
                </div>
              )}

              {/* Input 1: Full Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-stone-600 tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              {/* Input 2 & 3: Phone & City side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 tracking-wider mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dindigul, Chennai"
                    value={formData.city}
                    onChange={handleChange}
                    name="city"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Quick Project Type Segment */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-stone-600 tracking-wider mb-1.5">
                  Requirement Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Residential', 'Commercial', 'Wholesale'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border text-center ${
                        formData.projectType === type
                          ? 'bg-primary text-white border-primary shadow-2xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Focused & Crisp */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex-1 py-3 px-4 bg-primary hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  {isSending ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">send</span>
                      <span>Request Quote</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  title="Direct WhatsApp Quote"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span className="hidden sm:inline">WhatsApp</span>
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
