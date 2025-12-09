import React from 'react';
import { Link } from 'react-router-dom';

function Wishlist() {
    return (
        <div style={{ padding: '120px 24px', textAlign: 'center', minHeight: '60vh' }}>
            <h1 style={{ fontFamily: 'Cormorant Garamond', marginBottom: '20px' }}>Your Wishlist</h1>
            <p style={{ color: '#666', fontFamily: 'Montserrat', marginBottom: '30px' }}>Your wishlist is currently empty.</p>
            <Link to="/collections" style={{
                background: '#1A1A1A', color: 'white', padding: '12px 24px',
                textDecoration: 'none', fontFamily: 'Montserrat', letterSpacing: '1px'
            }}>
                BROWSE COLLECTIONS
            </Link>
        </div>
    );
}

export default Wishlist;
