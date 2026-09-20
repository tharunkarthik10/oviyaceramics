import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './initialProducts';
import { INITIAL_GALLERY } from './initialGallery';

const DataContext = createContext();

const INITIAL_CATALOGUES = [];

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('oviya_products_v6');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 21) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_PRODUCTS;
  });

  const [galleryItems, setGalleryItems] = useState(() => {
    const saved = localStorage.getItem('oviya_gallery_v9');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 100) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_GALLERY;
  });

  const [catalogues, setCatalogues] = useState(() => {
    const saved = localStorage.getItem('oviya_catalogues_v5');
    return saved ? JSON.parse(saved) : INITIAL_CATALOGUES;
  });

  useEffect(() => {
    localStorage.setItem('oviya_products_v6', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('oviya_gallery_v9', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('oviya_catalogues_v5', JSON.stringify(catalogues));
  }, [catalogues]);

  // Product CRUD
  const addProduct = (newProduct) => {
    const item = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price) || 0,
      oldPrice: Number(newProduct.oldPrice) || 0
    };
    setProducts(prev => [item, ...prev]);
    return item;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now()
    };
    setGalleryItems(prev => [item, ...prev]);
    return item;
  };

  const deleteGalleryItem = (id) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  // Catalogue CRUD
  const addCatalogue = (newCat) => {
    const item = {
      ...newCat,
      id: Date.now()
    };
    setCatalogues(prev => [item, ...prev]);
    return item;
  };

  const deleteCatalogue = (id) => {
    setCatalogues(prev => prev.filter(c => c.id !== id));
  };

  return (
    <DataContext.Provider value={{
      products,
      galleryItems,
      catalogues,
      addProduct,
      updateProduct,
      deleteProduct,
      addGalleryItem,
      deleteGalleryItem,
      addCatalogue,
      deleteCatalogue
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
