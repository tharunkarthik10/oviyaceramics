import React from 'react';

const Component = () => {
  return (
    <div className="w-full bg-[#111] text-[#333] font-sans antialiased min-h-screen pt-[96px]">
      {/* Background Section with overlay */}
      <div 
        className="relative w-full min-h-[calc(100vh-96px)] bg-cover bg-center flex items-center py-12 md:py-20 px-4 md:px-12 lg:px-20"
        style={{ backgroundImage: `url('/contact_bg_tiles.jpg')` }}
      >
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/45 z-0" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Office Info */}
          <div className="lg:col-span-6 text-white space-y-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
                Have Questions? We're Here to Help!
              </h1>
              <p className="text-gray-200 text-sm md:text-base font-light">
                If you can't find what we are looking for, feel free to get in touch.
              </p>
            </div>

            <div className="pt-4">
              <h2 className="font-bold text-white tracking-widest text-sm uppercase mb-8 border-b border-white/20 pb-2 inline-block">
                CORPORATE OFFICE
              </h2>

              <div className="space-y-6 text-sm md:text-base font-light">
                {/* Item 1: Address */}
                <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[#B38528] text-lg">location_on</span>
                  </div>
                  <span className="pt-2 leading-relaxed text-gray-100">
                    123 Industrial Estate, Phase II, Madurai Road, Dindigul - 624002, Tamil Nadu, India
                  </span>
                </div>

                {/* Item 2: Phone */}
                <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[#B38528] text-lg">call</span>
                  </div>
                  <span className="text-gray-100">+91-451-2694 6409</span>
                </div>

                {/* Item 3: Toll Free */}
                <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[#B38528] text-lg">support_agent</span>
                  </div>
                  <span className="text-gray-100">Toll Free Number : 1800 309 309</span>
                </div>

                {/* Item 4: Email */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[#B38528] text-lg">mail</span>
                  </div>
                  <span className="text-gray-100">info@oviyaceramics.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: White Contact Form Card */}
          <div className="lg:col-span-6 bg-white p-8 md:p-12 shadow-2xl rounded-sm w-full max-w-xl mx-auto lg:ml-auto">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              
              {/* NAME */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  NAME
                </label>
                <input 
                  type="text" 
                  className="w-full border-b border-gray-400 py-1.5 focus:border-[#13548A] outline-none text-sm text-gray-800 transition-colors bg-transparent"
                  required 
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  EMAIL
                </label>
                <input 
                  type="email" 
                  className="w-full border-b border-gray-400 py-1.5 focus:border-[#13548A] outline-none text-sm text-gray-800 transition-colors bg-transparent"
                  required 
                />
              </div>

              {/* MOBILE NUMBER & PINCODE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    MOBILE NUMBER
                  </label>
                  <input 
                    type="tel" 
                    className="w-full border-b border-gray-400 py-1.5 focus:border-[#13548A] outline-none text-sm text-gray-800 transition-colors bg-transparent"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    PINCODE
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-b border-gray-400 py-1.5 focus:border-[#13548A] outline-none text-sm text-gray-800 transition-colors bg-transparent"
                    required 
                  />
                </div>
              </div>

              {/* PROFESSION & LOOKING FOR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    PLEASE SELECT PROFESSION
                  </label>
                  <select className="w-full border-b border-gray-400 py-1.5 focus:border-[#13548A] outline-none text-sm text-gray-600 transition-colors bg-transparent cursor-pointer appearance-none pr-4">
                    <option value="">Select Option</option>
                    <option value="architect">Architect / Interior Designer</option>
                    <option value="builder">Builder / Developer</option>
                    <option value="homeowner">Home Owner</option>
                    <option value="dealer">Dealer / Distributor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    LOOKING FOR ?
                  </label>
                  <select className="w-full border-b border-gray-400 py-1.5 focus:border-[#13548A] outline-none text-sm text-gray-600 transition-colors bg-transparent cursor-pointer appearance-none pr-4">
                    <option value="">Select Option</option>
                    <option value="floor_tiles">Floor Tiles</option>
                    <option value="wall_tiles">Wall Tiles</option>
                    <option value="sanitaryware">Sanitaryware</option>
                    <option value="catalogue">Catalogues / Price List</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  MESSAGE
                </label>
                <textarea 
                  rows="2"
                  className="w-full border-b border-gray-400 py-1.5 focus:border-[#13548A] outline-none text-sm text-gray-800 transition-colors bg-transparent resize-none"
                />
              </div>

              {/* CHECKBOX */}
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="disclaimer" 
                  className="rounded border-gray-400 text-[#13548A] focus:ring-0 cursor-pointer"
                  required 
                />
                <label htmlFor="disclaimer" className="text-xs text-gray-600 cursor-pointer">
                  I agree to the <span className="text-[#C59B27] font-semibold hover:underline">Disclaimer</span>.
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-[#13548A] hover:bg-[#0E3D66] text-white font-bold text-sm tracking-wider py-3.5 transition-colors uppercase shadow-sm"
                >
                  SEND OTP
                </button>
              </div>

              {/* FOOTER NOTE */}
              <div className="flex items-start gap-2 pt-2 text-gray-500 text-[11px] leading-tight">
                <span className="material-symbols-outlined text-sm shrink-0 text-gray-400">info</span>
                <span>
                  All the fields are required. By sending the form you agree to the <a href="#" className="underline hover:text-gray-700">Terms & Conditions</a> and <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>.
                </span>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Component;
