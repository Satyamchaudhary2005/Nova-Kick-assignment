import { Request, Response } from "express";
import { Order } from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const query: any = {};
    if (email) query["shippingInfo.email"] = email;
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};
