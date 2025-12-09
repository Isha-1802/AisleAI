const User = require('../models/User');
const Product = require('../models/Product');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};

// Update user preferences
exports.updatePreferences = async (req, res) => {
    try {
        const { preferences } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { preferences },
            { new: true }
        ).select('-password');

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update preferences' });
    }
};

// Get favorites
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('favorites');
        res.json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
};

// Add to favorites
exports.addFavorite = async (req, res) => {
    try {
        const { productId } = req.body;

        const user = await User.findById(req.userId);

        if (!user.favorites.includes(productId)) {
            user.favorites.push(productId);
            await user.save();
        }

        res.json({ message: 'Added to favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add favorite' });
    }
};

// Remove from favorites
exports.removeFavorite = async (req, res) => {
    try {
        const { productId } = req.params;

        const user = await User.findById(req.userId);
        user.favorites = user.favorites.filter(id => id.toString() !== productId);
        await user.save();

        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
};

// Get cart
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('cart.product');
        res.json({ cart: user.cart || [] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const user = await User.findById(req.userId);

        // Check if product already in cart
        const existingItem = user.cart.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        res.json({ message: 'Added to cart', cart: user.cart });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ error: 'Failed to add to cart' });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        const user = await User.findById(req.userId);
        const cartItem = user.cart.find(item => item.product.toString() === productId);

        if (cartItem) {
            cartItem.quantity = quantity;
            await user.save();
        }

        res.json({ message: 'Cart updated', cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const user = await User.findById(req.userId);
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save();

        res.json({ message: 'Removed from cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove from cart' });
    }
};

