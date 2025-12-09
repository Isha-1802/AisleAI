import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Newsletter Section */}


                {/* Footer Links */}
                <div className="footer-grid">
                    <div className="footer-column">
                        <h4>ABOUT AISLEAI</h4>
                        <ul>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/press">Press</Link></li>
                            <li><Link to="/sustainability">Sustainability</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>CUSTOMER CARE</h4>
                        <ul>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/shipping">Shipping Info</Link></li>
                            <li><Link to="/returns">Returns & Exchanges</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/size-guide">Size Guide</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>QUICK LINKS</h4>
                        <ul>
                            <li><Link to="/collections">Shop All</Link></li>
                            <li><Link to="/style-hub">Style Hub</Link></li>

                            <li><Link to="/ai-stylist">AI Stylist</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>CONNECT</h4>
                        <ul>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p>&copy; 2024 AisleAI. All rights reserved.</p>
                    </div>
                    <div className="footer-bottom-right">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
