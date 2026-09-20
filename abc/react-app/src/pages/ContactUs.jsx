import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pincode: '',
    profession: '',
    lookingFor: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const text = `Hi Oviya Ceramics, I would like to send an enquiry.%0A*Name:* ${formData.name || 'N/A'}%0A*Phone:* ${formData.phone || 'N/A'}%0A*Email:* ${formData.email || 'N/A'}%0A*Pincode:* ${formData.pincode || 'N/A'}%0A*Profession:* ${formData.profession || 'N/A'}%0A*Looking For:* ${formData.lookingFor || 'N/A'}%0A*Message:* ${formData.message || 'General Query'}`;
    window.open(`https://wa.me/919080897776?text=${text}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '3c3e8006-25ea-4029-a78b-03ca63311821',
          subject: `Contact Us Message from ${formData.name || 'Customer'}`,
          from_name: formData.name || 'Customer',
          email: formData.email || 'customer@oviyaceramics.com',
          phone: formData.phone || 'N/A',
          pincode: formData.pincode || 'N/A',
          profession: formData.profession || 'N/A',
          lookingFor: formData.lookingFor || 'N/A',
          message: formData.message || 'General Query',
          to_email: 'sindiajoseph1986@gmail.com'
        })
      });
    } catch (err) {
      console.log('Automatic email submitted:', err);
    } finally {
      setIsSending(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-[#FBFBFA] text-stone-900 font-body-md antialiased min-h-screen pt-[60px] md:pt-[88px] pb-20">
      
      {/* Header Banner (Bright & Clean) */}
      <div className="w-full bg-stone-100 border-b border-stone-200 py-8 px-4 md:px-12 text-center">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 mb-2 font-medium">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-stone-800 font-semibold">Contact Us</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-2">
            Get in Touch With Us
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Have questions about our tile collections, custom architectural orders, or dealership opportunities? We are here to help.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Corporate Office Info Card (Bright Theme) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-10 rounded-xl border border-stone-200 shadow-sm space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-[#9E7D3B]/10 text-[#9E7D3B] font-bold text-xs uppercase tracking-widest rounded mb-3">
                Headquarters
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Corporate Office
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-1 font-normal">
                Visit our executive offices or contact our regional support lines.
              </p>
            </div>

            <div className="space-y-6 pt-2 border-t border-stone-100">
              {/* Item 1: Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#9E7D3B]/10 text-[#9E7D3B] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl font-bold">location_on</span>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-1">Address</h4>
                  <p className="text-stone-800 text-sm font-semibold leading-relaxed">
                    Bathalagundu Road, near saravana Mill, opp. Dindigul, Pillayarnattam, Tamil Nadu 624002
                  </p>
                </div>
              </div>

              {/* Item 2: Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#9E7D3B]/10 text-[#9E7D3B] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl font-bold">call</span>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-1">Phone / WhatsApp</h4>
                  <p className="text-stone-800 text-sm font-semibold">+91 90808 97776</p>
                </div>
              </div>

              {/* Item 3: Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#9E7D3B]/10 text-[#9E7D3B] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl font-bold">mail</span>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-1">Email Support</h4>
                  <p className="text-stone-800 text-sm font-semibold">sindiajoseph1986@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Live Location Map */}
            <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm h-56 w-full relative">
              <div className="absolute top-3 right-3 z-10">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Oviya+Ceramics&destination_place_id=ChIJ1349WYJVBzsRptvFzzk6zdc"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-xs text-stone-800 text-xs font-bold rounded-lg shadow-md hover:bg-stone-100 hover:text-primary transition-all border border-stone-200"
                >
                  <span className="material-symbols-outlined text-sm text-primary">navigation</span>
                  <span>Navigate to Showroom</span>
                </a>
              </div>
              <iframe
                src="https://maps.google.com/maps?cid=15550149108353588134&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Oviya Ceramics Location Map"
              ></iframe>
            </div>

            {/* Quick Hours Note */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-center gap-3">
              <span className="material-symbols-outlined text-stone-400 text-lg">schedule</span>
              <span>Working Hours: Mon – Sat, 9:00 AM – 6:30 PM IST</span>
            </div>
          </div>

          {/* Right Column: Bright Contact Form Card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-xl border border-stone-200 shadow-sm w-full">
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mb-6 pb-3 border-b border-stone-100">
              Send Us a Message
            </h2>
            
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-stone-900">Enquiry Ready to Send!</h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name || 'Valued Customer'}</strong>. Please select how you want to send your message details:
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleWhatsApp}
                    className="bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3.5 px-6 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    Send via WhatsApp
                  </button>
                  <button
                    onClick={handleEmail}
                    className="bg-primary hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">mail</span>
                    Send via Email
                  </button>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-stone-500 hover:text-stone-800 text-xs font-semibold underline"
                  >
                    Edit Form Information
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* NAME & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      FULL NAME *
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:border-primary transition-colors"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:border-primary transition-colors"
                      required 
                    />
                  </div>
                </div>

                {/* MOBILE NUMBER & PINCODE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      MOBILE NUMBER *
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 90808 97776"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:border-primary transition-colors"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      PINCODE *
                    </label>
                    <input 
                      type="text" 
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 624002"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:border-primary transition-colors"
                      required 
                    />
                  </div>
                </div>

                {/* PROFESSION & LOOKING FOR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      PROFESSION
                    </label>
                    <select 
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-800 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="">Select Profession</option>
                      <option value="architect">Architect / Interior Designer</option>
                      <option value="builder">Builder / Developer</option>
                      <option value="homeowner">Home Owner</option>
                      <option value="dealer">Dealer / Distributor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      LOOKING FOR?
                    </label>
                    <select 
                      name="lookingFor"
                      value={formData.lookingFor}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-800 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      <option value="floor_tiles">Floor Tiles</option>
                      <option value="wall_tiles">Wall Tiles</option>
                      <option value="sanitaryware">Sanitaryware</option>
                      <option value="catalogue">Catalogues / Price List</option>
                    </select>
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    YOUR MESSAGE
                  </label>
                  <textarea 
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                {/* CHECKBOX */}
                <div className="flex items-center gap-2 pt-1">
                  <input 
                    type="checkbox" 
                    id="disclaimer" 
                    className="rounded border-stone-300 accent-primary focus:ring-0 cursor-pointer w-4 h-4"
                    required 
                  />
                  <label htmlFor="disclaimer" className="text-xs text-stone-600 cursor-pointer">
                    I agree to the <span className="text-primary font-semibold hover:underline">Terms & Disclaimer</span>.
                  </label>
                </div>

                {/* SUBMIT BUTTONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button 
                    type="submit" 
                    disabled={isSending}
                    className="w-full bg-primary hover:bg-red-700 disabled:bg-stone-400 text-white font-bold text-xs sm:text-sm tracking-widest py-3.5 px-6 rounded shadow-md transition-colors uppercase flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSending ? (
                      <>
                        <span className="animate-spin material-symbols-outlined text-lg">sync</span>
                        <span>Sending Email...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">send</span>
                        <span>Send Email Automatically</span>
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs sm:text-sm tracking-widest py-3.5 px-6 rounded shadow-md transition-colors uppercase flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    WhatsApp Us
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
