import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  writeBatch,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { INITIAL_PRODUCTS } from './initialProducts';
import { INITIAL_GALLERY } from './initialGallery';

const DataContext = createContext();

// Firestore collection names
const COLLECTIONS = {
  products: 'oviya_products',
  gallery: 'oviya_gallery',
  catalogues: 'oviya_catalogues',
  meta: 'oviya_meta'
};

// Strip undefined values Firestore doesn't accept
const sanitizeForFirestore = (obj) => {
  if (Array.isArray(obj)) return obj.map(sanitizeForFirestore);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, sanitizeForFirestore(v)])
    );
  }
  return obj;
};

// Seed Firestore with initial data if collection is empty
const seedCollectionIfEmpty = async (colName, items, idField = 'id') => {
  const snap = await getDocs(collection(db, colName));
  if (snap.empty) {
    console.log(`[DataContext] Seeding ${colName} with ${items.length} initial items...`);
    const batch = writeBatch(db);
    for (const item of items) {
      const docRef = doc(collection(db, colName), String(item[idField]));
      batch.set(docRef, sanitizeForFirestore({ ...item, _seeded: true, _createdAt: Date.now() }));
    }
    await batch.commit();
    console.log(`[DataContext] Seeded ${colName} successfully.`);
    return true;
  }
  return false;
};

// Fetch all documents from a Firestore collection
const fetchCollection = async (colName) => {
  const snap = await getDocs(collection(db, colName));
  return snap.docs.map(d => ({ ...d.data(), _docId: d.id }));
};

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─── Bootstrap: seed and load all data from Firestore ──────────────────────
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        // Seed collections with initial data on first ever visit
        await Promise.allSettled([
          seedCollectionIfEmpty(COLLECTIONS.products, INITIAL_PRODUCTS),
          seedCollectionIfEmpty(COLLECTIONS.gallery, INITIAL_GALLERY)
        ]);

        // Load all collections
        const [prods, gallery, cats] = await Promise.all([
          fetchCollection(COLLECTIONS.products),
          fetchCollection(COLLECTIONS.gallery),
          fetchCollection(COLLECTIONS.catalogues)
        ]);

        if (!cancelled) {
          // Sort by original id or creation time
          setProducts(prods.sort((a, b) => {
            if (a._seeded && b._seeded) return (a.id || 0) - (b.id || 0);
            // Admin-added items (newer) come first
            if (!a._seeded && b._seeded) return -1;
            if (a._seeded && !b._seeded) return 1;
            return (b._createdAt || 0) - (a._createdAt || 0);
          }));

          setGalleryItems(gallery.sort((a, b) => {
            if (a._seeded && b._seeded) return (a.id || 0) - (b.id || 0);
            if (!a._seeded && b._seeded) return -1;
            if (a._seeded && !b._seeded) return 1;
            return (b._createdAt || 0) - (a._createdAt || 0);
          }));

          // Strip any stale blob: or data: URLs from catalogues
          setCatalogues(cats
            .map(c => ({
              ...c,
              pdfUrl: (c.pdfUrl && (c.pdfUrl.startsWith('blob:') || c.pdfUrl.startsWith('data:'))) ? '' : (c.pdfUrl || ''),
              image: (c.image && c.image.startsWith('blob:')) ? '/clean_catalog_cover.jpg' : (c.image || '/clean_catalog_cover.jpg')
            }))
            .sort((a, b) => (b._createdAt || 0) - (a._createdAt || 0))
          );
        }
      } catch (err) {
        console.error('[DataContext] Firestore bootstrap error:', err);
        // Fallback to initial data so the site still works offline
        if (!cancelled) {
          setProducts(INITIAL_PRODUCTS);
          setGalleryItems(INITIAL_GALLERY);
          setCatalogues([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    bootstrap();
    return () => { cancelled = true; };
  }, []);

  // ─── Product CRUD ───────────────────────────────────────────────────────────
  const addProduct = useCallback(async (newProduct) => {
    const item = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price) || 0,
      oldPrice: Number(newProduct.oldPrice) || 0,
      _seeded: false,
      _createdAt: Date.now()
    };
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.products), sanitizeForFirestore(item));
      const saved = { ...item, _docId: docRef.id };
      setProducts(prev => [saved, ...prev]);
      return saved;
    } catch (err) {
      console.error('addProduct Firestore error:', err);
      // Optimistic local fallback
      setProducts(prev => [item, ...prev]);
      return item;
    }
  }, []);

  const updateProduct = useCallback(async (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    try {
      const snap = await getDocs(query(collection(db, COLLECTIONS.products)));
      const match = snap.docs.find(d => d.data().id === id);
      if (match) {
        await updateDoc(doc(db, COLLECTIONS.products, match.id), sanitizeForFirestore(updatedFields));
      }
    } catch (err) {
      console.error('updateProduct Firestore error:', err);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.products));
      const match = snap.docs.find(d => d.data().id === id);
      if (match) await deleteDoc(doc(db, COLLECTIONS.products, match.id));
    } catch (err) {
      console.error('deleteProduct Firestore error:', err);
    }
  }, []);

  // ─── Gallery CRUD ───────────────────────────────────────────────────────────
  const addGalleryItem = useCallback(async (newItem) => {
    const item = {
      ...newItem,
      id: Date.now(),
      _seeded: false,
      _createdAt: Date.now()
    };
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.gallery), sanitizeForFirestore(item));
      const saved = { ...item, _docId: docRef.id };
      setGalleryItems(prev => [saved, ...prev]);
      return saved;
    } catch (err) {
      console.error('addGalleryItem Firestore error:', err);
      setGalleryItems(prev => [item, ...prev]);
      return item;
    }
  }, []);

  const deleteGalleryItem = useCallback(async (id) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.gallery));
      const match = snap.docs.find(d => d.data().id === id);
      if (match) await deleteDoc(doc(db, COLLECTIONS.gallery, match.id));
    } catch (err) {
      console.error('deleteGalleryItem Firestore error:', err);
    }
  }, []);

  // ─── Catalogue CRUD ─────────────────────────────────────────────────────────
  const addCatalogue = useCallback(async (newCat) => {
    const item = {
      ...newCat,
      id: Date.now(),
      _seeded: false,
      _createdAt: Date.now()
    };
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.catalogues), sanitizeForFirestore(item));
      const saved = { ...item, _docId: docRef.id };
      setCatalogues(prev => [saved, ...prev]);
      return saved;
    } catch (err) {
      console.error('addCatalogue Firestore error:', err);
      setCatalogues(prev => [item, ...prev]);
      return item;
    }
  }, []);

  const deleteCatalogue = useCallback(async (id) => {
    setCatalogues(prev => prev.filter(c => c.id !== id));
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.catalogues));
      const match = snap.docs.find(d => d.data().id === id);
      if (match) await deleteDoc(doc(db, COLLECTIONS.catalogues, match.id));
    } catch (err) {
      console.error('deleteCatalogue Firestore error:', err);
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
