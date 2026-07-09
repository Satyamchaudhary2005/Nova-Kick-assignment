"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get("/", productController_1.getProducts);
router.get("/featured", productController_1.getFeaturedProducts);
router.get("/trending", productController_1.getTrendingProducts);
router.get("/categories", productController_1.getCategories);
router.get("/:id", productController_1.getProductById);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map