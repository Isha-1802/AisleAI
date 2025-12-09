import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Collections.css'; // Reusing collections CSS for consistent styling

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) return <div className="loading" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    if (!product) return <div className="error" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <h2>Product not found</h2>
        <Link to="/collections">Back to Collections</Link>
    </div>;

    return (
        <div style={{ padding: '40px 5%', minHeight: '100vh', background: 'white' }}>
            <div className="breadcrumb" style={{ marginBottom: '40px' }}>
                <Link to="/">Home</Link>
                <span className="breadcrumb-separator">/</span>
                <Link to="/collections">Collections</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{product.name}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Images Section */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    {/* Thumbnails */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {product.images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                style={{
                                    width: '80px',
                                    height: '100px',
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    cursor: 'pointer',
                                    border: selectedImage === idx ? '2px solid #1A1A1A' : '1px solid #eee',
                                    opacity: selectedImage === idx ? 1 : 0.6
                                }}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div style={{
                        flex: 1,
                        height: '600px',
                        backgroundImage: `url(${product.images[selectedImage]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#f9f9f9'
                    }} />
                </div>

                {/* Details Section */}
                <div>
                    <h2 style={{ fontFamily: 'Montserrat', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', color: '#1A1A1A' }}>
                        {product.brand}
                    </h2>
                    <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.2' }}>
                        {product.name}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                            <span style={{ fontSize: '1.2rem', color: '#999', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
                        )}
                        {product.discount > 0 && (
                            <span style={{ color: '#ff3f6c', fontWeight: 'bold' }}>({product.discount}% OFF)</span>
                        )}
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <p style={{ fontFamily: 'Montserrat', fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                            {product.description}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                        <button
                            onClick={() => {
                                addToCart(product);
                                alert('Product added to bag successfully!');
                            }}
                            style={{
                                flex: 1,
                                padding: '16px',
                                background: '#1A1A1A',
                                color: 'white',
                                border: 'none',
                                fontFamily: 'Montserrat',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            🛍️ ADD TO BAG
                        </button>

                        <button style={{
                            padding: '16px',
                            background: 'white',
                            border: '1px solid #ddd',
                            width: '60px',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            ♡
                        </button>
                    </div>

                    <div style={{ borderTop: '1px solid #eee', paddingTop: '30px' }}>
                        <h3 style={{ fontFamily: 'Montserrat', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '20px' }}>PRODUCT DETAILS</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '0.9rem', color: '#444' }}>
                            <div>Category: {product.category}</div>
                            <div>Season: {product.season}</div>
                            <div>Occasion: {product.occasion}</div>
                            <div>Rating: {product.rating} ⭐</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
