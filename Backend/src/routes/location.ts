import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (typeof fetch !== "function") {
      throw new Error("fetch not available");
    }

    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    res.json({
      country: data.country_code || "US",
      currency: data.currency || "USD",
    });
  } catch (err) {
    console.error("Location error:", err);
    res.json({
      country: "US",
      currency: "USD",
    });
  }
});

export default router;
