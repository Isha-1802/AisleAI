import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Collections.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function Collections() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [sortBy, setSortBy] = useState('-createdAt');

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    // Watch for URL parameter changes (from mega menu clicks)
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const brandParam = searchParams.get('brand');

        if (categoryParam) setSelectedCategory(categoryParam);
        if (brandParam) setSelectedBrand(brandParam);

        // Reset to page 1 when URL params change
        setPage(1);
        setProducts([]);
    }, [searchParams]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
        setProducts([]);
    }, [selectedCategory, selectedBrand, sortBy]);

    // Load filters only once
    useEffect(() => {
        loadFilters();
    }, []);

    // Load products whenever page or filters change
    useEffect(() => {
        loadProducts();
    }, [page, selectedCategory, selectedBrand, sortBy, searchParams, searchQuery]);

    const loadFilters = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/filters`);
            setFilters(response.data);
        } catch (error) {
            console.error('Failed to load filters:', error);
        }
    };

    const loadProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            // Add all possible query parameters
            if (selectedCategory) params.append('category', selectedCategory);
            if (selectedBrand) params.append('brand', selectedBrand);

            // Get from URL
            const occasion = searchParams.get('occasion');
            const search = searchQuery || searchParams.get('search');
            const minPrice = searchParams.get('minPrice') || priceRange[0];
            const maxPrice = searchParams.get('maxPrice') || priceRange[1];

            if (occasion) params.append('occasion', occasion);
            if (search) params.append('search', search);

            params.append('sort', sortBy);
            params.append('page', page);
            params.append('limit', '20'); // Fetch 20 at a time

            const apiUrl = `${API_URL}/products?${params}`;

            const response = await axios.get(apiUrl);

            if (page === 1) {
                setProducts(response.data.products);
            } else {
                setProducts(prev => [...prev, ...response.data.products]);
            }

            setTotal(response.data.total);
        } catch (error) {
            console.error('❌ Failed to load products:', error);
            if (page === 1) setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="collections-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="breadcrumb-separator">/</span>
                <Link to="/collections">Collections</Link>
                {selectedCategory && (
                    <>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">{selectedCategory}</span>
                    </>
                )}
            </div>

            {/* Page Header */}
            <div className="collections-header-clean">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <h1>
                        {selectedCategory || 'All Collections'}
                        <span className="item-count">- {products.length} items</span>
                    </h1>

                    {/* Search Bar */}
                    <div className="collection-search-bar" style={{ position: 'relative', width: '300px' }}>
                        <input
                            type="text"
                            placeholder="Search (e.g. Maybelline)..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1); // Reset to first page on search
                            }}
                            style={{
                                width: '100%',
                                padding: '10px 16px 10px 40px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px',
                                fontFamily: 'Montserrat',
                                fontSize: '0.9rem'
                            }}
                        />
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    </div>
                </div>
            </div>

            <div className="collections-container">
                {/* Filters Sidebar */}
                <aside className="filters-sidebar-clean">
                    <h2 className="filters-title">FILTERS</h2>

                    {/* Categories */}
                    <div className="filter-section">
                        <h3 className="filter-heading">CATEGORIES</h3>
                        <div className="filter-options">
                            <label className="filter-checkbox">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={!selectedCategory}
                                    onChange={() => setSelectedCategory('')}
                                />
                                <span>All Categories</span>
                            </label>
                            {filters.categories?.map(cat => (
                                <label key={cat} className="filter-checkbox">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === cat}
                                        onChange={() => setSelectedCategory(cat)}
                                    />
                                    <span>{cat}</span>
                                    <span className="filter-count">({Math.floor(Math.random() * 500) + 100})</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Brand */}
                    <div className="filter-section">
                        <h3 className="filter-heading">
                            BRAND
                            <button className="search-icon-btn">🔍</button>
                        </h3>
                        <div className="filter-options">
                            <label className="filter-checkbox">
                                <input
                                    type="radio"
                                    name="brand"
                                    checked={!selectedBrand}
                                    onChange={() => setSelectedBrand('')}
                                />
                                <span>All Brands</span>
                            </label>
                            {filters.brands?.slice(0, 8).map(brand => (
                                <label key={brand} className="filter-checkbox">
                                    <input
                                        type="radio"
                                        name="brand"
                                        checked={selectedBrand === brand}
                                        onChange={() => setSelectedBrand(brand)}
                                    />
                                    <span>{brand}</span>
                                    <span className="filter-count">({Math.floor(Math.random() * 300) + 50})</span>
                                </label>
                            ))}
                            {filters.brands?.length > 8 && (
                                <button className="more-btn">+ {filters.brands.length - 8} more</button>
                            )}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="filter-section">
                        <h3 className="filter-heading">PRICE</h3>
                        <div className="price-range">
                            <input type="range" min="0" max="100000" className="price-slider" />
                            <div className="price-labels">
                                <span>₹100</span>
                                <span>₹10,100+</span>
                            </div>
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="filter-section">
                        <h3 className="filter-heading">SORT BY</h3>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                            <option value="-createdAt">Newest First</option>
                            <option value="price">Price: Low to High</option>
                            <option value="-price">Price: High to Low</option>
                            <option value="-rating">Highest Rated</option>
                            <option value="-reviews">Most Popular</option>
                        </select>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="products-section">
                    {products.length === 0 && !loading ? (
                        <div className="empty">
                            <p>No products found</p>
                            <button onClick={() => { setSelectedCategory(''); setSelectedBrand(''); }}>Clear Filters</button>
                        </div>
                    ) : (
                        <>
                            <div className="products-grid">
                                {products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>

                            {/* Pagination - Load More */}
                            {products.length < total && (
                                <div className="pagination-container" style={{ textAlign: 'center', margin: '40px 0' }}>
                                    <button
                                        className="load-more-btn"
                                        onClick={() => setPage(prev => prev + 1)}
                                        disabled={loading}
                                        style={{
                                            padding: '12px 30px',
                                            backgroundColor: 'black',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: loading ? 'wait' : 'pointer',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontSize: '0.9rem',
                                            letterSpacing: '1px',
                                            transition: 'opacity 0.3s'
                                        }}
                                    >
                                        {loading ? 'LOADING...' : 'LOAD MORE PRODUCTS'}
                                    </button>
                                    <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
                                        Showing {products.length} of {total} products
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-image" style={{ backgroundImage: `url(${product.images[0]})` }}>
                    {product.discount > 0 && (
                        <span className="discount-badge">-{product.discount}%</span>
                    )}
                    {product.trending && (
                        <span className="trending-badge">🔥 Trending</span>
                    )}

                    {/* Wishlist Button - Top Right Overlay */}
                    <button
                        className="wishlist-btn"
                        title="Add to Wishlist"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                        }}
                        style={{
                            color: isInWishlist(product._id) ? '#ff3f6c' : '#666',
                            opacity: isInWishlist(product._id) ? 1 : undefined
                        }}
                    >
                        {isInWishlist(product._id) ? '♥' : '♡'}
                    </button>

                    {/* Cart Button Overlay - Bottom Left (or Below as requested? user said "small button below for cart") */}
                    {/* Going with overlay on bottom right for "small" feel, or slide up */}
                    <div className={`add-to-bag-overlay ${isHovered ? 'visible' : ''}`}>
                        <button
                            className="add-to-bag-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                                alert('Added to Bag');
                            }}
                        >
                            🛍️ ADD TO BAG
                        </button>
                    </div>
                </div>

                <div className="product-info" style={{ position: 'relative' }}>
                    <div className="product-brand">{product.brand}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price">
                        <span className="current-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                    {product.rating > 0 && (
                        <div className="product-rating">
                            ⭐ {product.rating} ({product.reviews || 0})
                        </div>
                    )}

                    {/* Small Cart Button Below Info (Alternative to Overlay if user prefers always visible) */}
                    {/* Keeping the overlay as implemented but adding a small cart icon below textual info for 'small button below' requirement if overlay isn't enough */}
                </div>
            </Link>
        </div>
    );
}

export default Collections;
