import express from "express";

const router = express.Router();

let cachedRates: Record<string, number> | null = null;
let lastFetch = 0;

router.get("/", async (req, res) => {
  try {
    if (cachedRates && Date.now() - lastFetch < 1000 * 60 * 60) {
      return res.json(cachedRates);
    }

    const response = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await response.json();

    cachedRates = data.rates;
    lastFetch = Date.now();

    res.json(cachedRates);
  } catch (err) {
    console.error("Currency error:", err);
    res.json({});
  }
});

export default router;
