import React from 'react';

const PolicyModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200">
        <div className="bg-stone-900 text-white p-4 px-6 flex justify-between items-center">
          <h3 className="font-serif text-lg font-bold">{title}</h3>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-stone-700 text-sm leading-relaxed space-y-4">
          {content}
        </div>
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
