import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
    // Sample cart items - in real app, this would come from context/state management
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Silk Evening Gown',
            brand: 'Chanel',
            price: 12500,
            quantity: 1,
            size: 'M',
            color: 'Black',
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400'
        },
        {
            id: 2,
            name: 'Leather Handbag',
            brand: 'Dior',
            price: 8900,
            quantity: 1,
            size: 'One Size',
            color: 'Beige',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'
        }
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 10000 ? 0 : 500;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <div className="empty-cart">
                        <div className="empty-icon">🛍️</div>
                        <h2>Your Cart is Empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/collections" className="shop-btn">
                            EXPLORE COLLECTIONS
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                {/* Header */}
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <p className="item-count">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
                </div>

                <div className="cart-content">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}></div>

                                <div className="item-details">
                                    <div className="item-brand">{item.brand}</div>
                                    <h3 className="item-name">{item.name}</h3>
                                    <div className="item-meta">
                                        <span>Size: {item.size}</span>
                                        <span>Color: {item.color}</span>
                                    </div>
                                    <div className="item-price-mobile">₹{item.price.toLocaleString()}</div>
                                </div>

                                <div className="item-quantity">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>

                                <div className="item-price">₹{item.price.toLocaleString()}</div>

                                <div className="item-total">₹{(item.price * item.quantity).toLocaleString()}</div>

                                <button className="item-remove" onClick={() => removeItem(item.id)}>×</button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                        </div>

                        <div className="summary-row">
                            <span>Tax (GST 18%)</span>
                            <span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>

                        {shipping > 0 && (
                            <div className="shipping-notice">
                                Add ₹{(10000 - subtotal).toLocaleString()} more for FREE shipping
                            </div>
                        )}

                        <button className="checkout-btn">PROCEED TO CHECKOUT</button>

                        <Link to="/collections" className="continue-shopping">
                            ← Continue Shopping
                        </Link>

                        <div className="payment-icons">
                            <span>We Accept:</span>
                            <div className="icons">
                                💳 🏦 📱
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
