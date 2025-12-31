import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress;

  const response = await fetch(`https://ipapi.co/json/`);
  const data = await response.json();

  res.json({
    country: data.country_code,
    currency: data.currency,
  });
});

export default router;
