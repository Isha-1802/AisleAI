import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Collections from './pages/Collections';
import StyleHub from './pages/StyleHub';
import AIStylist from './pages/AIStylist';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import InfoPage from './pages/InfoPage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { BrandLoader } from './components/Skeleton';
import './App.css';

// Wrap each route so it fades/slides on navigation.
function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const hideFooter = location.pathname === '/ai-stylist';

  if (loading) {
    return <BrandLoader />;
  }

  return (
    <div className="app">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/collections" element={<Page><Collections /></Page>} />
          <Route path="/style-hub" element={<Page><StyleHub /></Page>} />
          <Route path="/ai-stylist" element={<AIStylist user={user} />} />
          <Route path="/login" element={<Page><Login /></Page>} />
          <Route path="/register" element={<Page><Register /></Page>} />
          <Route path="/profile" element={<Page><Profile /></Page>} />
          <Route path="/wishlist" element={<Page><Wishlist /></Page>} />
          <Route path="/cart" element={<Page><Cart /></Page>} />
          <Route path="/product/:id" element={<Page><ProductDetails /></Page>} />

          {/* Info Pages */}
          <Route path="/about" element={<Page><InfoPage type="about" /></Page>} />
          <Route path="/careers" element={<Page><InfoPage type="careers" /></Page>} />
          <Route path="/press" element={<Page><InfoPage type="press" /></Page>} />
          <Route path="/sustainability" element={<Page><InfoPage type="sustainability" /></Page>} />
          <Route path="/contact" element={<Page><InfoPage type="contact" /></Page>} />
          <Route path="/shipping" element={<Page><InfoPage type="shipping" /></Page>} />
          <Route path="/returns" element={<Page><InfoPage type="returns" /></Page>} />
          <Route path="/faq" element={<Page><InfoPage type="faq" /></Page>} />
          <Route path="/size-guide" element={<Page><InfoPage type="size-guide" /></Page>} />
          <Route path="/privacy" element={<Page><InfoPage type="privacy" /></Page>} />
          <Route path="/terms" element={<Page><InfoPage type="terms" /></Page>} />
          <Route path="/cookies" element={<Page><InfoPage type="cookies" /></Page>} />
        </Routes>
      </AnimatePresence>
      {!hideFooter && <Footer />}

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2600,
          style: {
            background: '#1a1a1a',
            color: '#fdfbf7',
            borderRadius: '2px',
            padding: '12px 20px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.5px',
            border: '1px solid rgba(212, 175, 55, 0.35)',
          },
          success: { iconTheme: { primary: '#D4AF37', secondary: '#1a1a1a' } },
          error: { iconTheme: { primary: '#ff3f6c', secondary: '#1a1a1a' } },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
