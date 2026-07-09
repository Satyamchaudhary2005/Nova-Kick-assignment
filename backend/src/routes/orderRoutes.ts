import { Router } from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;
