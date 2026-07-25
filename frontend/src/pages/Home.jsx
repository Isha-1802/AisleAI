import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import toast from 'react-hot-toast';
import { collections, offers, occasions, brands, testimonials } from '../data/homeData';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';

import './Home.css';

const heroStats = [
    { end: 1000, suffix: '+', label: 'Curated Pieces' },
    { end: 50, suffix: '+', label: 'Luxury Brands' },
    { static: '24/7', label: 'Personal Styling' },
];

const tiltProps = {
    tiltMaxAngleX: 7,
    tiltMaxAngleY: 7,
    scale: 1.03,
    transitionSpeed: 1600,
    glareEnable: true,
    glareMaxOpacity: 0.12,
    glareColor: '#ffffff',
    glarePosition: 'all',
    glareBorderRadius: '4px',
};

function Home() {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.elements.newsletter.value.trim();
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        toast.success('Welcome to the Maison. Check your inbox ✦');
        e.target.reset();
    };

    return (
        <div className="home-white">
            {/* Hero Section - Luxury Black */}
            <section className="hero-luxury-black">
                <motion.div
                    className="hero-content-luxury"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="luxury-line"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    ></motion.div>

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
                </motion.div>
            </section>

            {/* Animated Stats Band */}
            <section className="stats-band">
                <div className="container-white">
                    <div className="stats-row">
                        {heroStats.map((stat, index) => (
                            <Reveal key={stat.label} delay={index * 0.12} className="stat-item">
                                <span className="stat-number">
                                    {stat.static
                                        ? stat.static
                                        : <Counter end={stat.end} suffix={stat.suffix} />}
                                </span>
                                <span className="stat-label">{stat.label}</span>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collections Section - WHITE BG */}
            <section className="section-white">
                <div className="container-white">
                    <Reveal className="section-header">
                        <h2 className="section-title-dark">Collections</h2>
                        <p className="section-subtitle-dark">Discover our curated selection of luxury fashion</p>
                    </Reveal>

                    <div className="collections-grid-white">
                        {collections.map((collection, index) => (
                            <Reveal key={collection.name} delay={(index % 5) * 0.06}>
                                <Link
                                    to={`/collections?category=${collection.name}`}
                                    className="collection-card-white"
                                >
                                    <Tilt {...tiltProps} className="collection-image-white">
                                        <img src={collection.image} alt={collection.name} />
                                        <div className="collection-overlay-white">
                                            <h3>{collection.name}</h3>
                                        </div>
                                    </Tilt>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exclusive Offers Section - WHITE BG */}
            <section className="section-white section-bg-light">
                <div className="container-white">
                    <Reveal className="section-header">
                        <h2 className="section-title-dark">Exclusive Offers</h2>
                        <p className="section-subtitle-dark">Limited time deals on premium collections</p>
                    </Reveal>

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
                    <Reveal className="section-header">
                        <h2 className="section-title-dark">Occasions</h2>
                        <p className="section-subtitle-dark">Perfect outfits for every moment</p>
                    </Reveal>

                    <div className="occasions-grid-white">
                        {occasions.map((occasion, index) => (
                            <Reveal key={occasion.name} delay={(index % 4) * 0.06}>
                                <Link
                                    to={`/collections?occasion=${occasion.search}`}
                                    className="occasion-card-white"
                                >
                                    <Tilt {...tiltProps} className="occasion-image-white">
                                        <img src={occasion.image} alt={occasion.name} />
                                        <div className="occasion-overlay-white">
                                            <h3>{occasion.name}</h3>
                                        </div>
                                    </Tilt>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Maisons (Brands) Section - WHITE BG */}
            <section className="section-white section-bg-light">
                <div className="container-white">
                    <Reveal className="section-header">
                        <h2 className="section-title-dark">Maisons</h2>
                        <p className="section-subtitle-dark">The world's most prestigious fashion houses</p>
                    </Reveal>

                    <div className="brands-grid">
                        {brands.slice(0, 12).map((brand, index) => (
                            <Reveal key={index} delay={(index % 6) * 0.05}>
                                <Link
                                    to={`/collections?brand=${brand}`}
                                    className="brand-item"
                                >
                                    {brand}
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section - PARALLAX BACKGROUND */}
            <section className="section-white testimonials-parallax">
                <div className="container-white">
                    <Reveal className="section-header">
                        <h2 className="section-title-dark">Testimonials</h2>
                        <p className="section-subtitle-dark">What our clients say about AisleAI</p>
                    </Reveal>

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
                    <Reveal className="section-header">
                        <h2 className="section-title-dark">The Atelier</h2>
                        <p className="section-subtitle-dark">Our commitment to excellence and sustainability</p>
                    </Reveal>

                    <div className="philosophy-grid">
                        {[
                            { icon: '✦', title: 'Artisan Craftsmanship', text: 'Every piece is selected for its exceptional quality and attention to detail, honoring traditional techniques.' },
                            { icon: '∞', title: 'Timeless Design', text: 'We believe in style that transcends seasons, offering wardrobe staples that last a lifetime.' },
                            { icon: '🌿', title: 'Sustainable Future', text: 'Committed to reducing our environmental footprint through conscious sourcing and ethical practices.' },
                        ].map((item, index) => (
                            <Reveal key={item.title} delay={index * 0.12}>
                                <div className="philosophy-card">
                                    <span className="philosophy-icon">{item.icon}</span>
                                    <h3 className="philosophy-title">{item.title}</h3>
                                    <p className="philosophy-text">{item.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stay Informed - PARALLAX BROWNISH */}
            <section className="section-parallax-brown">
                <div className="container-white">
                    <Reveal>
                        <h2 className="section-title-dark" style={{ color: 'white' }}>Stay Informed</h2>
                        <p className="section-subtitle-dark" style={{ color: 'rgba(255,255,255,0.9)' }}>Subscribe to receive updates on new arrivals, special offers, and style inspiration</p>

                        <form className="newsletter-input-group" onSubmit={handleSubscribe}>
                            <input type="email" name="newsletter" placeholder="Enter your email address" className="newsletter-input" />
                            <button type="submit" className="newsletter-btn">SUBSCRIBE</button>
                        </form>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}

export default Home;
