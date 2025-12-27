"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Store</h1>

      {products.map(p => (
        <div
          key={p.id}
          style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}
        >
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <strong>₹{p.price}</strong>
        </div>
      ))}
    </div>
  );
}
