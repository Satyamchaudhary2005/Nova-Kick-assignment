"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.getTrendingProducts = exports.getFeaturedProducts = exports.getProductById = exports.getProducts = void 0;
const Product_1 = require("../models/Product");
const getProducts = async (req, res) => {
    try {
        const { category, search, sortBy, minPrice, maxPrice, page = "1", limit = "12", } = req.query;
        const query = {};
        if (category && category !== "all") {
            query.category = new RegExp(`^${category}$`, "i");
        }
        if (search) {
            query.$or = [
                { name: new RegExp(search, "i") },
                { description: new RegExp(search, "i") },
                { category: new RegExp(search, "i") },
            ];
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        let sort = { createdAt: -1 };
        switch (sortBy) {
            case "price-asc":
                sort = { price: 1 };
                break;
            case "price-desc":
                sort = { price: -1 };
                break;
            case "rating":
                sort = { rating: -1 };
                break;
            case "name-asc":
                sort = { name: 1 };
                break;
            case "name-desc":
                sort = { name: -1 };
                break;
        }
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const [products, total] = await Promise.all([
            Product_1.Product.find(query).sort(sort).skip(skip).limit(limitNum),
            Product_1.Product.countDocuments(query),
        ]);
        res.json({
            products,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const product = await Product_1.Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};
exports.getProductById = getProductById;
const getFeaturedProducts = async (_req, res) => {
    try {
        const products = await Product_1.Product.find({ isFeatured: true }).limit(8);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching featured products", error });
    }
};
exports.getFeaturedProducts = getFeaturedProducts;
const getTrendingProducts = async (_req, res) => {
    try {
        const products = await Product_1.Product.find({ isTrending: true }).limit(8);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching trending products", error });
    }
};
exports.getTrendingProducts = getTrendingProducts;
const getCategories = async (_req, res) => {
    try {
        const categories = await Product_1.Product.distinct("category");
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=productController.js.map