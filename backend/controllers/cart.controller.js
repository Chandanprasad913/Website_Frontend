import userModel from "../models/user.model.js";

//* Add product to user cart
export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        if (!userId || !itemId || !size) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        // Add or increment item
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        // Save updated cart
        userData.cartData = cartData;
        userData.markModified("cartData");
        await userData.save();

        res.json({ success: true, message: "Product added to cart" });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//* Update user cart (including delete if quantity is 0)
export const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        if (!userId || !itemId || !size || typeof quantity !== "number") {
            return res.status(400).json({ success: false, message: "Missing or invalid fields" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (quantity <= 0) {
            // Remove the size
            delete cartData[itemId][size];
            // If the item has no sizes left, remove the item
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }

        userData.cartData = cartData;
        userData.markModified("cartData");
        await userData.save();

        res.json({ success: true, message: "Cart updated successfully", cartData });

    } catch (error) {
        console.error("Error in updateCart:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//* Get user cart data
export const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const userData = await userModel.findById(userId).lean();
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error("Error in getUserCart:", error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
};
