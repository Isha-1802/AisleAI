import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Collections.css';
import './StyleHub.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            setProduct(response.data.product);
        } catch (error) {
            console.error('Failed to load product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to add to cart');
            navigate('/login');
            return;
        }

        try {
            await axios.post(
                `${API_URL}/user/cart`,
                { productId: product._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Added to cart! 🛍️');
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert(error.response?.data?.error || 'Failed to add to cart');
        }
    };

    if (loading) {
        return (
            <div className="style-hub-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="style-hub-white" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <h1>Product Not Found</h1>
                <Link to="/collections" style={{ marginTop: '20px', color: '#1A1A1A' }}>← Back to Collections</Link>
            </div>
        );
    }

    return (
        <div className="collections-page" style={{ paddingTop: '120px' }}>
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="breadcrumb-separator">/</span>
                <Link to="/collections">Collections</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{product.name}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', maxWidth: '1400px', margin: '40px auto' }}>
                {/* Product Image */}
                <div style={{
                    aspectRatio: '3/4',
                    backgroundImage: `url(${product.images[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '4px',
                    position: 'relative'
                }}>
                    {product.discount > 0 && (
                        <span className="discount-badge">-{product.discount}%</span>
                    )}
                </div>

                {/* Product Info */}
                <div style={{ paddingTop: '20px' }}>
                    <div className="product-brand" style={{ fontSize: '14px', marginBottom: '12px' }}>
                        {product.brand}
                    </div>

                    <h1 style={{
                        fontFamily: 'Cormorant Garamond',
                        fontSize: '2.5rem',
                        marginBottom: '20px',
                        lineHeight: 1.2
                    }}>
                        {product.name}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: '#1A1A1A' }}>
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span style={{ fontSize: '1.5rem', color: '#999', textDecoration: 'line-through' }}>
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {product.rating > 0 && (
                        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem' }}>⭐ {product.rating}</span>
                            <span style={{ color: '#666' }}>({product.reviews} reviews)</span>
                        </div>
                    )}

                    <p style={{
                        fontSize: '1rem',
                        lineHeight: 1.8,
                        color: '#666',
                        marginBottom: '32px',
                        fontFamily: 'Montserrat'
                    }}>
                        {product.description}
                    </p>

                    {/* Product Details */}
                    <div style={{
                        background: '#f8f8f8',
                        padding: '24px',
                        borderRadius: '4px',
                        marginBottom: '32px'
                    }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontWeight: '600' }}>Product Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666' }}>Category:</span>
                                <span style={{ fontWeight: '600' }}>{product.category}</span>
                            </div>
                            {product.occasion && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Occasion:</span>
                                    <span style={{ fontWeight: '600' }}>{product.occasion}</span>
                                </div>
                            )}
                            {product.season && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Season:</span>
                                    <span style={{ fontWeight: '600' }}>{product.season}</span>
                                </div>
                            )}
                            {product.colors && product.colors.length > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Colors:</span>
                                    <span style={{ fontWeight: '600' }}>{product.colors.join(', ')}</span>
                                </div>
                            )}
                            {product.stock > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Stock:</span>
                                    <span style={{ fontWeight: '600', color: '#4CAF50' }}>In Stock ({product.stock} available)</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        style={{
                            width: '100%',
                            padding: '18px',
                            background: '#1A1A1A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: '600',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            transition: 'background 0.3s',
                            marginBottom: '16px'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#333'}
                        onMouseLeave={(e) => e.target.style.background = '#1A1A1A'}
                    >
                        🛍️ ADD TO BAG
                    </button>

                    <Link
                        to="/collections"
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            padding: '12px',
                            color: '#1A1A1A',
                            textDecoration: 'none',
                            fontSize: '13px',
                            letterSpacing: '1px'
                        }}
                    >
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
