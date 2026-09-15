import React, { useState } from 'react';

const InquiryModal = ({ isOpen, onClose, productData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pincode: '',
    projectType: 'Residential',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const text = productData
      ? `Hi Oviya Ceramics, I am interested in *${productData.title}* (${productData.size || ''}). %0A*Boxes Needed:* ${productData.boxes || 1} %0A*Total Area:* ${productData.area || 14.4} sq.ft %0A*My Name:* ${formData.name || 'Customer'} %0A*Phone:* ${formData.phone || 'N/A'}`
      : `Hi Oviya Ceramics, I would like to enquire about your tile collections. %0A*My Name:* ${formData.name || 'Customer'} %0A*Phone:* ${formData.phone || 'N/A'} %0A*Message:* ${formData.message || 'General Enquiry'}`;
    
    window.open(`https://wa.me/919944686000?text=${text}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#9E7D3B] text-white p-5 flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded">Quick Quote Inquiry</span>
            <h3 className="font-serif text-xl font-bold mt-1">Get Instant Pricing</h3>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h4 className="font-bold text-2xl text-stone-900">Enquiry Received!</h4>
              <p className="text-stone-600 text-sm max-w-xs mx-auto">
                Thank you, <strong>{formData.name || 'Valued Customer'}</strong>. Our architectural tile specialist will contact you shortly with samples & pricing.
              </p>
              <div className="pt-4 flex gap-3 justify-center">
                <button
                  onClick={handleWhatsApp}
                  className="bg-[#25D366] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#1ebd59] transition-colors shadow-md"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  Chat on WhatsApp Now
                </button>
                <button
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="border border-stone-300 text-stone-700 px-4 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-stone-100"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Summary if provided */}
              {productData && (
                <div className="flex gap-4 p-3 bg-stone-50 rounded-xl border border-stone-200 items-center">
                  <img src={productData.image} alt={productData.title} className="w-14 h-14 object-cover rounded-lg shrink-0 border border-stone-200" />
                  <div className="flex-1 text-xs">
                    <h5 className="font-bold text-stone-900 text-sm">{productData.title}</h5>
                    <p className="text-stone-500">{productData.size || 'Standard Size'} • ₹{productData.price || 84}/sq.ft</p>
                    {productData.boxes && (
                      <p className="text-primary font-semibold mt-0.5">Quantity: {productData.boxes} Boxes ({productData.area || 14.4} sq.ft)</p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Pincode / Location</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 624002"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="Residential">Residential Renovation / New Build</option>
                  <option value="Commercial">Commercial / Retail Space</option>
                  <option value="Architect">Architectural Sourcing</option>
                  <option value="Dealer">Dealership Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Additional Notes</label>
                <textarea
                  name="message"
                  rows="2"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify requirements, pattern choices, or custom sizes..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-1/2 bg-primary hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-widest shadow-md transition-colors"
                >
                  Request Quote
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full sm:w-1/2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  WhatsApp Us
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
