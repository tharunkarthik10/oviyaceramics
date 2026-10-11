import React, { createContext, useContext, useState, useEffect } from 'react';
import { useData } from './DataContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { products } = useData();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('oviya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auto-sync / heal cart items from master products whenever products are available.
  // This seamlessly migrates older localStorage items to have priceMax, latest prices, and correct ranges.
  useEffect(() => {
    if (!products || products.length === 0) return;
    setCart(prevCart => {
      let changed = false;
      const updated = prevCart.map(item => {
        const prod = products.find(p => String(p.id) === String(item.id));
        if (!prod) return item;
        const currentPrice = Number(prod.price) || item.unitPrice || 84;
        const currentPriceMax = prod.priceMax ? Number(prod.priceMax) : null;
        const currentTotal = item.boxes * currentPrice;
        const currentTotalMax = currentPriceMax ? item.boxes * currentPriceMax : null;

        if (
          item.unitPrice !== currentPrice ||
          item.priceMax !== currentPriceMax ||
          item.totalPrice !== currentTotal ||
          item.totalPriceMax !== currentTotalMax ||
          (prod.image && item.image !== prod.image) ||
          (prod.title && item.title !== prod.title)
        ) {
          changed = true;
          return {
            ...item,
            title: prod.title || item.title,
            image: prod.image || item.image,
            unitPrice: currentPrice,
            priceMax: currentPriceMax,
            totalPrice: currentTotal,
            totalPriceMax: currentTotalMax
          };
        }
        return item;
      });
      return changed ? updated : prevCart;
    });
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('oviya_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error saving cart to localStorage:', err);
    }
  }, [cart]);

  const addToCart = (product, options = {}) => {
    const size = options.size || product.size || 'Standard Size';
    const boxes = Number(options.boxes) || 1;
    const area = Number(options.area) || 14.4;
    const price = Number(options.price || product.price) || 84;
    const priceMax = options.priceMax ? Number(options.priceMax) : (product.priceMax ? Number(product.priceMax) : null);
    const itemKey = `${product.id}-${size}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const prevItem = updated[existingIndex];
        const newBoxes = prevItem.boxes + boxes;
        const newArea = Number((prevItem.area + area).toFixed(1));
        const newTotal = newBoxes * price;
        const newTotalMax = priceMax ? newBoxes * priceMax : null;

        updated[existingIndex] = {
          ...prevItem,
          boxes: newBoxes,
          area: newArea,
          priceMax,
          totalPrice: newTotal,
          totalPriceMax: newTotalMax
        };
        return updated;
      } else {
        const newItem = {
          itemKey,
          id: product.id,
          title: product.title,
          image: product.image,
          size,
          finish: product.finish || 'Polished',
          category: product.category || 'Vitrified Tiles',
          ethnicity: product.ethnicity || '',
          unitPrice: price,
          priceMax,
          boxes,
          area,
          totalPrice: boxes * price,
          totalPriceMax: priceMax ? boxes * priceMax : null
        };
        return [...prevCart, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, deltaBoxes) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.itemKey === itemKey) {
          const prod = (products || []).find(p => String(p.id) === String(item.id));
          const newBoxes = Math.max(1, item.boxes + deltaBoxes);
          const singleBoxArea = item.area / item.boxes || 14.4;
          const newArea = Number((newBoxes * singleBoxArea).toFixed(1));
          const unitPrice = item.unitPrice || (prod?.price ? Number(prod.price) : 84);
          const priceMax = item.priceMax != null ? item.priceMax : (prod?.priceMax ? Number(prod.priceMax) : null);
          const newTotal = newBoxes * unitPrice;
          const newTotalMax = priceMax ? newBoxes * priceMax : null;
          return {
            ...item,
            boxes: newBoxes,
            area: newArea,
            priceMax,
            totalPrice: newTotal,
            totalPriceMax: newTotalMax
          };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.boxes, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const cartTotalMax = cart.reduce((acc, item) => {
    const itemMax = item.totalPriceMax != null ? item.totalPriceMax : (item.priceMax ? item.boxes * item.priceMax : item.totalPrice);
    return acc + itemMax;
  }, 0);
  const hasRange = cart.some(item => {
    const itemMax = item.totalPriceMax != null ? item.totalPriceMax : (item.priceMax ? item.boxes * item.priceMax : item.totalPrice);
    return itemMax > item.totalPrice;
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartTotalMax,
        hasRange,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
