import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StyleHub.css';
import './Collections.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function Wishlist() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/user/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(response.data.favorites || []);
        } catch (error) {
            console.error('Failed to load favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/user/favorites/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(favorites.filter(item => item._id !== productId));
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
            alert('Failed to remove item');
        }
    };

    if (loading) {
        return (
            <div className="style-hub-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="style-hub-white" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.8 }}>♡</div>
                <h1 className="style-hub-title" style={{ fontSize: '3rem' }}>Your Wishlist</h1>
                <p className="style-hub-subtitle" style={{ marginBottom: '40px' }}>Your curated collection of favorites is currently empty.</p>
                <Link to="/collections" className="feature-cta-btn" style={{ background: '#1A1A1A', color: 'white', opacity: 1, transform: 'none', padding: '16px 32px' }}>
                    Explore Collections
                </Link>
            </div>
        );
    }

    return (
        <div className="collections-page" style={{ paddingTop: '120px' }}>
            <div className="collections-header-clean">
                <h1>My Wishlist <span className="item-count">- {favorites.length} items</span></h1>
            </div>

            <div className="products-grid">
                {favorites.map(product => (
                    <div key={product._id} className="product-card" style={{ position: 'relative' }}>
                        <button
                            onClick={() => handleRemove(product._id)}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '18px',
                                zIndex: 10,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                            title="Remove from wishlist"
                        >
                            ❌
                        </button>

                        <div className="product-image" style={{ backgroundImage: `url(${product.images[0]})` }}>
                            {product.discount > 0 && (
                                <span className="discount-badge">-{product.discount}%</span>
                            )}
                        </div>
                        <div className="product-info">
                            <div className="product-brand">{product.brand}</div>
                            <h3 className="product-name">{product.name}</h3>
                            <div className="product-price">
                                <span className="current-price">₹{product.price.toLocaleString()}</span>
                                {product.originalPrice && (
                                    <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;
