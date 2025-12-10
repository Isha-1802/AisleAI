// const Product = require('../models/Product');

// // Get all products with filtering, sorting, and pagination
// exports.getProducts = async (req, res) => {
//     try {
//         const {
//             category,
//             brand,
//             minPrice,
//             maxPrice,
//             occasion,
//             season,
//             color,
//             search,
//             sort = '-createdAt',
//             page = 1,
//             limit = 20,
//         } = req.query;

//         // Build query
//         const query = {};

//         if (category) query.category = { $regex: new RegExp(`^${category}$`, 'i') };
//         if (brand) query.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
//         if (occasion) query.occasion = { $regex: new RegExp(`^${occasion}$`, 'i') };
//         if (season) query.season = { $regex: new RegExp(`^${season}$`, 'i') };
//         if (color) query.colors = { $in: [new RegExp(`^${color}$`, 'i')] };

//         if (minPrice || maxPrice) {
//             query.price = {};
//             if (minPrice) query.price.$gte = Number(minPrice);
//             if (maxPrice) query.price.$lte = Number(maxPrice);
//         }

//         if (search) {
//             query.$or = [
//                 { name: { $regex: search, $options: 'i' } },
//                 { description: { $regex: search, $options: 'i' } },
//                 { brand: { $regex: search, $options: 'i' } },
//             ];
//         }

//         // Execute query with pagination
//         const products = await Product.find(query)
//             .sort(sort)
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const total = await Product.countDocuments(query);

//         res.json({
//             products,
//             total,
//             page: Number(page),
//             pages: Math.ceil(total / limit),
//         });
//     } catch (error) {
//         console.error('Get products error:', error);
//         res.status(500).json({ error: 'Failed to fetch products' });
//     }
// };

// // Get single product
// exports.getProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);

//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         res.json({ product });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch product' });
//     }
// };

// // Get featured products
// exports.getFeatured = async (req, res) => {
//     try {
//         const products = await Product.find({ featured: true }).limit(12);
//         res.json({ products });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch featured products' });
//     }
// };

// // Get trending products
// exports.getTrending = async (req, res) => {
//     try {
//         const products = await Product.find({ trending: true }).limit(12);
//         res.json({ products });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch trending products' });
//     }
// };

// // Brand comparison
// exports.compareBrands = async (req, res) => {
//     try {
//         const { brands, category, sort = 'price' } = req.query;

//         if (!brands) {
//             return res.status(400).json({ error: 'Brands parameter is required' });
//         }

//         const brandList = brands.split(',');
//         const query = { brand: { $in: brandList } };

//         if (category) query.category = category;

//         const products = await Product.find(query).sort(sort);

//         res.json({ products });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to compare brands' });
//     }
// };

// // Get unique filter values
// exports.getFilters = async (req, res) => {
//     try {
//         const brands = await Product.distinct('brand');
//         const categories = await Product.distinct('category');
//         const occasions = await Product.distinct('occasion');
//         const seasons = await Product.distinct('season');

//         // Get price range
//         const priceRange = await Product.aggregate([
//             {
//                 $group: {
//                     _id: null,
//                     min: { $min: '$price' },
//                     max: { $max: '$price' },
//                 },
//             },
//         ]);

//         res.json({
//             brands: brands.sort(),
//             categories: categories.sort(),
//             occasions: occasions.filter(Boolean).sort(),
//             seasons: seasons.filter(Boolean).sort(),
//             priceRange: priceRange[0] || { min: 0, max: 10000 },
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch filters' });
//     }
// };

// controllers/productController.js
const Product = require('../models/Product');

/**
 * Get all products with optional filtering, sorting, and pagination
 * Query params:
 * - category, brand, minPrice, maxPrice, occasion, season, color, search
 * - sort (default: '-createdAt'), page (default: 1), limit (default: 20)
 */
exports.getProducts = async (req, res) => {
    try {
        const {
            category,
            brand,
            minPrice,
            maxPrice,
            occasion,
            season,
            color,
            search,
            sort = '-createdAt',
            page = 1,
            limit = 20,
        } = req.query;

        const query = {};

        if (category) query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        if (brand) query.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
        if (occasion) query.occasion = { $regex: new RegExp(`^${occasion}$`, 'i') };
        if (season) query.season = { $regex: new RegExp(`^${season}$`, 'i') };
        if (color) query.colors = { $in: [new RegExp(`^${color}$`, 'i')] };

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
            ];
        }

        const products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Product.countDocuments(query);

        res.json({
            products,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

/**
 * Get single product by ID
 */
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ product });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

/**
 * Get featured products (limit 12)
 */
exports.getFeatured = async (req, res) => {
    try {
        const products = await Product.find({ featured: true }).limit(12);
        res.json({ products });
    } catch (error) {
        console.error('Get featured products error:', error);
        res.status(500).json({ error: 'Failed to fetch featured products' });
    }
};

/**
 * Get trending products (limit 12)
 */
exports.getTrending = async (req, res) => {
    try {
        const products = await Product.find({ trending: true }).limit(12);
        res.json({ products });
    } catch (error) {
        console.error('Get trending products error:', error);
        res.status(500).json({ error: 'Failed to fetch trending products' });
    }
};

/**
 * Compare products by brands
 * Query params:
 * - brands (comma-separated)
 * - category (optional)
 * - sort (optional, default: 'price')
 */
exports.compareBrands = async (req, res) => {
    try {
        const { brands, category, sort = 'price' } = req.query;

        if (!brands) {
            return res.status(400).json({ error: 'Brands parameter is required' });
        }

        const brandList = brands.split(',');
        const query = { brand: { $in: brandList } };
        if (category) query.category = category;

        const products = await Product.find(query).sort(sort);

        res.json({ products });
    } catch (error) {
        console.error('Compare brands error:', error);
        res.status(500).json({ error: 'Failed to compare brands' });
    }
};

/**
 * Get unique filter values for front-end filtering
 */
exports.getFilters = async (req, res) => {
    try {
        const brands = await Product.distinct('brand');
        const categories = await Product.distinct('category');
        const occasions = await Product.distinct('occasion');
        const seasons = await Product.distinct('season');

        // Get min/max price
        const priceRange = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    min: { $min: '$price' },
                    max: { $max: '$price' },
                },
            },
        ]);

        res.json({
            brands: brands.sort(),
            categories: categories.sort(),
            occasions: occasions.filter(Boolean).sort(),
            seasons: seasons.filter(Boolean).sort(),
            priceRange: priceRange[0] || { min: 0, max: 10000 },
        });
    } catch (error) {
        console.error('Get filters error:', error);
        res.status(500).json({ error: 'Failed to fetch filters' });
    }
};

