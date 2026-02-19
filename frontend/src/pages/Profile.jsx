import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './StyleHub.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function Profile() {
    const { user, logout: onLogout } = useAuth();


    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Account deleted successfully.');
                onLogout(); // This will clear frontend state and redirect
            } catch (error) {
                console.error('Failed to delete account:', error);
                alert('Failed to delete account. Please try again.');
            }
        }
    };

    if (!user) return null;

    return (
        <div className="style-hub-white" style={{
            paddingTop: '120px',
            paddingBottom: '80px',
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #FDFBF7, #fff)',
            boxSizing: 'border-box',
            overflowX: 'hidden' // Prevent horizontal scroll
        }}>
            <div className="style-hub-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                {/* Profile Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative' }}>
                    <div style={{
                        width: '120px', height: '120px', background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)', color: '#D4AF37',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3.5rem', margin: '0 auto 24px', fontFamily: 'Cormorant Garamond',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '5px solid white',
                        position: 'relative'
                    }}>
                        {user.name.charAt(0).toUpperCase()}
                        {/* Active indicator */}
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            width: '20px',
                            height: '20px',
                            background: '#4CAF50',
                            borderRadius: '50%',
                            border: '3px solid white'
                        }}></div>
                    </div>
                    <h1 className="style-hub-title" style={{ fontSize: '2.8rem', marginBottom: '12px', fontFamily: 'Cormorant Garamond' }}>
                        Bonjour, {user.name}
                    </h1>

                    {/* Email Display */}
                    <p style={{
                        fontSize: '1rem',
                        color: '#666',
                        marginBottom: '8px',
                        fontFamily: 'Montserrat',
                        letterSpacing: '0.5px'
                    }}>
                        {user.email}
                    </p>

                    <p className="style-hub-subtitle" style={{
                        fontSize: '0.85rem',
                        opacity: 0.6,
                        letterSpacing: '2px',
                        marginBottom: '24px'
                    }}>
                        MAISON MEMBER
                    </p>

                    <button onClick={onLogout} className="feature-cta-btn" style={{
                        marginTop: '16px',
                        background: 'transparent',
                        border: '2px solid #1A1A1A',
                        color: '#1A1A1A',
                        padding: '12px 32px',
                        fontSize: '0.75rem',
                        transform: 'none',
                        letterSpacing: '2px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#1A1A1A';
                            e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#1A1A1A';
                        }}>
                        SIGN OUT
                    </button>

                    <div style={{ marginTop: '32px' }}>
                        <button
                            onClick={handleDeleteAccount}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#1A1A1A',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.7rem',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                padding: '8px 16px',
                                transition: 'all 0.4s ease',
                                borderBottom: '1px solid transparent',
                                opacity: 0.8
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#c0392b';
                                e.target.style.letterSpacing = '3px';
                                e.target.style.opacity = '1';
                                e.target.style.borderBottom = '1px solid #c0392b';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#1A1A1A';
                                e.target.style.letterSpacing = '2px';
                                e.target.style.opacity = '0.8';
                                e.target.style.borderBottom = '1px solid transparent';
                            }}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                    width: '100%'
                }}>

                    {/* My Style Profile */}
                    <div className="style-feature-card" style={{
                        padding: '40px', background: 'linear-gradient(135deg, #FDFBF7 0%, #FFF 100%)', borderRadius: '0',
                        border: '1px solid #E0D8C3', boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        display: 'flex', flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative corner */}
                        <div style={{
                            position: 'absolute', top: 0, right: 0,
                            width: '100px', height: '100px',
                            background: 'linear-gradient(135deg, #D4AF37 0%, transparent 100%)',
                            opacity: 0.1
                        }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', position: 'relative' }}>
                            <h3 className="feature-title" style={{ color: '#1A1A1A', margin: 0, fontSize: '1.6rem', fontFamily: 'Cormorant Garamond' }}>Style Identity</h3>
                            <span style={{ fontSize: '1.5rem' }}>✨</span>
                        </div>

                        {/* Empty State - No Quiz Taken */}
                        <div style={{
                            textAlign: 'center',
                            padding: '40px 20px',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '24px',
                                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)'
                            }}>
                                <span style={{ fontSize: '2rem' }}>🎨</span>
                            </div>
                            <p style={{
                                marginBottom: '16px',
                                fontStyle: 'italic',
                                color: '#666',
                                fontSize: '1rem',
                                fontFamily: 'Cormorant Garamond',
                                lineHeight: 1.6
                            }}>
                                Discover your unique style profile
                            </p>
                            <p style={{
                                color: '#999',
                                fontSize: '0.85rem',
                                marginBottom: '32px',
                                maxWidth: '300px',
                                lineHeight: 1.5
                            }}>
                                Take our personalized quiz to unlock AI-powered recommendations tailored to your body shape, color season, and aesthetic preferences.
                            </p>
                            <Link to="/style-hub" style={{
                                display: 'inline-block',
                                background: '#1A1A1A',
                                color: 'white',
                                padding: '14px 32px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '0.75rem',
                                letterSpacing: '2px',
                                transition: 'all 0.3s ease',
                                border: '2px solid #1A1A1A'
                            }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.color = '#1A1A1A';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#1A1A1A';
                                    e.target.style.color = 'white';
                                }}>
                                BEGIN STYLE QUIZ
                            </Link>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="style-feature-card" style={{
                        padding: '32px', background: '#1A1A1A', color: 'white', borderRadius: '0',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        transition: 'transform 0.3s ease',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 className="feature-title" style={{ color: 'white', margin: 0, fontSize: '1.4rem' }}>Orders</h3>
                            <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>📦</span>
                        </div>

                        <div style={{ textAlign: 'center', padding: '24px 0', color: '#666', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ marginBottom: '24px', fontStyle: 'italic', color: '#999', fontSize: '0.9rem' }}>No active orders found.</p>
                            <Link to="/collections" className="feature-cta-btn" style={{
                                width: '100%', textAlign: 'center', background: 'white', color: '#1A1A1A',
                                padding: '12px', borderRadius: '0', fontSize: '0.75rem', transform: 'none',
                                letterSpacing: '2px', fontWeight: '600'
                            }}>
                                EXPLORE COLLECTIONS
                            </Link>
                        </div>
                    </div>

                    {/* Wishlist Preview */}
                    <div className="style-feature-card" style={{
                        padding: '32px', background: 'white', borderRadius: '0',
                        border: '1px solid #f0f0f0', boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
                        transition: 'transform 0.3s ease',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 className="feature-title" style={{ color: '#1A1A1A', margin: 0, fontSize: '1.4rem' }}>Wishlist</h3>
                            <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>♡</span>
                        </div>

                        <div style={{ textAlign: 'center', padding: '24px 0', color: '#999', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ marginBottom: '24px', fontStyle: 'italic', fontSize: '0.9rem' }}>Your curated list is empty.</p>
                            <Link to="/collections" style={{
                                color: '#1A1A1A', textDecoration: 'none', fontWeight: '500',
                                fontSize: '0.75rem', letterSpacing: '2px',
                                borderBottom: '1px solid #1A1A1A', paddingBottom: '4px', alignSelf: 'center'
                            }}>
                                BROWSE CATALOG
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;


