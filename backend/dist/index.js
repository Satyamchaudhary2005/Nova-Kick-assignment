"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express_1.default.json());
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use("/api/products", productRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
const MONGODB_URI = process.env.MONGODB_URI || "";
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map