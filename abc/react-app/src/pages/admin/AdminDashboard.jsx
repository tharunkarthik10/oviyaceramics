import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

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
  const [productForm, setProductForm] = useState({
    title: '',
    categoryType: 'GLAZED VITRIFIED TILES',
    category: 'Glazed Vitrified',
    finish: 'Glossy',
    material: 'Ceramic / Vitrified',
    netQuantity: '4 Pieces/Box',
    brand: 'Oviya Ceramics',
    size: '60x120 cm',
    price: '',
    oldPrice: '',
    inStock: true,
    image: '',
    imageType: 'url',
    description: ''
  });

  // New Gallery Item Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Floor Tiles',
    src: '',
    imageType: 'url',
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
    pdfFileName: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  // Automatic Client-Side Image Compression Helper (Canvas resizer)
  const compressImageFile = (file, maxWidth = 1200, quality = 0.75) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG at specified quality (0.75 = 75% quality)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Image Upload Helper with Automatic Compression
  const handleImageFileChange = async (e, setFormState) => {
    const file = e.target.files[0];
    if (file) {
      const compressedBase64 = await compressImageFile(file, 1200, 0.75);
      setFormState(prev => ({ ...prev, image: compressedBase64, src: compressedBase64 }));
    }
  };

  // PDF File Upload Helper (converts to data URL for easy storage & download)
  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCatalogueForm(prev => ({
          ...prev,
          pdfUrl: event.target.result,
          pdfFileName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Handlers
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.image) {
      alert('Please provide a product title and image.');
      return;
    }
    addProduct(productForm);
    setShowProductModal(false);
    setProductForm({
      title: '',
      categoryType: 'GLAZED VITRIFIED TILES',
      category: 'Glazed Vitrified',
      finish: 'Glossy',
      size: '60x120 cm',
      price: '',
      oldPrice: '',
      inStock: true,
      image: '',
      imageType: 'url',
      description: ''
    });
  };

  const handleAddGallerySubmit = (e) => {
    e.preventDefault();
    const imageSrc = galleryForm.src || galleryForm.image;
    if (!galleryForm.title || !imageSrc) {
      alert('Please provide a title and image.');
      return;
    }
    addGalleryItem({ ...galleryForm, src: imageSrc });
    setShowGalleryModal(false);
    setGalleryForm({
      title: '',
      category: 'Floor Tiles',
      src: '',
      imageType: 'url',
      description: ''
    });
  };

  const handleAddCatalogueSubmit = (e) => {
    e.preventDefault();
    if (!catalogueForm.title || !catalogueForm.image) {
      alert('Please provide catalogue title and cover image.');
      return;
    }
    addCatalogue(catalogueForm);
    setShowCatalogueModal(false);
    setCatalogueForm({
      title: '',
      subtitle: '',
      category: 'Glazed Vitrified Tiles',
      image: '',
      imageType: 'url',
      pdfType: 'file',
      pdfUrl: '',
      pdfFileName: ''
    });
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-stone-50 text-stone-900 flex flex-col md:flex-row font-body-md antialiased">
      
      {/* Sidebar Navigation (Fixed & Non-scrollable on viewport) */}
      <aside className="w-full md:w-64 md:fixed md:top-0 md:bottom-0 md:left-0 bg-white border-b md:border-b-0 md:border-r border-stone-200 p-6 flex flex-col justify-between shrink-0 shadow-sm z-30 overflow-y-auto">
        <div>
          {/* Brand Header */}
          <div className="mb-8">
            <Link to="/" className="block">
              <h1 className="font-headline-md text-xl font-bold tracking-widest text-stone-900">
                OVIYA CERAMICS
              </h1>
            </Link>
            <span className="text-[11px] text-primary uppercase tracking-widest block mt-0.5 font-bold">
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
                onClick={() => setShowProductModal(true)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-stone-300 transition-all">
                  <div>
                    <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                      <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-xs ${
                        prod.inStock ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {prod.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                        {prod.categoryType || prod.category}
                      </span>
                      <h3 className="font-bold text-base text-stone-900 tracking-wide">{prod.title}</h3>
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span>Size: <strong className="text-stone-800 font-semibold">{prod.size}</strong></span>
                        <div className="text-right">
                          <span className="text-base font-bold text-stone-900">₹{prod.price}</span>
                          {prod.oldPrice && <span className="line-through text-stone-400 ml-1 text-xs">₹{prod.oldPrice}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 flex items-center gap-2 border-t border-stone-100">
                    <button
                      onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                      className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors border border-stone-200"
                    >
                      Toggle Stock
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">{item.category}</span>
                      <h4 className="font-bold text-sm text-stone-900 truncate">{item.title}</h4>
                      {item.description && <p className="text-xs text-stone-500 line-clamp-2">{item.description}</p>}
                    </div>
                  </div>
                  <div className="p-3 border-t border-stone-100 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Remove gallery item "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors border border-red-200 cursor-pointer"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogues.map((cat) => (
                <div key={cat.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden">
                      <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">{cat.category}</span>
                      <h4 className="font-bold text-base text-stone-900">{cat.title}</h4>
                      <p className="text-xs text-stone-500">{cat.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-stone-100 flex justify-between items-center">
                    <a
                      href={cat.pdfUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                      <span>Download Link</span>
                    </a>
                    <button
                      onClick={() => {
                        if (confirm(`Remove catalogue "${cat.title}"?`)) {
                          deleteCatalogue(cat.id);
                        }
                      }}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors border border-red-200 cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-2xl p-6 md:p-8 space-y-6 my-8 shadow-2xl relative text-stone-900">
            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
              <h3 className="text-xl font-bold text-stone-900 tracking-wide">Post New Ceramic / Tile Product</h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BIANCO ONDULUTO"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value, categoryType: e.target.value.toUpperCase() })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  >
                    <option value="Floor Tiles">Floor Tiles</option>
                    <option value="Wall Tiles">Wall Tiles</option>
                    <option value="Glazed Vitrified">Glazed Vitrified</option>
                    <option value="Polished Vitrified">Polished Vitrified</option>
                    <option value="Outdoor Tiles">Outdoor Tiles</option>
                    <option value="Commercial Spaces">Commercial Spaces</option>
                    <option value="Sanitaryware">Sanitaryware</option>
                    <option value="Kitchen Tiles">Kitchen Tiles</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Tile Finish</label>
                  <select
                    value={productForm.finish}
                    onChange={(e) => setProductForm({ ...productForm, finish: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  >
                    <option value="Glossy">Glossy</option>
                    <option value="Matt">Matt</option>
                    <option value="Satin Interior">Satin Interior</option>
                    <option value="Digital Vitrified Parking">Digital Vitrified Parking</option>
                    <option value="High Depth Elevation">High Depth Elevation</option>
                    <option value="Dark Light Highlighter Concept">Dark Light Highlighter Concept</option>
                    <option value="Glossy Floor">Glossy Floor</option>
                    <option value="Dark Wooden Glossy">Dark Wooden Glossy</option>
                    <option value="Punch">Punch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Multi-Select Size Dropdown */}
                <div className="relative">
                  <label className="block uppercase font-bold text-stone-700 mb-1">
                    Size / Dimension (Select Multiple)
                  </label>
                  
                  {/* Dropdown Header Trigger (Fixed 46px Height to match adjacent inputs) */}
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
                            <span>{sz}</span>
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

                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="84"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Old Price (₹)</label>
                  <input
                    type="number"
                    placeholder="93"
                    value={productForm.oldPrice}
                    onChange={(e) => setProductForm({ ...productForm, oldPrice: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              {/* Specification Details (Material, Net Quantity, Brand) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-stone-200 pt-4">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Material</label>
                  <input
                    type="text"
                    placeholder="e.g. Ceramic / Vitrified"
                    value={productForm.material}
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Net Quantity</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Pieces/Box"
                    value={productForm.netQuantity}
                    onChange={(e) => setProductForm({ ...productForm, netQuantity: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Oviya Ceramics"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
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
                      onClick={() => setProductForm({ ...productForm, imageType: 'url' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${productForm.imageType === 'url' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, imageType: 'file' })}
                      className={`px-3 py-1 rounded text-[11px] font-semibold ${productForm.imageType === 'file' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'}`}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {productForm.imageType === 'url' ? (
                  <input
                    type="text"
                    placeholder="Paste image URL (e.g. /sanitaryware_1788246783314.jpg or http://...)"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, setProductForm)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-red-700"
                  />
                )}

                {productForm.image && (
                  <div className="mt-2 aspect-video max-h-36 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                    <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
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
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD GALLERY ITEM MODAL --- */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl text-stone-900">
            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
              <h3 className="text-lg font-bold text-stone-900">Add Photo to Project Gallery</h3>
              <button onClick={() => setShowGalleryModal(false)} className="text-stone-400 hover:text-stone-700">
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
                  <input
                    type="text"
                    placeholder="https://..."
                    value={galleryForm.src}
                    onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, setGalleryForm)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white"
                  />
                )}
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
      )}

      {/* --- ADD CATALOGUE MODAL --- */}
      {showCatalogueModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl text-stone-900">
            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
              <h3 className="text-lg font-bold text-stone-900">Publish Digital Catalogue</h3>
              <button onClick={() => setShowCatalogueModal(false)} className="text-stone-400 hover:text-stone-700">
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
                  <label className="uppercase font-bold text-stone-700">Cover Image Source</label>
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
                  <input
                    type="text"
                    placeholder="Cover Image URL (e.g. /clean_catalog_cover.jpg or http://...)"
                    value={catalogueForm.image}
                    onChange={(e) => setCatalogueForm({ ...catalogueForm, image: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, setCatalogueForm)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-red-700"
                  />
                )}

                {catalogueForm.image && (
                  <div className="mt-2 aspect-[3/4] max-h-32 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 w-max">
                    <img src={catalogueForm.image} alt="Cover Preview" className="h-full object-cover" />
                  </div>
                )}
              </div>

              {/* PDF Document Upload / Link Selection */}
              <div className="space-y-2 border-t border-stone-200 pt-4">
                <div className="flex justify-between items-center">
                  <label className="uppercase font-bold text-stone-700">Catalogue Document (PDF)</label>
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
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfFileChange}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-red-700 cursor-pointer"
                    />
                    {catalogueForm.pdfFileName && (
                      <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                        <span className="truncate">Selected: {catalogueForm.pdfFileName}</span>
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
                  className="px-4 py-2 bg-stone-100 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white font-bold rounded-xl uppercase shadow-md shadow-primary/20"
                >
                  Publish Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
