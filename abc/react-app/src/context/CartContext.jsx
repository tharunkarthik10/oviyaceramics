import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('oviya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

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
    const itemKey = `${product.id}-${size}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const prevItem = updated[existingIndex];
        const newBoxes = prevItem.boxes + boxes;
        const newArea = Number((prevItem.area + area).toFixed(1));
        const newTotal = newBoxes * price;

        updated[existingIndex] = {
          ...prevItem,
          boxes: newBoxes,
          area: newArea,
          totalPrice: newTotal
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
          boxes,
          area,
          totalPrice: boxes * price
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
          const newBoxes = Math.max(1, item.boxes + deltaBoxes);
          const singleBoxArea = item.area / item.boxes || 14.4;
          const newArea = Number((newBoxes * singleBoxArea).toFixed(1));
          const unitPrice = item.unitPrice || item.pricePerSqFt || 84;
          const newTotal = newBoxes * unitPrice;
          return {
            ...item,
            boxes: newBoxes,
            area: newArea,
            totalPrice: newTotal
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
