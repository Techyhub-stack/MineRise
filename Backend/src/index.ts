import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import statsRoute from "./routes/stats";
import locationRoute from "./routes/location";
import currencyRoute from "./routes/currency";
import { authMiddleware, AuthRequest } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("API Running");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/stats", statsRoute);
app.use("/location", locationRoute);
app.use("/currency", currencyRoute);

app.get("/profile", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    message: "Access granted",
    userId: req.userId,
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
