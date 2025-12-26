import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import { authMiddleware, AuthRequest } from "./middleware/auth";
import productRoutes from "./routes/products";



const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (_, res) => {
  res.send("API Running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

app.get("/profile", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    message: "Access granted",
    userId: req.userId
  });
});

app.use("/products", productRoutes);

