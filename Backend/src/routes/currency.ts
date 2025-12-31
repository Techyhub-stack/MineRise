import express from "express";

const router = express.Router();

let cachedRates: any = null;
let lastFetch = 0;

router.get("/", async (req, res) => {
  if (cachedRates && Date.now() - lastFetch < 1000 * 60 * 60) {
    return res.json(cachedRates);
  }

  const response = await fetch(
    "https://api.exchangerate.host/latest?base=USD"
  );
  const data = await response.json();

  cachedRates = data.rates;
  lastFetch = Date.now();

  res.json(cachedRates);
});

export default router;
