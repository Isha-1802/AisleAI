import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import './App.css';

function AppContent() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const hideFooter = location.pathname === '/ai-stylist';

  if (loading) {
    return <div className="loading-screen">Authenticating Maison Membership...</div>;
  }

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/style-hub" element={<StyleHub />} />
        <Route path="/ai-stylist" element={<AIStylist user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Info Pages */}
        <Route path="/about" element={<InfoPage type="about" />} />
        <Route path="/careers" element={<InfoPage type="careers" />} />
        <Route path="/press" element={<InfoPage type="press" />} />
        <Route path="/sustainability" element={<InfoPage type="sustainability" />} />
        <Route path="/contact" element={<InfoPage type="contact" />} />
        <Route path="/shipping" element={<InfoPage type="shipping" />} />
        <Route path="/returns" element={<InfoPage type="returns" />} />
        <Route path="/faq" element={<InfoPage type="faq" />} />
        <Route path="/size-guide" element={<InfoPage type="size-guide" />} />
        <Route path="/privacy" element={<InfoPage type="privacy" />} />
        <Route path="/terms" element={<InfoPage type="terms" />} />
        <Route path="/cookies" element={<InfoPage type="cookies" />} />
      </Routes>
      {!hideFooter && <Footer />}
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
