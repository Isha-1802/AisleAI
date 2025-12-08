import { Link } from 'react-router-dom';
import './StyleHub.css'; // Reuse elegant styles

function Wishlist() {
    return (
        <div className="style-hub-white" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.8 }}>♡</div>
            <h1 className="style-hub-title" style={{ fontSize: '3rem' }}>Your Wishlist</h1>
            <p className="style-hub-subtitle" style={{ marginBottom: '40px' }}>Your curated collection of favorites is currently empty.</p>
            <Link to="/collections" className="feature-cta-btn" style={{ background: '#1A1A1A', color: 'white', opacity: 1, transform: 'none', padding: '16px 32px' }}>
                Explore Collections
            </Link>
        </div>
    );
}

export default Wishlist;
