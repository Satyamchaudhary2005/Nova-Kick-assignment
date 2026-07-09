import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const MONGODB_URI = process.env.MONGODB_URI || "";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
