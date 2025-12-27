import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";

const router = Router();


router.get("/", async (_req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req: AuthRequest, res) => {
    const { name, description, price, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price,
        image: image || ""
      }
    });

    res.json(product);
  }
);


export default router;
