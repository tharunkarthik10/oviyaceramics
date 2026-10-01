import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import SEO from '../../components/SEO';
import { uploadImageToR2, uploadPdfToR2 } from '../../services/r2Storage';

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const {
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
  } = useData();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'overview', 'products', 'gallery', 'catalogues'
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showProductModal, setShowProductModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showCatalogueModal, setShowCatalogueModal] = useState(false);

  // Multi-select Size Dropdown State
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [customSizeText, setCustomSizeText] = useState('');
  const [sizeFilterQuery, setSizeFilterQuery] = useState('');

  // Multi-select Category Dropdown State
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [customCategoryText, setCustomCategoryText] = useState('');
  const [categoryFilterQuery, setCategoryFilterQuery] = useState('');

  const ALL_CATEGORY_OPTIONS = [
    "Tiles",
    "Sanitarywares",
    "Fittings",
    "Granites"
  ];

  const ALL_SIZE_OPTIONS = [
    "120x280 cm",
    "120x240 cm",
    "80x160 cm",
    "60x120 cm",
    "80x80 cm",
    "60x60 cm",
    "30x60 cm",
    "30x45 cm",
    "40x40 cm",
    "30x30 cm",
    "20x30 cm",
    "20x20 cm"
  ];

  // New Product Form State
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    categoryType: 'TILES',
    category: 'Tiles',
    ethnicity: '',
    finish: 'Glossy',
    material: 'Ceramic / Vitrified',
    netQuantity: '4 Pieces/Box',
    brand: 'Oviya Ceramics',
    size: '60x120 cm',
    price: '',
    oldPrice: '',
    inStock: true,
    image: '',
    images: [],
    previewUrls: [],
    imageType: 'file',
    description: ''
  });

  // New Gallery Item Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Floor Tiles',
    src: '',
    images: [],
    previewUrls: [],
    imageType: 'file',
    description: ''
  });

  // New Catalogue Form State
  const [catalogueForm, setCatalogueForm] = useState({
    title: '',
    subtitle: '',
    category: 'Glazed Vitrified Tiles',
    image: '',
    imageType: 'url',
    pdfType: 'file',
    pdfUrl: '',
    pdfFileName: '',
    pdfFileSize: ''
  });

  // Upload & Compression State for feedback
  const [uploadState, setUploadState] = useState({
    isProcessing: false,
    statusText: '',
    stats: null
  });

  // PDF Document Upload State
  const [pdfUploadState, setPdfUploadState] = useState({
    isUploading: false,
    progress: 0,
    statusText: '',
    source: ''
  });

  const productFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);
  const catalogueFileInputRef = useRef(null);
  const cataloguePdfInputRef = useRef(null);

  const removeProductImageAt = (index) => {
    setProductForm(prev => {
      const currentList = prev.images && prev.images.length > 0 ? prev.images : (prev.image ? [prev.image] : []);
      const updated = currentList.filter((_, i) => i !== index);
      const newPrimary = updated[0] || '';
      return {
        ...prev,
        images: updated,
        image: newPrimary,
        previewUrls: updated,
        previewUrl: newPrimary
      };
    });
  };

  const setPrimaryProductImage = (index) => {
    setProductForm(prev => {
      const currentList = prev.images && prev.images.length > 0 ? [...prev.images] : (prev.image ? [prev.image] : []);
      if (index >= 0 && index < currentList.length) {
        const [selected] = currentList.splice(index, 1);
        currentList.unshift(selected);
      }
      return {
        ...prev,
        images: currentList,
        image: currentList[0] || '',
        previewUrls: currentList,
        previewUrl: currentList[0] || ''
      };
    });
  };

  const clearProductImage = () => {
    (productForm.previewUrls || []).forEach(url => {
      if (url && url.startsWith('blob:')) {
        try { URL.revokeObjectURL(url); } catch (e) {}
      }
    });
    if (productForm.previewUrl && productForm.previewUrl.startsWith('blob:')) {
      try { URL.revokeObjectURL(productForm.previewUrl); } catch (e) {}
    }
    setProductForm(prev => ({ ...prev, image: '', images: [], previewUrl: '', previewUrls: [] }));
    if (productFileInputRef.current) {
      productFileInputRef.current.value = '';
    }
    setUploadState({ isProcessing: false, statusText: '', stats: null });
  };

  const removeGalleryImageAt = (index) => {
    setGalleryForm(prev => {
      const currentList = prev.images && prev.images.length > 0 ? prev.images : (prev.src ? [prev.src] : []);
      const updated = currentList.filter((_, i) => i !== index);
      const newPrimary = updated[0] || '';
      return {
        ...prev,
        images: updated,
        src: newPrimary,
        previewUrls: updated,
        previewUrl: newPrimary
      };
    });
  };

  const clearGalleryImage = () => {
    (galleryForm.previewUrls || []).forEach(url => {
      if (url && url.startsWith('blob:')) {
        try { URL.revokeObjectURL(url); } catch (e) {}
      }
    });
    if (galleryForm.previewUrl && galleryForm.previewUrl.startsWith('blob:')) {
      try { URL.revokeObjectURL(galleryForm.previewUrl); } catch (e) {}
    }
    setGalleryForm(prev => ({ ...prev, src: '', images: [], previewUrl: '', previewUrls: [] }));
    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = '';
    }
    setUploadState({ isProcessing: false, statusText: '', stats: null });
  };

  const clearCatalogueImage = () => {
    if (catalogueForm.previewUrl && catalogueForm.previewUrl.startsWith('blob:')) {
      try { URL.revokeObjectURL(catalogueForm.previewUrl); } catch (e) {}
    }
    setCatalogueForm(prev => ({ ...prev, image: '', previewUrl: '' }));
    if (catalogueFileInputRef.current) {
      catalogueFileInputRef.current.value = '';
    }
    setUploadState({ isProcessing: false, statusText: '', stats: null });
  };

  const clearCataloguePdf = () => {
    if (catalogueForm.pdfUrl && catalogueForm.pdfUrl.startsWith('blob:')) {
      try { URL.revokeObjectURL(catalogueForm.pdfUrl); } catch (e) {}
    }
    setCatalogueForm(prev => ({ ...prev, pdfFileName: '', pdfUrl: '', pdfFileSize: '' }));
    if (cataloguePdfInputRef.current) {
      cataloguePdfInputRef.current.value = '';
    }
    setPdfUploadState({ isUploading: false, progress: 0, statusText: '', source: '' });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  // Image Upload Helper supporting Multiple Files with Automatic WebP Compression and Cloudflare R2 Upload
  const handleImageFileChange = async (e, setFormState, folder = 'products') => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (files.some(f => !f.type.startsWith('image/'))) {
      alert('Security Validation: Only valid image files (JPG, PNG, WebP) are permitted.');
      e.target.value = '';
      return;
    }

    if (files.some(f => f.size > 25 * 1024 * 1024)) {
      alert('One or more files exceed the 25MB limit. Please upload images under 25MB.');
      e.target.value = '';
      return;
    }

    // Immediately show instant previews from local files
    const localPreviews = files.map(f => URL.createObjectURL(f));
    setFormState(prev => {
      const existingImages = prev.images && prev.images.length > 0 
        ? prev.images 
        : (prev.image ? [prev.image] : (prev.src ? [prev.src] : []));
      const existingPreviews = prev.previewUrls && prev.previewUrls.length > 0
        ? prev.previewUrls
        : (prev.previewUrl ? [prev.previewUrl] : existingImages);

      const combinedImages = [...existingImages, ...localPreviews];
      const combinedPreviews = [...existingPreviews, ...localPreviews];

      return {
        ...prev,
        image: combinedImages[0] || '',
        images: combinedImages,
        src: combinedImages[0] || '',
        previewUrl: combinedPreviews[0] || '',
        previewUrls: combinedPreviews
      };
    });

    try {
      setUploadState({
        isProcessing: true,
        statusText: files.length > 1 
          ? `Compressing ${files.length} images...` 
          : `Compressing ${files[0].name}...`,
        stats: null
      });

      const uploadResults = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadState(prev => ({
          ...prev,
          statusText: files.length > 1
            ? `Uploading ${i + 1}/${files.length}: ${file.name}...`
            : `Compressing ${file.name}...`
        }));

        const result = await uploadImageToR2(file, {
          folder,
          maxWidth: 2560,
          maxHeight: 2560,
          quality: 0.94,
          onProgress: (p) => {
            if (p.status === 'compressing') {
              setUploadState(prev => ({
                ...prev,
                statusText: files.length > 1
                  ? `Optimizing ${i + 1}/${files.length} (${file.name})...`
                  : 'Downscaling & converting to WebP...'
              }));
            }
          }
        });
        uploadResults.push(result);
      }

      const uploadedUrls = uploadResults.map(r => r.url);
      setFormState(prev => {
        // Strip out the temporary local blobs for these specific files and replace with uploaded URLs
        const nonBlobExisting = (prev.images || []).filter(u => !u.startsWith('blob:'));
        const finalImages = [...nonBlobExisting, ...uploadedUrls];
        return {
          ...prev,
          image: finalImages[0] || uploadedUrls[0] || '',
          images: finalImages,
          src: finalImages[0] || uploadedUrls[0] || '',
          previewUrl: finalImages[0] || uploadedUrls[0] || '',
          previewUrls: finalImages
        };
      });

      const totalFormatted = uploadResults.length > 1 
        ? `${uploadResults.length} images uploaded & stored on Cloudflare R2`
        : uploadResults[0].source === 'r2'
          ? `Stored on Cloudflare R2 (${uploadResults[0].stats?.compressedSizeFormatted || 'WebP'})`
          : `Compressed WebP Ready (${uploadResults[0].stats?.compressedSizeFormatted || 'WebP'})`;

      setUploadState({
        isProcessing: false,
        statusText: `✓ ${totalFormatted}`,
        stats: uploadResults[0]?.stats || null
      });
    } catch (err) {
      alert(`Upload error: ${err.message}`);
      setUploadState({ isProcessing: false, statusText: '', stats: null });
    }
  };

  // PDF File Upload Helper with Cloudflare R2 Upload
  const handlePdfFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Security Validation: Only valid PDF documents (.pdf) are allowed.');
      e.target.value = '';
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('Catalogue PDF size exceeds the 50MB limit. Please upload a PDF under 50MB.');
      e.target.value = '';
      return;
    }

    const formatBytes = (bytes) => {
      if (!bytes) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };

    const formattedSize = formatBytes(file.size);

    setPdfUploadState({
      isUploading: true,
      progress: 25,
      statusText: `Uploading "${file.name}" (${formattedSize}) to Cloudflare R2...`,
      source: ''
    });

    try {
      const result = await uploadPdfToR2(file, {
        folder: 'catalogues',
        onProgress: (p) => {
          if (p.status === 'uploading') {
            setPdfUploadState(prev => ({
              ...prev,
              progress: p.progress || 50,
              statusText: `Uploading "${file.name}" to Cloudflare R2...`
            }));
          }
        }
      });

      if (result && result.url) {
        setCatalogueForm(prev => ({
          ...prev,
          pdfUrl: result.url,
          pdfFileName: file.name,
          pdfFileSize: formattedSize
        }));

        setPdfUploadState({
          isUploading: false,
          progress: 100,
          statusText: `Stored securely on Cloudflare R2 (${formattedSize})`,
          source: result.source
        });
      } else {
        throw new Error('Upload response did not return a valid URL.');
      }
    } catch (err) {
      console.error('PDF Upload failed:', err);
      alert(`PDF Upload failed: ${err.message || 'Unknown error'}`);
      setPdfUploadState({
        isUploading: false,
        progress: 0,
        statusText: '',
        source: ''
      });
    }
  };

  const handleEditProduct = (prod) => {
    setEditingProductId(prod.id);
    const existingImages = prod.images && prod.images.length > 0 
      ? prod.images 
      : (prod.image ? [prod.image] : []);
    setProductForm({
      title: prod.title || '',
      categoryType: prod.categoryType || 'TILES',
      category: prod.category || 'Tiles',
      ethnicity: prod.ethnicity || '',
      finish: prod.finish || 'Glossy',
      material: prod.material || 'Ceramic / Vitrified',
      netQuantity: prod.netQuantity || '4 Pieces/Box',
      brand: prod.brand || 'Oviya Ceramics',
      size: prod.size || '60x120 cm',
      price: prod.price || '',
      oldPrice: prod.oldPrice || '',
      inStock: prod.inStock !== false,
      image: prod.image || existingImages[0] || '',
      images: existingImages,
      previewUrls: existingImages,
      imageType: 'url',
      description: prod.description || ''
    });
    setShowProductModal(true);
  };

  // Submit Handlers
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const finalImages = productForm.images && productForm.images.length > 0 
      ? productForm.images 
      : (productForm.image ? [productForm.image] : []);
    const mainImage = finalImages[0] || productForm.image;

    if (!productForm.title || !mainImage) {
      alert('Please provide a product title and at least one image.');
      return;
    }
    const payload = {
      ...productForm,
      image: mainImage,
      images: finalImages
    };
    if (editingProductId) {
      updateProduct(editingProductId, payload);
      setEditingProductId(null);
    } else {
      addProduct(payload);
    }
    setShowProductModal(false);
    clearProductImage();
  };

  const handleAddGallerySubmit = (e) => {
    e.preventDefault();
    const imgs = (galleryForm.images && galleryForm.images.length > 0) 
      ? galleryForm.images 
      : (galleryForm.src ? [galleryForm.src] : []);
    if (!galleryForm.title || imgs.length === 0) {
      alert('Please provide a title and at least one image.');
      return;
    }
    // Add all selected photos to gallery
    imgs.forEach((imgSrc, idx) => {
      addGalleryItem({
        ...galleryForm,
        title: imgs.length > 1 ? `${galleryForm.title} (${idx + 1})` : galleryForm.title,
        src: imgSrc
      });
    });
    setShowGalleryModal(false);
    clearGalleryImage();
  };

  const handleAddCatalogueSubmit = (e) => {
    e.preventDefault();
    if (!catalogueForm.title || !catalogueForm.title.trim()) {
      alert('Please provide a catalogue title.');
      return;
    }

    if (pdfUploadState.isUploading) {
      alert('Please wait for the PDF to finish uploading before publishing.');
      return;
    }

    if (!catalogueForm.pdfUrl || !catalogueForm.pdfUrl.trim()) {
      alert('Please select a PDF document file or provide a direct PDF link URL.');
      return;
    }

    // Default cover image: If the user didn't specify a cover image,
    // use a sleek default catalogue cover so they are never blocked!
    const defaultCover = '/clean_catalog_cover.jpg';
    const finalImage = (catalogueForm.image && catalogueForm.image.trim())
      || (catalogueForm.previewUrl && catalogueForm.previewUrl.trim())
      || defaultCover;

    addCatalogue({
      title: catalogueForm.title.trim(),
      subtitle: catalogueForm.subtitle?.trim() || '',
      category: catalogueForm.category || 'Glazed Vitrified Tiles',
      image: finalImage,
      pdfUrl: catalogueForm.pdfUrl.trim(),
      pdfFileName: catalogueForm.pdfFileName || '',
      pdfFileSize: catalogueForm.pdfFileSize || '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });

    setShowCatalogueModal(false);
    setCatalogueForm({
      title: '',
      subtitle: '',
      category: 'Glazed Vitrified Tiles',
      image: '',
      imageType: 'url',
      pdfType: 'file',
      pdfUrl: '',
      pdfFileName: '',
      pdfFileSize: ''
    });
    setPdfUploadState({
      isUploading: false,
      progress: 0,
      statusText: '',
      source: ''
    });
  };

  const filteredProducts = products.filter(p =>
    (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.categoryType || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-stone-50 text-stone-900 flex flex-col md:flex-row font-body-md antialiased">
      <SEO title="Admin Management Console" noindex={true} />
      
      {/* Sidebar Navigation (Fixed & Non-scrollable on viewport) */}
      <aside className="w-full md:w-64 md:fixed md:top-0 md:bottom-0 md:left-0 bg-white border-b md:border-b-0 md:border-r border-stone-200 p-6 flex flex-col justify-between shrink-0 shadow-sm z-30 overflow-y-auto">
        <div>
          {/* Brand Header */}
          <div className="mb-8">
            <Link to="/" className="block" aria-label="Oviya Ceramics Home">
              <img 
                src="/oviya_logo_transparent.png" 
                alt="Oviya Ceramics - Spaces That Inspire" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <span className="text-[11px] text-primary uppercase tracking-widest block mt-2 font-bold">
              Admin Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'overview'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'products'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                <span>Products</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono ${activeTab === 'products' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'gallery'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">photo_library</span>
                <span>Gallery</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono ${activeTab === 'gallery' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
                {galleryItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('catalogues')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'catalogues'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                <span>Catalogues</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono ${activeTab === 'catalogues' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
                {catalogues.length}
              </span>
            </button>
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="pt-6 border-t border-stone-200 mt-8 space-y-3">
          <div className="text-xs text-stone-500">
            <span className="block text-[10px] uppercase text-stone-400 font-bold tracking-wider">Logged in as</span>
            <span className="font-semibold text-stone-800 truncate block">{user?.email}</span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors border border-stone-200"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>View Public Site</span>
          </Link>

          <button
            onClick={logout}
            className="w-full py-2.5 px-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (Independent Scroll) */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 w-full min-h-screen">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-1">Portal Overview</h2>
              <p className="text-stone-500 text-sm">Summary of published media and products across Oviya Ceramics website.</p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Total Products</span>
                  <div className="text-3xl font-bold text-stone-900 mt-2">{products.length}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <span className="material-symbols-outlined text-[24px]">grid_view</span>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Gallery Items</span>
                  <div className="text-3xl font-bold text-stone-900 mt-2">{galleryItems.length}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                  <span className="material-symbols-outlined text-[24px]">photo_library</span>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Digital Catalogues</span>
                  <div className="text-3xl font-bold text-stone-900 mt-2">{catalogues.length}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <span className="material-symbols-outlined text-[24px]">menu_book</span>
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-stone-900">Post New Product</h3>
                <p className="text-xs text-stone-500 leading-relaxed">Add ceramic tiles, vitrified slabs, or sanitaryware with sizes, pricing, and high-res photos.</p>
                <button
                  onClick={() => { setActiveTab('products'); setShowProductModal(true); }}
                  className="w-full py-2.5 px-4 bg-primary hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add Product</span>
                </button>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-stone-900">Add Gallery Photo</h3>
                <p className="text-xs text-stone-500 leading-relaxed">Upload project installation photos, showroom images, or manufacturing views.</p>
                <button
                  onClick={() => { setActiveTab('gallery'); setShowGalleryModal(true); }}
                  className="w-full py-2.5 px-4 bg-primary hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
                  <span>Add Gallery Image</span>
                </button>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-stone-900">Publish Catalogue</h3>
                <p className="text-xs text-stone-500 leading-relaxed">Upload new PDF catalogues and high quality covers for buyers and distributors.</p>
                <button
                  onClick={() => { setActiveTab('catalogues'); setShowCatalogueModal(true); }}
                  className="w-full py-2.5 px-4 bg-primary hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">upload_file</span>
                  <span>Add Catalogue</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Products Management</h2>
                <p className="text-stone-500 text-xs mt-1">Manage catalog listings visible on `/products` and `/product/:id` pages.</p>
              </div>

              <button
                onClick={() => {
                  setEditingProductId(null);
                  setProductForm({
                    title: '',
                    categoryType: 'TILES',
                    category: 'Tiles',
                    ethnicity: '',
                    finish: 'Glossy',
                    material: 'Ceramic / Vitrified',
                    netQuantity: '4 Pieces/Box',
                    brand: 'Oviya Ceramics',
                    size: '60x120 cm',
                    price: '',
                    oldPrice: '',
                    inStock: true,
                    image: '',
                    imageType: 'file',
                    description: ''
                  });
                  setShowProductModal(true);
                }}
                className="py-3 px-5 bg-primary hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md shadow-primary/20 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Post New Product</span>
              </button>
            </div>

            {/* Search Filter */}
            <div className="relative max-w-md">
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-stone-400 text-[18px]">search</span>
              <input
                type="text"
                placeholder="Search products by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-primary shadow-xs"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3.5 sm:gap-4">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-md hover:border-stone-300 transition-all">
                  <div>
                    <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden">
                      <img 
                        src={prod.image} 
                        alt={prod.title} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/luxury_living_tiles_banner.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-xs ${
                        prod.inStock ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {prod.inStock ? 'In Stock' : 'Out'}
                      </span>
                      {prod.finish && (
                        <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-xs">
                          {prod.finish}
                        </span>
                      )}
                    </div>

                    <div className="p-3 space-y-1.5">
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          {prod.categoryType || prod.category}
                        </span>
                        {prod.ethnicity && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 truncate max-w-[120px]" title={prod.ethnicity}>
                            {prod.ethnicity}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-stone-900 tracking-tight truncate" title={prod.title}>
                        {prod.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] text-stone-500 gap-1">
                        <span className="truncate flex-1" title={prod.size}>
                          {prod.size}
                        </span>
                        <div className="text-right shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-stone-900">₹{prod.price}</span>
                          {prod.oldPrice && <span className="line-through text-stone-400 ml-1 text-[10px]">₹{prod.oldPrice}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 pb-3 pt-2 flex items-center gap-1.5 border-t border-stone-100">
                    <button
                      onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                      className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[10px] font-semibold rounded-lg transition-colors border border-stone-200 text-center truncate cursor-pointer"
                    >
                      {prod.inStock ? 'In Stock' : 'Out'}
                    </button>

                    <button
                      onClick={() => handleEditProduct(prod)}
                      className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      title="Edit Product"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Delete Product"
                    >
                      <span className="material-symbols-outlined text-[15px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Gallery & Visual Portfolio</h2>
                <p className="text-stone-500 text-xs mt-1">Manage project and feature images displayed on the `/gallery` page.</p>
              </div>

              <button
                onClick={() => setShowGalleryModal(true)}
                className="py-3 px-5 bg-primary hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md shadow-primary/20 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                <span>Add Gallery Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">{item.category}</span>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate" title={item.title}>{item.title}</h4>
                      {item.description && <p className="text-[11px] text-stone-500 line-clamp-1">{item.description}</p>}
                    </div>
                  </div>
                  <div className="p-2.5 border-t border-stone-100 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Remove gallery item "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-semibold rounded-lg transition-colors border border-red-200 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CATALOGUES MANAGER */}
        {activeTab === 'catalogues' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Digital Catalogues Management</h2>
                <p className="text-stone-500 text-xs mt-1">Upload and publish downloadable catalogues for distributors and clients (`/catalogues`).</p>
              </div>

              <button
                onClick={() => setShowCatalogueModal(true)}
                className="py-3 px-5 bg-primary hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md shadow-primary/20 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                <span>Add Catalogue</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {catalogues.map((cat) => (
                <div key={cat.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden">
                      <img 
                        src={cat.image || '/clean_catalog_cover.jpg'} 
                        alt={cat.title} 
                        onError={(e) => { e.currentTarget.src = '/clean_catalog_cover.jpg'; }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="p-3 space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">{cat.category}</span>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate" title={cat.title}>{cat.title}</h4>
                      <p className="text-[11px] text-stone-500 truncate">{cat.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-2.5 border-t border-stone-100 flex justify-between items-center">
                    {cat.pdfUrl ? (
                      <a
                        href={cat.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-primary font-bold hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
                        <span>View PDF</span>
                      </a>
                    ) : (
                      <span className="text-[10px] text-stone-400 italic">No PDF</span>
                    )}
                    <button
                      onClick={() => {
                        if (confirm(`Remove catalogue "${cat.title}"?`)) {
                          deleteCatalogue(cat.id);
                        }
                      }}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-semibold rounded-lg transition-colors border border-red-200 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* --- ADD PRODUCT MODAL --- */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-3 sm:p-6">
          <div className="min-h-full flex justify-center py-4 sm:py-8">
            <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-3xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 my-auto shadow-2xl relative text-stone-900">
              <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-wide">
                  {editingProductId ? 'Edit Ceramic / Tile Product' : 'Post New Ceramic / Tile Product'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              {/* Main Product Info Grid (Unified 4-column grid for pixel-perfect alignment) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BIANCO ONDULUTO"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                {/* Multi-Select Category Dropdown */}
                <div className="relative">
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    <span>Category <span className="text-[10px] text-stone-400 font-semibold normal-case tracking-normal">(Select Multiple)</span></span>
                  </label>
                  
                  {/* Dropdown Header Trigger */}
                  <div 
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-stone-900 cursor-pointer flex items-center justify-between gap-2 focus-within:border-primary hover:bg-white shadow-xs"
                  >
                    <div className="flex flex-wrap gap-1.5 items-center flex-1 max-h-[34px] overflow-y-auto pr-1 hide-scrollbar">
                      {productForm.category ? (
                        productForm.category.split(',').map(c => c.trim()).filter(Boolean).map(cat => (
                          <span 
                            key={cat} 
                            className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-300 font-semibold px-2 py-0.5 rounded-md text-[11px] shrink-0"
                          >
                            <span className="truncate max-w-[110px]">{cat}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentList = productForm.category.split(',').map(c => c.trim()).filter(Boolean);
                                const updated = currentList.filter(item => item !== cat);
                                setProductForm({
                                  ...productForm,
                                  category: updated.join(', '),
                                  categoryType: (updated[0] || '').toUpperCase()
                                });
                              }}
                              className="hover:text-red-700 font-bold text-xs"
                            >
                              ✕
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-stone-400 text-xs">Select categories...</span>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-stone-500 text-[20px] shrink-0">
                      {isCategoryDropdownOpen ? 'expand_less' : 'unfold_more'}
                    </span>
                  </div>

                  {/* Dropdown Menu Popup */}
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-300 rounded-xl shadow-xl z-50 p-3 space-y-2 max-h-64 overflow-y-auto">
                      {/* Search Filter */}
                      <input
                        type="text"
                        placeholder="Search category options..."
                        value={categoryFilterQuery}
                        onChange={(e) => setCategoryFilterQuery(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs focus:outline-none focus:border-primary mb-1"
                      />

                      {/* Standard Category Checkboxes */}
                      <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                        {ALL_CATEGORY_OPTIONS.filter(cat => cat.toLowerCase().includes(categoryFilterQuery.toLowerCase())).map(cat => {
                          const currentList = productForm.category ? productForm.category.split(',').map(c => c.trim()).filter(Boolean) : [];
                          const isChecked = currentList.includes(cat);

                          return (
                            <label 
                              key={cat} 
                              className="flex items-center gap-2.5 p-1.5 hover:bg-stone-50 rounded cursor-pointer text-xs select-none"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  let updatedList;
                                  if (isChecked) {
                                    updatedList = currentList.filter(item => item !== cat);
                                  } else {
                                    updatedList = [...currentList, cat];
                                  }
                                  setProductForm({
                                    ...productForm,
                                    category: updatedList.join(', '),
                                    categoryType: (updatedList[0] || '').toUpperCase()
                                  });
                                }}
                                className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                              />
                              <span className={`text-stone-800 ${isChecked ? 'font-bold text-stone-900' : 'font-normal'}`}>{cat}</span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Custom Category Addition */}
                      <div className="pt-2 border-t border-stone-200 flex gap-2">
                        <input
                          type="text"
                          placeholder="Add custom category (e.g. Balcony)"
                          value={customCategoryText}
                          onChange={(e) => setCustomCategoryText(e.target.value)}
                          className="flex-1 bg-stone-50 border border-stone-200 rounded-lg p-1.5 text-xs text-stone-900 focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (customCategoryText.trim()) {
                              const currentList = productForm.category ? productForm.category.split(',').map(c => c.trim()).filter(Boolean) : [];
                              if (!currentList.includes(customCategoryText.trim())) {
                                const updatedList = [...currentList, customCategoryText.trim()];
                                setProductForm({
                                  ...productForm,
                                  category: updatedList.join(', '),
                                  categoryType: (updatedList[0] || '').toUpperCase()
                                });
                              }
                              setCustomCategoryText('');
                            }
                          }}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-lg shrink-0"
                        >
                          Add Custom
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    Tile Finish
                  </label>
                  <select
                    value={productForm.finish}
                    onChange={(e) => setProductForm({ ...productForm, finish: e.target.value })}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Glossy">Glossy</option>
                    <option value="High Gloss">High Gloss</option>
                    <option value="Matt">Matt</option>
                    <option value="Carving Matt">Carving Matt</option>
                    <option value="Silk Satin">Silk Satin</option>
                    <option value="Satin Interior">Satin Interior</option>
                    <option value="Digital Vitrified Parking">Digital Vitrified Parking</option>
                    <option value="High Depth Elevation">High Depth Elevation</option>
                    <option value="Dark Light Highlighter Concept">Dark Light Highlighter Concept</option>
                    <option value="Glossy Floor">Glossy Floor</option>
                    <option value="Dark Wooden Glossy">Dark Wooden Glossy</option>
                    <option value="Punch">Punch</option>
                  </select>
                </div>

                <div>
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    Design Ethnicity
                  </label>
                  <input
                    type="text"
                    list="ethnicity-options"
                    placeholder="e.g. Italian Carrara"
                    value={productForm.ethnicity}
                    onChange={(e) => setProductForm({ ...productForm, ethnicity: e.target.value })}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                  <datalist id="ethnicity-options">
                    <option value="Italian Carrara" />
                    <option value="Ocean Blue Onyx" />
                    <option value="Persian Gold Onyx" />
                    <option value="Spanish Statuario" />
                    <option value="Calacatta Gold" />
                    <option value="Matt Carving" />
                    <option value="Endless Marbles" />
                    <option value="Moroccan & Terrazzo" />
                    <option value="Modern Stone & Slate" />
                    <option value="Royal Black & Gold" />
                  </datalist>
                </div>

                {/* Multi-Select Size Dropdown (Spans 2 columns to align with Columns 1 & 2) */}
                <div className="relative md:col-span-2 lg:col-span-2">
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    <span>Size / Dimension <span className="text-[10px] text-stone-400 font-semibold normal-case tracking-normal">(Select Multiple)</span></span>
                  </label>
                  
                  {/* Dropdown Header Trigger */}
                  <div 
                    onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-stone-900 cursor-pointer flex items-center justify-between gap-2 focus-within:border-primary hover:bg-white shadow-xs"
                  >
                    <div className="flex flex-wrap gap-1.5 items-center flex-1 max-h-[34px] overflow-y-auto pr-1 hide-scrollbar">
                      {productForm.size ? (
                        productForm.size.split(',').map(s => s.trim()).filter(Boolean).map(sz => (
                          <span 
                            key={sz} 
                            className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-300 font-semibold px-2 py-0.5 rounded-md text-[11px] shrink-0"
                          >
                            <span className="truncate max-w-[130px]">{sz}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentList = productForm.size.split(',').map(s => s.trim()).filter(Boolean);
                                const updated = currentList.filter(item => item !== sz);
                                setProductForm({ ...productForm, size: updated.join(', ') });
                              }}
                              className="hover:text-red-700 font-bold text-xs"
                            >
                              ✕
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-stone-400 text-xs">Select sizes from dropdown...</span>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-stone-500 text-[20px] shrink-0">
                      {isSizeDropdownOpen ? 'expand_less' : 'unfold_more'}
                    </span>
                  </div>

                  {/* Dropdown Menu Popup */}
                  {isSizeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-300 rounded-xl shadow-xl z-50 p-3 space-y-2 max-h-64 overflow-y-auto">
                      {/* Search Filter */}
                      <input
                        type="text"
                        placeholder="Search size options..."
                        value={sizeFilterQuery}
                        onChange={(e) => setSizeFilterQuery(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs focus:outline-none focus:border-primary mb-1"
                      />

                      {/* Standard Size Checkboxes */}
                      <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                        {ALL_SIZE_OPTIONS.filter(sz => sz.toLowerCase().includes(sizeFilterQuery.toLowerCase())).map(sz => {
                          const currentList = productForm.size ? productForm.size.split(',').map(s => s.trim()).filter(Boolean) : [];
                          const isChecked = currentList.includes(sz);

                          return (
                            <label 
                              key={sz} 
                              className="flex items-center gap-2.5 p-1.5 hover:bg-stone-50 rounded cursor-pointer text-xs select-none"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  let updatedList;
                                  if (isChecked) {
                                    updatedList = currentList.filter(item => item !== sz);
                                  } else {
                                    updatedList = [...currentList, sz];
                                  }
                                  setProductForm({ ...productForm, size: updatedList.join(', ') });
                                }}
                                className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                              />
                              <span className={`text-stone-800 ${isChecked ? 'font-bold text-stone-900' : 'font-normal'}`}>{sz}</span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Custom Size Addition */}
                      <div className="pt-2 border-t border-stone-200 flex gap-2">
                        <input
                          type="text"
                          placeholder="Add custom size (e.g. 80x160 cm)"
                          value={customSizeText}
                          onChange={(e) => setCustomSizeText(e.target.value)}
                          className="flex-1 bg-stone-50 border border-stone-200 rounded-lg p-1.5 text-xs text-stone-900 focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (customSizeText.trim()) {
                              const currentList = productForm.size ? productForm.size.split(',').map(s => s.trim()).filter(Boolean) : [];
                              if (!currentList.includes(customSizeText.trim())) {
                                const updatedList = [...currentList, customSizeText.trim()];
                                setProductForm({ ...productForm, size: updatedList.join(', ') });
                              }
                              setCustomSizeText('');
                            }
                          }}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-lg shrink-0"
                        >
                          Add Custom
                        </button>
                      </div>

                      <div className="text-right pt-1">
                        <button
                          type="button"
                          onClick={() => setIsSizeDropdownOpen(false)}
                          className="text-[11px] text-primary font-bold hover:underline"
                        >
                          Done Selecting
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price (Aligns directly beneath Column 3: Tile Finish) */}
                <div className="md:col-span-1 lg:col-span-1">
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="84"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                {/* Old Price (Aligns directly beneath Column 4: Design Ethnicity) */}
                <div className="md:col-span-1 lg:col-span-1">
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    Old Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="93"
                    value={productForm.oldPrice}
                    onChange={(e) => setProductForm({ ...productForm, oldPrice: e.target.value })}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              {/* Specification Details (Material, Net Quantity, Brand) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-stone-200 pt-4">
                <div>
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    Material
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ceramic / Vitrified"
                    value={productForm.material}
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    Net Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Pieces/Box"
                    value={productForm.netQuantity}
                    onChange={(e) => setProductForm({ ...productForm, netQuantity: e.target.value })}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="uppercase font-bold text-stone-700 min-h-[34px] flex items-end pb-1 text-[11px] leading-tight">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Oviya Ceramics"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              {/* Image Input Selection */}
              <div className="space-y-2 border-t border-stone-200 pt-4">
                <div className="flex justify-between items-center">
                  <label className="uppercase font-bold text-stone-700">Product Image Source</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, imageType: 'file' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold cursor-pointer ${productForm.imageType === 'file' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      Upload File (Auto-Compressed)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, imageType: 'url' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold cursor-pointer ${productForm.imageType === 'url' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {productForm.imageType === 'url' ? (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Paste image URL (e.g. /sanitaryware_1788246783314.jpg or http://...)"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 pr-10 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                    />
                    {productForm.image && (
                      <button
                        type="button"
                        onClick={clearProductImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-600 p-1 rounded-full hover:bg-stone-200 transition cursor-pointer"
                        title="Clear image URL"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <input
                    ref={productFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageFileChange(e, setProductForm, 'products')}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-red-700 cursor-pointer"
                  />
                )}

                {uploadState.isProcessing && (
                  <div className="mt-2 p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-blue-600 border-t-transparent shrink-0"></div>
                    <span>{uploadState.statusText}</span>
                  </div>
                )}

                {(() => {
                  const displayImages = (productForm.images && productForm.images.length > 0)
                    ? productForm.images
                    : ((productForm.previewUrls && productForm.previewUrls.length > 0)
                        ? productForm.previewUrls
                        : (productForm.previewUrl || productForm.image ? [productForm.previewUrl || productForm.image] : []));

                  if (displayImages.length === 0) return null;

                  return (
                    <div className="mt-3 rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-50 p-2.5 sm:p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                            Selected Images ({displayImages.length})
                          </span>
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Ready to Publish
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={clearProductImage}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 bg-red-50 hover:border-red-600 px-2.5 py-0.5 rounded-md transition cursor-pointer"
                          title="Delete all selected images"
                        >
                          <span className="material-symbols-outlined text-[13px] font-bold">close</span>
                          <span>Delete All</span>
                        </button>
                      </div>

                      {/* Responsive Grid of Selected Images */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                        {displayImages.map((imgUrl, idx) => (
                          <div 
                            key={idx} 
                            className={`relative aspect-square rounded-xl overflow-hidden bg-black/5 border-2 transition-all group ${
                              idx === 0 ? 'border-primary ring-2 ring-primary/20 shadow-sm' : 'border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            <img 
                              src={imgUrl} 
                              alt={`Product view ${idx + 1}`} 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/luxury_living_tiles_banner.jpg';
                              }}
                            />
                            
                            {/* Primary Cover Badge or Set Cover Action */}
                            {idx === 0 ? (
                              <span className="absolute top-1.5 left-1.5 bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs">
                                Cover
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setPrimaryProductImage(idx)}
                                className="absolute top-1.5 left-1.5 bg-stone-900/80 hover:bg-primary text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded transition cursor-pointer opacity-90 group-hover:opacity-100"
                                title="Click to set as main cover photo"
                              >
                                Set Cover
                              </button>
                            )}

                            {/* Floating X Delete Button for this single image */}
                            <button
                              type="button"
                              onClick={() => removeProductImageAt(idx)}
                              className="absolute top-1.5 right-1.5 z-10 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                              title="Delete this image"
                              aria-label="Delete this image"
                            >
                              <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                      {displayImages.length > 1 && (
                        <p className="text-[10px] text-stone-500 mt-2 italic">
                          Tip: The "Cover" photo will be the main tile thumbnail. Click "Set Cover" on any photo to make it the primary image.
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Description / Spec</label>
                <textarea
                  rows="2"
                  placeholder="Describe the finish, application areas, or strength specs..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                  className="rounded bg-stone-100 border-stone-300 text-primary focus:ring-primary w-4 h-4"
                />
                <label htmlFor="inStockCheck" className="text-stone-700 font-semibold cursor-pointer">
                  Mark as In Stock immediately
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-red-700 text-white font-bold rounded-xl uppercase tracking-wider shadow-md shadow-primary/20"
                >
                  {editingProductId ? 'Update Product' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* --- ADD GALLERY ITEM MODAL --- */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-3 sm:p-6">
          <div className="min-h-full flex justify-center py-4 sm:py-8">
            <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-lg p-5 sm:p-6 space-y-6 my-auto shadow-2xl text-stone-900">
              <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                <h3 className="text-lg font-bold text-stone-900">Add Photo to Project Gallery</h3>
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

            <form onSubmit={handleAddGallerySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Image Title / Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Villa Living Room Installation"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Category Filter</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                >
                  <option value="Floor Tiles">Floor Tiles</option>
                  <option value="Wall Tiles">Wall Tiles</option>
                  <option value="Bathroom Tiles">Bathroom Tiles</option>
                  <option value="Portico Tiles">Portico Tiles</option>
                  <option value="Sanitarywares">Sanitarywares</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Transport">Transport</option>
                </select>
              </div>

              <div className="space-y-2 border-t border-stone-200 pt-4">
                <div className="flex justify-between items-center">
                  <label className="uppercase font-bold text-stone-700">Image Source</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setGalleryForm({ ...galleryForm, imageType: 'url' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${galleryForm.imageType === 'url' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryForm({ ...galleryForm, imageType: 'file' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${galleryForm.imageType === 'file' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {galleryForm.imageType === 'url' ? (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="https://..."
                      value={galleryForm.src}
                      onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 pr-10 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                    />
                    {galleryForm.src && (
                      <button
                        type="button"
                        onClick={clearGalleryImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-600 p-1 rounded-full hover:bg-stone-200 transition cursor-pointer"
                        title="Clear image URL"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageFileChange(e, setGalleryForm, 'gallery')}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white cursor-pointer"
                  />
                )}

                {uploadState.isProcessing && (
                  <div className="mt-2 p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-blue-600 border-t-transparent shrink-0"></div>
                    <span>{uploadState.statusText}</span>
                  </div>
                )}

                {(() => {
                  const displayGallery = (galleryForm.images && galleryForm.images.length > 0)
                    ? galleryForm.images
                    : ((galleryForm.previewUrls && galleryForm.previewUrls.length > 0)
                        ? galleryForm.previewUrls
                        : (galleryForm.previewUrl || galleryForm.src ? [galleryForm.previewUrl || galleryForm.src] : []));

                  if (displayGallery.length === 0) return null;

                  return (
                    <div className="mt-3 rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-50 p-2.5 sm:p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-2.5">
                        <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                          Selected Gallery Photos ({displayGallery.length})
                        </span>
                        <button
                          type="button"
                          onClick={clearGalleryImage}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 bg-red-50 hover:border-red-600 px-2 py-0.5 rounded-md transition cursor-pointer"
                          title="Delete all selected images"
                        >
                          <span className="material-symbols-outlined text-[13px] font-bold">close</span>
                          <span>Delete All</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                        {displayGallery.map((imgUrl, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-black/5 border border-stone-200 group">
                            <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeGalleryImageAt(idx)}
                              className="absolute top-1.5 right-1.5 z-10 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                              title="Delete this image"
                              aria-label="Delete this image"
                            >
                              <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white font-bold rounded-xl uppercase shadow-md shadow-primary/20"
                >
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* --- ADD CATALOGUE MODAL --- */}
      {showCatalogueModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-3 sm:p-6">
          <div className="min-h-full flex justify-center py-4 sm:py-8">
            <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-lg p-5 sm:p-6 space-y-6 my-auto shadow-2xl text-stone-900">
              <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                <h3 className="text-lg font-bold text-stone-900">Publish Digital Catalogue</h3>
                <button
                  type="button"
                  onClick={() => setShowCatalogueModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

            <form onSubmit={handleAddCatalogueSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Catalogue Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. THE ULTIMA 2026"
                  value={catalogueForm.title}
                  onChange={(e) => setCatalogueForm({ ...catalogueForm, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Subtitle / Region</label>
                <input
                  type="text"
                  placeholder="e.g. South India Collection"
                  value={catalogueForm.subtitle}
                  onChange={(e) => setCatalogueForm({ ...catalogueForm, subtitle: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Category</label>
                <select
                  value={catalogueForm.category}
                  onChange={(e) => setCatalogueForm({ ...catalogueForm, category: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                >
                  <option value="Glazed Vitrified Tiles">Glazed Vitrified Tiles</option>
                  <option value="Gres Tiles">Gres Tiles</option>
                  <option value="Polished Vitrified Tiles">Polished Vitrified Tiles</option>
                  <option value="Ceramic Wall Tiles - EXPORTS">Ceramic Wall Tiles - EXPORTS</option>
                  <option value="Nepal Catalogues">Nepal Catalogues</option>
                </select>
              </div>

              {/* Cover Image Selection */}
              <div className="space-y-2 border-t border-stone-200 pt-4">
                <div className="flex justify-between items-center">
                  <label className="uppercase font-bold text-stone-700 flex items-center gap-1.5">
                    Cover Image
                    <span className="text-[10px] text-stone-500 font-normal lowercase bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                      (optional - defaults to clean catalog cover)
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCatalogueForm({ ...catalogueForm, imageType: 'url' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${catalogueForm.imageType === 'url' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setCatalogueForm({ ...catalogueForm, imageType: 'file' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${catalogueForm.imageType === 'file' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {catalogueForm.imageType === 'url' ? (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cover Image URL (Optional - defaults to /clean_catalog_cover.jpg)"
                      value={catalogueForm.image}
                      onChange={(e) => setCatalogueForm({ ...catalogueForm, image: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 pr-10 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                    />
                    {catalogueForm.image && (
                      <button
                        type="button"
                        onClick={clearCatalogueImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-600 p-1 rounded-full hover:bg-stone-200 transition cursor-pointer"
                        title="Clear cover image URL"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <input
                    ref={catalogueFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, setCatalogueForm, 'catalogues')}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-red-700 cursor-pointer"
                  />
                )}

                {uploadState.isProcessing && (
                  <div className="mt-2 p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-blue-600 border-t-transparent shrink-0"></div>
                    <span>{uploadState.statusText}</span>
                  </div>
                )}

                {(catalogueForm.previewUrl || catalogueForm.image) && (
                  <div className="mt-3 rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-50 p-2 shadow-xs">
                    <div className="flex items-center justify-between pb-1.5 px-1 border-b border-stone-200 mb-2">
                      <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Catalogue Cover Preview</span>
                      <button
                        type="button"
                        onClick={clearCatalogueImage}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 bg-red-50 hover:border-red-600 px-2 py-0.5 rounded-md transition cursor-pointer"
                        title="Delete cover image"
                      >
                        <span className="material-symbols-outlined text-[13px] font-bold">close</span>
                        <span>Delete</span>
                      </button>
                    </div>
                    <div className="relative aspect-[3/4] max-h-40 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center group w-max">
                      <img src={catalogueForm.previewUrl || catalogueForm.image} alt="Cover Preview" className="h-full object-cover" />
                      <button
                        type="button"
                        onClick={clearCatalogueImage}
                        className="absolute top-2 right-2 z-10 w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                        title="Delete cover image"
                        aria-label="Delete cover image"
                      >
                        <span className="material-symbols-outlined text-base font-bold">close</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* PDF Document Upload / Link Selection */}
              <div className="space-y-2 border-t border-stone-200 pt-4">
                <div className="flex justify-between items-center">
                  <label className="uppercase font-bold text-stone-700 flex items-center gap-1.5">
                    Catalogue Document (PDF)
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCatalogueForm({ ...catalogueForm, pdfType: 'file' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${catalogueForm.pdfType === 'file' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      Upload PDF File
                    </button>
                    <button
                      type="button"
                      onClick={() => setCatalogueForm({ ...catalogueForm, pdfType: 'url' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${catalogueForm.pdfType === 'url' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      PDF Link URL
                    </button>
                  </div>
                </div>

                {catalogueForm.pdfType === 'file' ? (
                  <div className="space-y-2">
                    <input
                      ref={cataloguePdfInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfFileChange}
                      disabled={pdfUploadState.isUploading}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-red-700 cursor-pointer disabled:opacity-50"
                    />

                    {pdfUploadState.isUploading && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-stone-900">{pdfUploadState.statusText || 'Uploading PDF to Cloudflare R2...'}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">Please wait, saving document securely to cloud storage.</div>
                        </div>
                      </div>
                    )}

                    {catalogueForm.pdfFileName && !pdfUploadState.isUploading && (
                      <div className="flex items-center justify-between text-xs text-emerald-800 font-medium bg-emerald-50 border border-emerald-300 p-3 rounded-xl shadow-xs">
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                          </div>
                          <div className="truncate">
                            <div className="font-bold text-stone-900 truncate">{catalogueForm.pdfFileName}</div>
                            <div className="text-[11px] text-emerald-700 flex items-center gap-1.5">
                              <span>{catalogueForm.pdfFileSize || 'PDF Document'}</span>
                              <span>•</span>
                              <span className="font-semibold text-emerald-800 flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[13px] font-bold">check_circle</span>
                                Ready on Cloudflare R2
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={clearCataloguePdf}
                          className="text-stone-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition cursor-pointer shrink-0 ml-2"
                          title="Remove selected PDF"
                        >
                          <span className="material-symbols-outlined text-lg font-bold">close</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Direct PDF Web Link (e.g. https://domain.com/catalog.pdf)"
                    value={catalogueForm.pdfUrl}
                    onChange={(e) => setCatalogueForm({ ...catalogueForm, pdfUrl: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowCatalogueModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pdfUploadState.isUploading}
                  className={`px-6 py-2.5 bg-primary text-white font-bold rounded-xl uppercase tracking-wider text-xs shadow-md shadow-primary/20 flex items-center gap-2 transition cursor-pointer ${
                    pdfUploadState.isUploading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-700'
                  }`}
                >
                  {pdfUploadState.isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                      <span>Uploading PDF...</span>
                    </>
                  ) : (
                    <span>Publish Catalogue</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

    </div>
  );
};

export default AdminDashboard;
