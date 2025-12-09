import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { megaMenuData } from '../data/megaMenuData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Header.css';

function Header({ user, onLogout }) {
    const { getCartCount } = useCart();
    const { wishlist } = useWishlist();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleLogoClick = (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            setMobileMenuOpen(!mobileMenuOpen);
        }
    };

    const handleUserEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowUserMenu(true);
    };

    const handleUserLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowUserMenu(false);
        }, 500); // 500ms delay
    };

    return (
        <header className="header-luxury">
            <div className="header-container-luxury">
                {/* Luxury Logo */}
                <Link to="/" className="logo-luxury" onClick={handleLogoClick}>
                    <div className="logo-monogram-container">
                        <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
                            <defs>
                                <linearGradient id="elegantBrown" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#5D4037', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#8D6E63', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>

                            {/* First A - slightly transparent */}
                            <g opacity="0.75">
                                <path d="M 30 75 L 42 30 L 54 75"
                                    stroke="url(#elegantBrown)"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none" />
                                <path d="M 35 58 L 49 58"
                                    stroke="url(#elegantBrown)"
                                    strokeWidth="2"
                                    strokeLinecap="round" />
                            </g>

                            {/* Second A - overlapping, creates merged effect */}
                            <g opacity="0.95">
                                <path d="M 46 75 L 58 30 L 70 75"
                                    stroke="url(#elegantBrown)"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none" />
                                <path d="M 51 58 L 65 58"
                                    stroke="url(#elegantBrown)"
                                    strokeWidth="2"
                                    strokeLinecap="round" />
                            </g>

                            {/* Subtle connecting element where they merge */}
                            <line x1="48" y1="50" x2="52" y2="50"
                                stroke="url(#elegantBrown)"
                                strokeWidth="1.5"
                                opacity="0.4" />
                        </svg>
                    </div>
                    <div className="logo-text-luxury">
                        <span className="logo-brand">AISLEAI</span>
                        <span className="logo-tagline">MAISON DE MODE</span>
                    </div>
                </Link>

                {/* Center Navigation (Desktop) */}
                <nav className="nav-luxury desktop-nav">
                    <Link to="/" className="nav-item-luxury">HOME</Link>

                    {/* Collections with Mega Menu */}
                    <div
                        className="nav-dropdown-luxury"
                        onMouseEnter={() => setShowMegaMenu(true)}
                        onMouseLeave={() => setShowMegaMenu(false)}
                    >
                        <span className="nav-item-luxury">
                            COLLECTIONS
                        </span>

                        {showMegaMenu && (
                            <div className="mega-menu-luxury">
                                <div className="mega-menu-inner">
                                    {megaMenuData.columns.map((column, index) => (
                                        <div key={index} className={`mega-col ${column.highlight ? 'mega-col-highlight' : ''}`}>
                                            <h4 className="mega-title">{column.title}</h4>
                                            <ul className="mega-list">
                                                {column.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        <Link to={item.link} className="mega-link">
                                                            {item.name}
                                                            {item.badge && <span className="mega-tag">{item.badge}</span>}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to="/style-hub" className="nav-item-luxury">ATELIER</Link>
                    <Link to="/ai-stylist" className="nav-item-luxury">STYLIST</Link>
                </nav>

                {/* Right Side (Desktop) */}
                <div className="header-actions-luxury desktop-actions">
                    <Link
                        to="/wishlist"
                        className="icon-luxury"
                        title="Wishlist"
                        aria-label="Wishlist"
                        style={{ position: 'relative' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {wishlist.length > 0 && (
                            <span className="cart-badge" style={{
                                position: 'absolute',
                                top: '-2px',
                                right: '-2px',
                                background: '#ff3f6c',
                                color: 'white',
                                fontSize: '9px',
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '600'
                            }}>
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/cart"
                        className="icon-luxury"
                        title="Shopping"
                        aria-label="Cart"
                        style={{ position: 'relative' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {getCartCount() > 0 && (
                            <span className="cart-badge" style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                background: '#1A1A1A',
                                color: 'white',
                                fontSize: '10px',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '600'
                            }}>
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div
                            className="user-menu-luxury"
                            onMouseEnter={handleUserEnter}
                            onMouseLeave={handleUserLeave}
                        >
                            <button
                                className="icon-luxury"
                                aria-label="Account"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </button>

                            {showUserMenu && (
                                <div className="user-dropdown-luxury">
                                    <div className="user-info-luxury">
                                        <p className="user-name-luxury">{user.name}</p>
                                        <p className="user-email-luxury">{user.email}</p>
                                    </div>
                                    <Link to="/profile" className="user-menu-item">
                                        Open Profile
                                    </Link>
                                    <button onClick={onLogout} className="logout-btn-luxury">
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="icon-luxury">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-content">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
                        <Link to="/collections" onClick={() => setMobileMenuOpen(false)}>COLLECTIONS</Link>
                        <Link to="/style-hub" onClick={() => setMobileMenuOpen(false)}>ATELIER</Link>
                        <Link to="/ai-stylist" onClick={() => setMobileMenuOpen(false)}>STYLIST</Link>
                        <div className="mobile-divider"></div>
                        <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>WISHLIST</Link>
                        <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>CART</Link>
                        <div className="mobile-divider"></div>
                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>PROFILE</Link>
                                <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="mobile-logout">SIGN OUT</button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>LOGIN / SIGNUP</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
