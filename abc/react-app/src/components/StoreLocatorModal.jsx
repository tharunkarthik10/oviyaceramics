import React, { useState } from 'react';

const DEALERS = [
  {
    name: "OVIYA CERAMICS HEADQUARTERS",
    city: "Dindigul",
    type: "Flagship Showroom",
    address: "Bathalagundu Road, near saravana Mill, opp. Dindigul, Pillayarnattam, Tamil Nadu 624002",
    phone: "+91 451 269 4640",
    email: "info@oviyaceramics.com"
  },
  {
    name: "JNP TILES MARKETING",
    city: "Chennai",
    type: "Authorized Dealer",
    address: "Pallavaram, Chennai, Tamil Nadu 600043",
    phone: "+91 98401 23456",
    email: "ksnkumaar@yahoo.co.in"
  },
  {
    name: "VRM TRADERS",
    city: "Chennai",
    type: "Authorized Dealer",
    address: "Perungalathur, Chennai, Tamil Nadu 631003",
    phone: "+91 94440 98765",
    email: "vrmtiles@gmail.com"
  },
  {
    name: "RAFAYA ENTERPRISES",
    city: "Chennai",
    type: "Authorized Dealer",
    address: "Chrompet, Chennai, Tamil Nadu 600044",
    phone: "+91 97910 11223",
    email: "inforafaya@gmail.com"
  },
  {
    name: "SOUTH INDIA CERAMIC HUB",
    city: "Madurai",
    type: "Authorized Dealer",
    address: "Bypass Road, Madurai, Tamil Nadu 625016",
    phone: "+91 98421 55667",
    email: "maduraitiles@oviya.com"
  }
];

const StoreLocatorModal = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedDealer, setSelectedDealer] = useState(DEALERS[0]);

  if (!isOpen) return null;

  const filteredDealers = DEALERS.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase()) ||
    d.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">location_on</span>
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold">Where to Buy — Dealer Outlets</h3>
              <p className="text-xs text-stone-400">Find nearest Oviya Ceramics authorized stores & experience centers</p>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Dealer List */}
          <div className="w-full md:w-80 bg-stone-50 border-r border-stone-200 flex flex-col overflow-hidden">
            <div className="p-3 bg-white border-b border-stone-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search city or store name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-100 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-primary"
                />
                <span className="material-symbols-outlined text-stone-400 text-base absolute left-2.5 top-2.5">search</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {filteredDealers.map((dealer, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedDealer(dealer)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border text-left ${
                    selectedDealer.name === dealer.name
                      ? 'bg-white border-primary shadow-sm ring-1 ring-primary'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-xs text-stone-900 leading-tight">{dealer.name}</h4>
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                      {dealer.city}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-2">{dealer.address}</p>
                </div>
              ))}

              {filteredDealers.length === 0 && (
                <div className="text-center py-8 text-xs text-stone-400">No stores found matching "{search}"</div>
              )}
            </div>
          </div>

          {/* Right Dealer Info & Embedded Map */}
          <div className="flex-1 bg-white p-5 flex flex-col overflow-y-auto">
            <div className="mb-4 pb-4 border-b border-stone-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {selectedDealer.type}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">{selectedDealer.name}</h3>
                <p className="text-xs text-stone-600 font-medium">{selectedDealer.address}</p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${selectedDealer.phone}`}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-stone-300"
                >
                  <span className="material-symbols-outlined text-sm text-primary">call</span>
                  Call Store
                </a>
                <a
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(selectedDealer.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-primary hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">directions</span>
                  Directions
                </a>
              </div>
            </div>

            {/* Embedded Live Google Map */}
            <div className="flex-1 min-h-[250px] rounded-xl overflow-hidden border border-stone-200 shadow-inner">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedDealer.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '250px' }}
                allowFullScreen=""
                loading="lazy"
                title={selectedDealer.name}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StoreLocatorModal;
