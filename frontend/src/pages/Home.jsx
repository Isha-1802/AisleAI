import { Link } from 'react-router-dom';
import { collections, offers, occasions, brands, testimonials, stats } from '../data/homeData';

import './Home.css';

function Home() {
    return (
        <div className="home-white">
            {/* Hero Section - Luxury Black */}
            <section className="hero-luxury-black">
                <div className="hero-content-luxury">
                    <div className="luxury-line"></div>

                    <p className="hero-pretitle">WHERE TIMELESS STYLE MEETS MODERN INNOVATION</p>

                    <h1 className="hero-title-luxury">
                        THE ART OF
                        <br />
                        <span className="hero-emphasis">ELEGANCE</span>
                    </h1>

                    <p className="hero-description-luxury">
                        Curated collections for the discerning individual.
                        <br />
                        Experience the perfect fusion of artificial intelligence and haute couture,
                        <br />
                        designed to elevate your personal aesthetic.
                    </p>

                    <div className="hero-ctas-luxury">
                        <Link to="/collections" className="btn-luxury-primary">
                            DISCOVER COLLECTION
                        </Link>
                        <Link to="/ai-stylist" className="btn-luxury-secondary">
                            PERSONAL STYLIST
                        </Link>
                    </div>
                </div>
            </section>

            {/* Collections Section - WHITE BG */}
            <section className="section-white">
                <div className="container-white">
                    <div className="section-header">
                        <h2 className="section-title-dark">Collections</h2>
                        <p className="section-subtitle-dark">Discover our curated selection of luxury fashion</p>
                    </div>

                    <div className="collections-grid-white">
                        {collections.map((collection) => (
                            <Link
                                key={collection.name}
                                to={`/collections?category=${collection.name}`}
                                className="collection-card-white"
                            >
                                <div className="collection-image-white">
                                    <img src={collection.image} alt={collection.name} />
                                    <div className="collection-overlay-white">
                                        <h3>{collection.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exclusive Offers Section - WHITE BG */}
            <section className="section-white section-bg-light">
                <div className="container-white">
                    <div className="section-header">
                        <h2 className="section-title-dark">Exclusive Offers</h2>
                        <p className="section-subtitle-dark">Limited time deals on premium collections</p>
                    </div>

                    <div className="offers-scroll-container">
                        <div className="offers-grid">
                            {offers.map((offer, index) => (
                                <Link
                                    key={index}
                                    to={offer.link}
                                    className="offer-card"
                                    style={{ backgroundImage: `url(${offer.image})` }}
                                >
                                    <div className="offer-overlay"></div>
                                    <div className="offer-content">
                                        <h3 className="offer-title">{offer.title}</h3>
                                        <p className="offer-subtitle">{offer.subtitle}</p>
                                        <p className="offer-description">{offer.description}</p>
                                        <span className="offer-cta">SHOP NOW →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Occasions Section - WHITE BG */}
            <section className="section-white">
                <div className="container-white">
                    <div className="section-header">
                        <h2 className="section-title-dark">Occasions</h2>
                        <p className="section-subtitle-dark">Perfect outfits for every moment</p>
                    </div>

                    <div className="occasions-grid-white">
                        {occasions.map((occasion) => (
                            <Link
                                key={occasion.name}
                                to={`/collections?occasion=${occasion.search}`}
                                className="occasion-card-white"
                            >
                                <div className="occasion-image-white">
                                    <img src={occasion.image} alt={occasion.name} />
                                    <div className="occasion-overlay-white">
                                        <h3>{occasion.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Maisons (Brands) Section - WHITE BG */}
            <section className="section-white section-bg-light">
                <div className="container-white">
                    <div className="section-header">
                        <h2 className="section-title-dark">Maisons</h2>
                        <p className="section-subtitle-dark">The world's most prestigious fashion houses</p>
                    </div>

                    <div className="brands-grid">
                        {brands.slice(0, 12).map((brand, index) => (
                            <Link
                                key={index}
                                to={`/collections?brand=${brand}`}
                                className="brand-item"
                            >
                                {brand}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section - PARALLAX BACKGROUND */}
            <section className="section-white testimonials-parallax">
                <div className="container-white">
                    <div className="section-header">
                        <h2 className="section-title-dark">Testimonials</h2>
                        <p className="section-subtitle-dark">What our clients say about AisleAI</p>
                    </div>

                    <div className="testimonials-container">
                        <div className="testimonials-scroll">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="testimonial-card">
                                    <div className="testimonial-stars">
                                        {'★'.repeat(testimonial.rating)}
                                    </div>
                                    <p className="testimonial-review">"{testimonial.review}"</p>
                                    <div className="testimonial-author">
                                        <p className="author-name">{testimonial.name}</p>
                                        <p className="author-role">{testimonial.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section - NEW CONTENT */}
            <section className="philosophy-section">
                <div className="container-white">
                    <div className="section-header">
                        <h2 className="section-title-dark">The Atelier</h2>
                        <p className="section-subtitle-dark">Our commitment to excellence and sustainability</p>
                    </div>

                    <div className="philosophy-grid">
                        <div className="philosophy-card">
                            <span className="philosophy-icon">✦</span>
                            <h3 className="philosophy-title">Artisan Craftsmanship</h3>
                            <p className="philosophy-text">Every piece is selected for its exceptional quality and attention to detail, honoring traditional techniques.</p>
                        </div>
                        <div className="philosophy-card">
                            <span className="philosophy-icon">∞</span>
                            <h3 className="philosophy-title">Timeless Design</h3>
                            <p className="philosophy-text">We believe in style that transcends seasons, offering wardrobe staples that last a lifetime.</p>
                        </div>
                        <div className="philosophy-card">
                            <span className="philosophy-icon">🌿</span>
                            <h3 className="philosophy-title">Sustainable Future</h3>
                            <p className="philosophy-text">Committed to reducing our environmental footprint through conscious sourcing and ethical practices.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stay Informed - PARALLAX BROWNISH */}
            <section className="section-parallax-brown">
                <div className="container-white">
                    <h2 className="section-title-dark" style={{ color: 'white' }}>Stay Informed</h2>
                    <p className="section-subtitle-dark" style={{ color: 'rgba(255,255,255,0.9)' }}>Subscribe to receive updates on new arrivals, special offers, and style inspiration</p>

                    <div className="newsletter-input-group">
                        <input type="email" placeholder="Enter your email address" className="newsletter-input" />
                        <button className="newsletter-btn">SUBSCRIBE</button>
                    </div>
                </div>
            </section>

            {/* Footer */}

        </div>
    );
}

export default Home;
