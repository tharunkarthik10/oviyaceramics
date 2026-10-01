import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_PRODUCTS } from './initialProducts';
import { INITIAL_GALLERY } from './initialGallery';

const DataContext = createContext();

const INITIAL_CATALOGUES = [];

/**
 * DataContext uses the Cloudflare R2 JSON API (/api/data) as the shared database.
 * All devices (mobile, laptop, etc.) read from and write to the same R2-backed JSON files.
 * Falls back to INITIAL_PRODUCTS / INITIAL_GALLERY if the API is unreachable.
 */

// ─── API Helpers ───────────────────────────────────────────────────────────────

const apiGet = async (type) => {
  const res = await fetch(`/api/data?type=${type}`);
  if (!res.ok) throw new Error(`Failed to GET ${type}: ${res.status}`);
  return res.json();
};

const apiPost = async (type, action, payload) => {
  const res = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, action, payload })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `POST /api/data failed: ${res.status}`);
  }
  return res.json();
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Bootstrap: load from Cloudflare R2 JSON, seed if empty ─────────────────
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        // Load all three collections in parallel
        const [prodRes, galRes, catRes] = await Promise.allSettled([
          apiGet('products'),
          apiGet('gallery'),
          apiGet('catalogues')
        ]);

        if (cancelled) return;

        // ── Products ──────────────────────────────────────────────────────────
        if (prodRes.status === 'fulfilled') {
          const { exists, items } = prodRes.value;
          if (!exists || items.length === 0) {
            // First ever visit — seed all initial products
            console.log('[DataContext] Seeding products into R2...');
            await apiPost('products', 'seed', INITIAL_PRODUCTS).catch(console.warn);
            if (!cancelled) setProducts(INITIAL_PRODUCTS);
          } else {
            if (!cancelled) setProducts(items);
          }
        } else {
          console.warn('[DataContext] Products API unavailable, using built-in data:', prodRes.reason);
          if (!cancelled) setProducts(INITIAL_PRODUCTS);
        }

        // ── Gallery ───────────────────────────────────────────────────────────
        if (galRes.status === 'fulfilled') {
          const { exists, items } = galRes.value;
          if (!exists || items.length === 0) {
            console.log('[DataContext] Seeding gallery into R2...');
            await apiPost('gallery', 'seed', INITIAL_GALLERY).catch(console.warn);
            if (!cancelled) setGalleryItems(INITIAL_GALLERY);
          } else {
            if (!cancelled) setGalleryItems(items);
          }
        } else {
          console.warn('[DataContext] Gallery API unavailable, using built-in data:', galRes.reason);
          if (!cancelled) setGalleryItems(INITIAL_GALLERY);
        }

        // ── Catalogues ────────────────────────────────────────────────────────
        if (catRes.status === 'fulfilled') {
          const { items } = catRes.value;
          const safe = (items || []).map(c => ({
            ...c,
            pdfUrl: (c.pdfUrl && (c.pdfUrl.startsWith('blob:') || c.pdfUrl.startsWith('data:'))) ? '' : (c.pdfUrl || ''),
            image: (c.image && c.image.startsWith('blob:')) ? '/clean_catalog_cover.jpg' : (c.image || '/clean_catalog_cover.jpg')
          }));
          if (!cancelled) setCatalogues(safe);
        } else {
          console.warn('[DataContext] Catalogues API unavailable:', catRes.reason);
          if (!cancelled) setCatalogues(INITIAL_CATALOGUES);
        }

      } catch (err) {
        console.error('[DataContext] Bootstrap error:', err);
        if (!cancelled) {
          setProducts(INITIAL_PRODUCTS);
          setGalleryItems(INITIAL_GALLERY);
          setCatalogues(INITIAL_CATALOGUES);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    bootstrap();
    return () => { cancelled = true; };
  }, []);

  // ── Product CRUD ────────────────────────────────────────────────────────────
  const addProduct = useCallback(async (newProduct) => {
    const item = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price) || 0,
      oldPrice: Number(newProduct.oldPrice) || 0,
      _createdAt: Date.now()
    };
    // Optimistic update
    setProducts(prev => [item, ...prev]);
    try {
      await apiPost('products', 'add', item);
    } catch (err) {
      console.error('addProduct API error:', err);
      // Keep local optimistic result even if API fails
    }
    return item;
  }, []);

  const updateProduct = useCallback(async (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    try {
      await apiPost('products', 'update', { id, fields: updatedFields });
    } catch (err) {
      console.error('updateProduct API error:', err);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await apiPost('products', 'delete', { id });
    } catch (err) {
      console.error('deleteProduct API error:', err);
    }
  }, []);

  // ── Gallery CRUD ────────────────────────────────────────────────────────────
  const addGalleryItem = useCallback(async (newItem) => {
    const item = { ...newItem, id: Date.now(), _createdAt: Date.now() };
    setGalleryItems(prev => [item, ...prev]);
    try {
      await apiPost('gallery', 'add', item);
    } catch (err) {
      console.error('addGalleryItem API error:', err);
    }
    return item;
  }, []);

  const deleteGalleryItem = useCallback(async (id) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
    try {
      await apiPost('gallery', 'delete', { id });
    } catch (err) {
      console.error('deleteGalleryItem API error:', err);
    }
  }, []);

  // ── Catalogue CRUD ──────────────────────────────────────────────────────────
  const addCatalogue = useCallback(async (newCat) => {
    const item = { ...newCat, id: Date.now(), _createdAt: Date.now() };
    setCatalogues(prev => [item, ...prev]);
    try {
      await apiPost('catalogues', 'add', item);
    } catch (err) {
      console.error('addCatalogue API error:', err);
    }
    return item;
  }, []);

  const deleteCatalogue = useCallback(async (id) => {
    setCatalogues(prev => prev.filter(c => c.id !== id));
    try {
      await apiPost('catalogues', 'delete', { id });
    } catch (err) {
      console.error('deleteCatalogue API error:', err);
    }
  }, []);

  return (
    <DataContext.Provider value={{
      products,
      galleryItems,
      catalogues,
      loading,
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
