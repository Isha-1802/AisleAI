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
        console.log('Update Request - Preferences:', JSON.stringify(preferences, null, 2));

        const updateFields = {};

        // Use dot notation to update nested fields without overwriting siblings
        if (preferences && preferences.colorAnalysis) {
            updateFields['preferences.colorAnalysis'] = preferences.colorAnalysis;
        }
        if (preferences && preferences.bodyShape) {
            updateFields['preferences.bodyShape'] = preferences.bodyShape;
        }
        // Handle other fields similarly
        if (preferences && preferences.style) updateFields['preferences.style'] = preferences.style;
        if (preferences && preferences.favoriteColors) updateFields['preferences.favoriteColors'] = preferences.favoriteColors;
        if (preferences && preferences.sizes) updateFields['preferences.sizes'] = preferences.sizes;

        console.log('Update Fields:', updateFields);

        // Atomic update
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Updated User in DB:', JSON.stringify(user, null, 2));

        res.json({ user });
    } catch (error) {
        console.error('Update preferences error:', error);
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
