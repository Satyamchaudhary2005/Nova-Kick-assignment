import { Router } from "express";
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getTrendingProducts,
  getCategories,
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/trending", getTrendingProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

export default router;
