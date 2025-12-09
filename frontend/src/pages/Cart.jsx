import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-page-empty">
                <div className="empty-cart-container">
                    <div className="empty-cart-icon">🛍️</div>
                    <h2>Your Shopping Bag is Empty</h2>
                    <p>Looks like you haven't added anything to your bag yet.</p>
                    <Link to="/collections" className="start-shopping-btn">
                        START SHOPPING
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1 className="cart-title">Shopping Bag ({cart.length} Items)</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.images[0]} alt={item.name} />
                            </div>
                            <div className="cart-item-details">
                                <div className="cart-item-header">
                                    <h3>{item.brand}</h3>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="remove-btn"
                                    >×</button>
                                </div>
                                <h4>{item.name}</h4>
                                <div className="cart-item-controls">
                                    <div className="quantity-selector">
                                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                    </div>
                                    <div className="item-price">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>₹{getCartTotal().toLocaleString()}</span>
                    </div>
                    <button className="checkout-btn">PROCEED TO CHECKOUT</button>
                    <div className="secure-checkout">
                        🔒 Secure Checkout
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
