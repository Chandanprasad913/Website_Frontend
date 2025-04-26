import { v2 as cloudinary } from "cloudinary"

import productModel from "../models/product.model.js";

//* Function for creating a new product

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Check if required fields are present
        if (!name || !description || !price || !category || !subCategory) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, description, price, category, subCategory"
            });
        }

        // Safely access images
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (image) => {
                    let result = await cloudinary.uploader.upload(image.path, {
                        resource_type: "image",
                    });
                    return result.secure_url;
                })
            );
        }

        // Safely parse sizes
        let parsedSizes;
        try {
            parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid sizes format. Must be a valid JSON array."
            });
        }

        const isBestseller = bestseller === "true" || bestseller === true;

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: isBestseller,
            images: imagesUrl,
            date: Date.now(),
        };

        const product = new productModel(productData);
        await product.save();

        return res.json({
            success: true,
            message: "Product added successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


//* Function for List product

export const listProduct = async (req, res) => {
    try {

        const products = await productModel.find({})
        return res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//* Function for Removing product

export const removeProduct = async (req, res) => {
    try {
        // Use req.params.id if available, otherwise fallback to req.body.id
        const id = req.params.id || req.body.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product removed successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



//* Function for single product info

export const singleProduct = async (req, res) => {
    try {
        // Use req.params.id if available, otherwise fallback to req.body.productId
        const id = req.params.id || req.body.productId;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({ success: true, product });
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
