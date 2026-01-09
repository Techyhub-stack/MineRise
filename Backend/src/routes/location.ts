import express from "express";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    if (!data || !data.currency) {
      throw new Error("Invalid IP data");
    }

    res.json({
      country: data.country_code,
      currency: data.currency,
    });
  } catch (err) {
    console.error("Location route error:", err);

    res.json({
      country: "US",
      currency: "USD",
    });
  }
});

export default router;
  