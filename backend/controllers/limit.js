const User = require('../models/UserModel');

exports.setLimit = async (req, res) => {
    try {
        const userId = req.user._id;  
        const { limit } = req.body;

        if (limit < 0) {
            return res.status(400).json({ message: "Limit must be a positive number" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { limit },
            { new: true }
        );

        res.status(200).json({ message: "Limit updated successfully", limit: user.limit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get limit
exports.getLimit = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select('limit');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ limit: user.limit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


