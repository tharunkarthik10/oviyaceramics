import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import RoomVisualizerModal from './components/RoomVisualizerModal';
import StoreLocatorModal from './components/StoreLocatorModal';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Catalogues from './pages/Catalogues';
import ContactUs from './pages/ContactUs';
import ProductDetails from './pages/ProductDetails.jsx';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainAppContent = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  // Global Modals State
  const [inquiryModal, setInquiryModal] = useState({ isOpen: false, productData: null });
  const [visualizerModal, setVisualizerModal] = useState({ isOpen: false, product: null });
  const [storeLocatorOpen, setStoreLocatorOpen] = useState(false);

  const openInquiry = (productData = null) => {
    setInquiryModal({ isOpen: true, productData });
  };

  const closeInquiry = () => {
    setInquiryModal({ isOpen: false, productData: null });
  };

  const openVisualizer = (product = null) => {
    setVisualizerModal({ isOpen: true, product });
  };

  const closeVisualizer = () => {
    setVisualizerModal({ isOpen: false, product: null });
  };

  const openStoreLocator = () => {
    setStoreLocatorOpen(true);
  };

  const closeStoreLocator = () => {
    setStoreLocatorOpen(false);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden relative min-h-screen">
      <ScrollToTop />
      {!isAdminRoute && <Navbar onOpenInquiry={() => openInquiry()} />}

      <Routes>
        <Route path="/" element={<Home onOpenInquiry={openInquiry} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/products" element={<Products onOpenVisualizer={openVisualizer} onOpenStoreLocator={openStoreLocator} />} />
        <Route path="/gallery" element={<Gallery onOpenInquiry={openInquiry} />} />
        <Route path="/catalogues" element={<Catalogues onOpenInquiry={openInquiry} onOpenVisualizer={openVisualizer} onOpenStoreLocator={openStoreLocator} />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/product/:id" element={<ProductDetails onOpenInquiry={openInquiry} onOpenVisualizer={openVisualizer} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {!isAdminRoute && <Footer />}

      {/* Global Interactive Modals */}
      <InquiryModal
        isOpen={inquiryModal.isOpen}
        onClose={closeInquiry}
        productData={inquiryModal.productData}
      />

      <RoomVisualizerModal
        isOpen={visualizerModal.isOpen}
        onClose={closeVisualizer}
        product={visualizerModal.product}
      />

      <StoreLocatorModal
        isOpen={storeLocatorOpen}
        onClose={closeStoreLocator}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <MainAppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
