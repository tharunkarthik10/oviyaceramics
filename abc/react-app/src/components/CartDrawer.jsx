import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ onOpenInquiry }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, closeCart, cartCount, cartTotal } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutQuote = () => {
    closeCart();
    if (onOpenInquiry) {
      onOpenInquiry({
        isCartQuote: true,
        cartItems: cart,
        totalBoxes: cartCount,
        estimatedTotal: cartTotal,
        title: cart.length === 1 ? cart[0].title : `Order of ${cart.length} Tile Varieties (${cartCount} Boxes)`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">shopping_cart</span>
            <div>
              <h3 className="font-bold text-base text-stone-900 uppercase tracking-wide">
                Your Selection
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {cart.length} {cart.length === 1 ? 'Variety' : 'Varieties'} • {cartCount} {cartCount === 1 ? 'Box' : 'Boxes'}
              </p>
            </div>
          </div>
          <button 
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                <span className="material-symbols-outlined text-3xl">remove_shopping_cart</span>
              </div>
              <h4 className="font-bold text-lg text-stone-900">Your Cart is Empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our luxury vitrified slabs and ceramic collections to request quotes.
              </p>
              <button
                onClick={closeCart}
                className="inline-block px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-red-700 transition"
              >
                Browse Tiles
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.itemKey} 
                className="flex gap-3.5 p-3.5 bg-stone-50 border border-stone-200 rounded-xl relative group hover:border-stone-300 transition"
              >
                {/* Tile Preview */}
                <div className="w-18 h-24 bg-stone-200 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start pr-6">
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm uppercase truncate" title={item.title}>
                        {item.title}
                      </h4>
                    </div>
                    
                    <p className="text-[11px] text-stone-500 font-medium truncate mt-0.5">
                      Size: <strong className="text-stone-700">{item.size}</strong>
                    </p>
                    {item.finish && (
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded mt-1">
                        {item.finish}
                      </span>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white h-7">
                      <button 
                        onClick={() => updateQuantity(item.itemKey, -1)}
                        className="px-2 text-stone-600 hover:text-primary font-bold text-sm h-full flex items-center"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800 border-x border-stone-200 h-full flex items-center">
                        {item.boxes} {item.boxes === 1 ? 'Box' : 'Boxes'}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.itemKey, 1)}
                        className="px-2 text-stone-600 hover:text-primary font-bold text-sm h-full flex items-center"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-xs sm:text-sm text-stone-900">
                        ₹{item.totalPrice.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        ({item.area} sq.ft)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.itemKey)}
                  className="absolute top-2.5 right-2.5 text-stone-400 hover:text-red-600 p-1 transition-colors"
                  title="Remove item"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase font-bold text-stone-600 tracking-wider">Estimated Subtotal</span>
              <div className="text-right">
                <span className="text-xl font-bold text-stone-900 font-serif">₹{cartTotal.toLocaleString()}</span>
                <p className="text-[10px] text-stone-400">Taxes & transport confirmed in final quote</p>
              </div>
            </div>

            <button
              onClick={handleCheckoutQuote}
              className="w-full py-3.5 px-4 bg-primary hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">request_quote</span>
              <span>Get a Quote for All Items ({cartCount} Boxes)</span>
            </button>

            <div className="flex justify-between items-center text-xs">
              <button 
                onClick={clearCart}
                className="text-stone-400 hover:text-red-600 underline text-[11px]"
              >
                Clear Cart
              </button>
              <button 
                onClick={closeCart}
                className="text-primary hover:underline font-bold text-[11px]"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
