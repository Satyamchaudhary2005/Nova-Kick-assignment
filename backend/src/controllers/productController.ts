import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      search,
      sortBy,
      minPrice,
      maxPrice,
      page = "1",
      limit = "12",
    } = req.query;

    const query: any = {};

    if (category && category !== "all") {
      query.category = new RegExp(`^${category}$`, "i");
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search as string, "i") },
        { description: new RegExp(search as string, "i") },
        { category: new RegExp(search as string, "i") },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sort: any = { createdAt: -1 };
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

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sort).skip(skip).limit(limitNum),
      Product.countDocuments(query),
    ]);

    res.json({
      products,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

export const getFeaturedProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured products", error });
  }
};

export const getTrendingProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find({ isTrending: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending products", error });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};
