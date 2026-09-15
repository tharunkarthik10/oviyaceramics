import React, { useState } from 'react';

const ROOM_SCENES = [
  { id: 'living', name: 'Living Room', image: '/hero_tiles_bg_1788246751274.jpg' },
  { id: 'bathroom', name: 'Modern Bathroom', image: '/sanitaryware_1788246783314.jpg' },
  { id: 'kitchen', name: 'Luxury Kitchen', image: '/floor_wall_tiles_1788246766216.jpg' },
  { id: 'bedroom', name: 'Master Bedroom', image: '/bedroom_tiles_1788260871425.jpg' },
  { id: 'outdoor', name: 'Outdoor Patio', image: '/outdoor_tiles_1788260884772.jpg' },
];

const RoomVisualizerModal = ({ isOpen, onClose, product = null }) => {
  const [activeScene, setActiveScene] = useState(ROOM_SCENES[0]);
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'flat'

  if (!isOpen) return null;

  const tileImg = product?.image || '/sanitaryware_1788246783314.jpg';
  const tileTitle = product?.title || 'Oviya Premium Tile';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 text-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-stone-800">
        
        {/* Header */}
        <div className="p-4 px-6 bg-stone-950 border-b border-stone-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">view_in_ar</span>
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                Room Visualizer 360°
                <span className="bg-primary text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded text-white">Interactive</span>
              </h3>
              <p className="text-xs text-stone-400">Visualizing <strong>{tileTitle}</strong> in real architectural environments</p>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Main Visualizer Scene Display */}
          <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden min-h-[350px]">
            {/* Base Room Background */}
            <img 
              src={activeScene.image} 
              alt={activeScene.name} 
              className="w-full h-full object-cover opacity-80"
            />
            
            {/* Tile Surface Overlay Simulation */}
            <div 
              className={`absolute inset-0 transition-all duration-500 pointer-events-none mix-blend-overlay ${
                viewMode === '3d' ? 'opacity-70 scale-100' : 'opacity-90 scale-105'
              }`}
              style={{
                backgroundImage: `url(${tileImg})`,
                backgroundSize: '180px 180px',
                backgroundRepeat: 'repeat',
              }}
            />

            {/* Subtle Gradient Shade for Room Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

            {/* Tile Swatch Badge */}
            <div className="absolute bottom-6 left-6 bg-stone-900/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-xl">
              <img src={tileImg} alt="Tile Texture" className="w-12 h-12 rounded-lg object-cover border border-white/20" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">{tileTitle}</h5>
                <p className="text-[11px] text-amber-400 font-semibold">{product?.size || '60x120 cm'} • {product?.finish || 'Polished'}</p>
              </div>
            </div>

            {/* View Mode Switcher Overlay */}
            <div className="absolute top-6 right-6 flex bg-stone-900/80 backdrop-blur-md p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  viewMode === '3d' ? 'bg-primary text-white shadow-md' : 'text-stone-400 hover:text-white'
                }`}
              >
                3D Room Scene
              </button>
              <button 
                onClick={() => setViewMode('flat')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  viewMode === 'flat' ? 'bg-primary text-white shadow-md' : 'text-stone-400 hover:text-white'
                }`}
              >
                2D Surface Pattern
              </button>
            </div>
          </div>

          {/* Sidebar Room Selector */}
          <div className="w-full lg:w-72 bg-stone-950 p-4 border-t lg:border-t-0 lg:border-l border-stone-800 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Select Room Scene</h4>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 max-h-60 lg:max-h-none overflow-y-auto pr-1">
                {ROOM_SCENES.map(scene => (
                  <button
                    key={scene.id}
                    onClick={() => setActiveScene(scene)}
                    className={`flex items-center gap-3 p-2 rounded-xl text-left transition-all border ${
                      activeScene.id === scene.id
                        ? 'bg-primary/20 border-primary text-white shadow-sm'
                        : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-900 hover:text-white'
                    }`}
                  >
                    <img src={scene.image} alt={scene.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <span className="text-xs font-semibold">{scene.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-800 space-y-2">
              <button 
                onClick={onClose}
                className="w-full py-2.5 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-md"
              >
                Done Visualizing
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RoomVisualizerModal;
