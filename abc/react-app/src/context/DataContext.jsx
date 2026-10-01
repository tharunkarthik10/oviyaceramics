import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './initialProducts';
import { INITIAL_GALLERY } from './initialGallery';

const DataContext = createContext();

const INITIAL_CATALOGUES = [];

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('oviya_products_v7');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 38) {
          return parsed;
        }
      } catch (e) {}
    }
    // Check previous v6 for custom user-created products
    const oldSaved = localStorage.getItem('oviya_products_v6');
    if (oldSaved) {
      try {
        const oldParsed = JSON.parse(oldSaved);
        if (Array.isArray(oldParsed)) {
          const customAdded = oldParsed.filter(p => p.id > 1000);
          if (customAdded.length > 0) {
            return [...INITIAL_PRODUCTS, ...customAdded];
          }
        }
      } catch (e) {}
    }
    return INITIAL_PRODUCTS;
  });

  const [galleryItems, setGalleryItems] = useState(() => {
    const saved = localStorage.getItem('oviya_gallery_v10');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 128) {
          return parsed;
        }
      } catch (e) {}
    }
    const oldSaved = localStorage.getItem('oviya_gallery_v9');
    if (oldSaved) {
      try {
        const oldParsed = JSON.parse(oldSaved);
        if (Array.isArray(oldParsed)) {
          const customAdded = oldParsed.filter(g => g.id > 1000);
          if (customAdded.length > 0) {
            return [...INITIAL_GALLERY, ...customAdded];
          }
        }
      } catch (e) {}
    }
    return INITIAL_GALLERY;
  });

  const [catalogues, setCatalogues] = useState(() => {
    try {
      const saved = localStorage.getItem('oviya_catalogues_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Strip any blob: URLs that are no longer valid after a page reload
          return parsed.map(c => ({
            ...c,
            pdfUrl: (c.pdfUrl && c.pdfUrl.startsWith('blob:')) ? '' : (c.pdfUrl || ''),
            image: (c.image && c.image.startsWith('blob:')) ? '/clean_catalog_cover.jpg' : (c.image || '/clean_catalog_cover.jpg')
          }));
        }
      }
    } catch (e) {
      console.warn('Could not restore catalogues from localStorage, resetting:', e);
      try { localStorage.removeItem('oviya_catalogues_v5'); } catch (_) {}
    }
    return INITIAL_CATALOGUES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('oviya_products_v7', JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('oviya_gallery_v10', JSON.stringify(galleryItems));
    } catch (e) {
      console.warn('Could not save gallery to localStorage:', e);
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      // Strip blob: URLs (session-only) and massive base64 PDFs before persisting
      const safeCatalogues = catalogues.map(c => {
        const safePdfUrl = (c.pdfUrl && (c.pdfUrl.startsWith('data:') || c.pdfUrl.startsWith('blob:'))) ? '' : (c.pdfUrl || '');
        const safeImage = (c.image && c.image.startsWith('blob:')) ? '/clean_catalog_cover.jpg' : (c.image || '/clean_catalog_cover.jpg');
        return { ...c, pdfUrl: safePdfUrl, image: safeImage };
      });
      localStorage.setItem('oviya_catalogues_v5', JSON.stringify(safeCatalogues));
    } catch (e) {
      console.warn('Could not save catalogues to localStorage:', e);
    }
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
