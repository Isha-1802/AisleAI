import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            setProduct(response.data.product);
            if (response.data.product.colors?.length > 0) {
                setSelectedColor(response.data.product.colors[0]);
            }
        } catch (error) {
            console.error('Failed to load product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-page">
                <div className="error">Product not found</div>
            </div>
        );
    }

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/collections">Collections</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </div>

                <div className="product-detail-content">
                    {/* Product Images */}
                    <div className="product-images">
                        <div className="main-image" style={{ backgroundImage: `url(${product.images[0]})` }}>
                            {product.discount > 0 && (
                                <span className="discount-badge">-{product.discount}%</span>
                            )}
                        </div>
                        {product.images.length > 1 && (
                            <div className="thumbnail-images">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="thumbnail"
                                        style={{ backgroundImage: `url(${img})` }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-info-section">
                        <div className="product-brand">{product.brand}</div>
                        <h1 className="product-title">{product.name}</h1>

                        {product.rating > 0 && (
                            <div className="product-rating">
                                ⭐ {product.rating} ({product.reviews || 0} reviews)
                            </div>
                        )}

                        <div className="product-price">
                            <span className="current-price">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                        </div>

                        <p className="product-description">{product.description}</p>

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="selection-group">
                                <label>Color: <strong>{selectedColor}</strong></label>
                                <div className="color-options">
                                    {product.colors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                            title={color}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        <div className="selection-group">
                            <label>Size: {selectedSize && <strong>{selectedSize}</strong>}</label>
                            <div className="size-options">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="selection-group">
                            <label>Quantity:</label>
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button className="add-to-cart-btn">ADD TO CART</button>
                            <button className="wishlist-btn">♡ WISHLIST</button>
                        </div>

                        {/* Product Details */}
                        <div className="product-details">
                            <div className="detail-item">
                                <strong>Category:</strong> {product.category}
                            </div>
                            {product.occasion && (
                                <div className="detail-item">
                                    <strong>Occasion:</strong> {product.occasion}
                                </div>
                            )}
                            {product.season && (
                                <div className="detail-item">
                                    <strong>Season:</strong> {product.season}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
