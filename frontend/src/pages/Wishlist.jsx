import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

function Wishlist() {
    // Empty wishlist for now - in real app, this would come from context/API
    const wishlistItems = [];

    return (
        <div className="wishlist-page">
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <h1>My Wishlist</h1>
                    <p className="item-count">{wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}</p>
                </div>

                <div className="empty-wishlist">
                    <div className="empty-icon">♡</div>
                    <h2>Your Wishlist is Empty</h2>
                    <p>Save your favorite items here to keep track of what you love.</p>
                    <Link to="/collections" className="shop-btn">
                        DISCOVER COLLECTIONS
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
