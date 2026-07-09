"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const Order_1 = require("../models/Order");
const createOrder = async (req, res) => {
    try {
        const order = new Order_1.Order(req.body);
        const saved = await order.save();
        res.status(201).json(saved);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const { email } = req.query;
        const query = {};
        if (email)
            query["shippingInfo.email"] = email;
        const orders = await Order_1.Order.find(query).sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await Order_1.Order.findOne({ id: req.params.id });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
};
exports.getOrderById = getOrderById;
//# sourceMappingURL=orderController.js.map