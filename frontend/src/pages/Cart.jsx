import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StyleHub.css';
import './Collections.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/user/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data.cart || []);
        } catch (error) {
            console.error('Failed to load cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/user/cart/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(cart.filter(item => item.product._id !== productId));
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            alert('Failed to remove item');
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const token = localStorage.getItem('token');
        try {
            await axios.put(`${API_URL}/user/cart/${productId}`,
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(cart.map(item =>
                item.product._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    if (loading) {
        return (
            <div className="style-hub-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="style-hub-white" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.8 }}>🛍️</div>
                <h1 className="style-hub-title" style={{ fontSize: '3rem' }}>Shopping Bag</h1>
                <p className="style-hub-subtitle" style={{ marginBottom: '40px' }}>Your bag is empty. Let's fill it with something beautiful.</p>
                <Link to="/collections" className="feature-cta-btn" style={{ background: '#1A1A1A', color: 'white', opacity: 1, transform: 'none', padding: '16px 32px' }}>
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="collections-page" style={{ paddingTop: '120px' }}>
            <div className="collections-header-clean">
                <h1>Shopping Bag <span className="item-count">- {cart.length} items</span></h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px', maxWidth: '1400px' }}>
                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {cart.map(item => (
                        <div key={item.product._id} style={{
                            display: 'grid',
                            gridTemplateColumns: '200px 1fr auto',
                            gap: '24px',
                            padding: '24px',
                            background: 'white',
                            border: '1px solid #e8e6e1',
                            borderRadius: '4px'
                        }}>
                            <div style={{
                                backgroundImage: `url(${item.product.images[0]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                aspectRatio: '3/4',
                                borderRadius: '4px'
                            }} />

                            <div>
                                <div className="product-brand">{item.product.brand}</div>
                                <h3 className="product-name" style={{ marginBottom: '12px' }}>{item.product.name}</h3>
                                <div className="product-price" style={{ marginBottom: '16px' }}>
                                    <span className="current-price">₹{item.product.price.toLocaleString()}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '13px', color: '#666' }}>Quantity:</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            border: '1px solid #ddd',
                                            background: 'white',
                                            cursor: 'pointer',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        −
                                    </button>
                                    <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '600' }}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            border: '1px solid #ddd',
                                            background: 'white',
                                            cursor: 'pointer',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <button
                                    onClick={() => handleRemove(item.product._id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '20px',
                                        opacity: 0.6
                                    }}
                                    title="Remove from cart"
                                >
                                    🗑️
                                </button>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#2c2c2c' }}>
                                    ₹{(item.product.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div style={{
                    background: '#f8f8f8',
                    padding: '32px',
                    borderRadius: '4px',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '120px'
                }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', fontFamily: 'Cormorant Garamond' }}>
                        Order Summary
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #ddd' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span>Subtotal ({cart.length} items)</span>
                            <span>₹{calculateTotal().toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span>Shipping</span>
                            <span style={{ color: '#4CAF50' }}>FREE</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>
                        <span>Total</span>
                        <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>

                    <button style={{
                        width: '100%',
                        padding: '16px',
                        background: '#1A1A1A',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: '600',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        transition: 'background 0.3s'
                    }}
                        onMouseEnter={(e) => e.target.style.background = '#333'}
                        onMouseLeave={(e) => e.target.style.background = '#1A1A1A'}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
