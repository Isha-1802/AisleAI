import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlist.length === 0) {
        return (
            <div style={{ padding: '120px 24px', textAlign: 'center', minHeight: '60vh', background: '#FDFBF7' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond', marginBottom: '20px', fontSize: '2.5rem' }}>Your Wishlist</h1>
                <p style={{ color: '#666', fontFamily: 'Montserrat', marginBottom: '30px', fontSize: '1rem' }}>
                    Your wishlist is currently empty.
                </p>
                <Link to="/collections" style={{
                    background: '#1A1A1A', color: 'white', padding: '16px 32px',
                    textDecoration: 'none', fontFamily: 'Montserrat', letterSpacing: '2px',
                    fontWeight: '600', fontSize: '0.9rem', display: 'inline-block'
                }}>
                    BROWSE COLLECTIONS
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '120px 5% 60px', minHeight: '100vh', background: '#FDFBF7' }}>
            <h1 style={{ fontFamily: 'Cormorant Garamond', textAlign: 'center', fontSize: '3rem', marginBottom: '40px' }}>
                My Wishlist ({wishlist.length})
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1400px', margin: '0 auto' }}>
                {wishlist.map((product) => (
                    <div key={product._id} style={{ background: 'white', position: 'relative' }}>
                        <button
                            onClick={() => removeFromWishlist(product._id)}
                            style={{
                                position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                                background: 'white', border: 'none', fontSize: '1.2rem', cursor: 'pointer',
                                width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                            title="Remove"
                        >
                            ✕
                        </button>

                        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                height: '380px',
                                backgroundImage: `url(${product.images[0]})`,
                                backgroundSize: 'cover', backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                            </div>
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <h3 style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>
                                    {product.brand}
                                </h3>
                                <p style={{ fontFamily: 'Montserrat', fontSize: '0.95rem', color: '#333', marginBottom: '12px', height: '2.8em', overflow: 'hidden' }}>
                                    {product.name}
                                </p>
                                <div style={{ fontFamily: 'Montserrat', fontWeight: 'bold', marginBottom: '16px' }}>
                                    ₹{product.price.toLocaleString()}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(product);
                                        removeFromWishlist(product._id); // Optional: remove after adding to bag
                                        alert('Moved to Bag');
                                    }}
                                    style={{
                                        width: '100%', padding: '12px', background: '#1A1A1A', color: 'white',
                                        border: 'none', fontFamily: 'Montserrat', fontWeight: '600', letterSpacing: '1px',
                                        cursor: 'pointer', transition: 'background 0.3s'
                                    }}
                                >
                                    MOVE TO BAG
                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;
