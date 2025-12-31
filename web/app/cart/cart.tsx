"use client";

import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQty, clear } = useCart();

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <main style={page}>
      <h1 style={title}>Your Cart</h1>

      {items.length === 0 && <p>Your cart is empty</p>}

      {items.map((item) => (
        <div key={item.id} style={row}>
          <div>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>

          <input
            type="number"
            value={item.quantity}
            min={1}
            style={qty}
            onChange={(e) =>
              updateQty(item.id, Number(e.target.value))
            }
          />

          <button style={remove} onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h2 style={totalStyle}>Total: ${total.toFixed(2)}</h2>
          <button style={checkout}>Checkout</button>
          <button style={clearBtn} onClick={clear}>Clear Cart</button>
        </>
      )}
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#0b0b12",
  color: "white",
  padding: 40,
};

const title = {
  fontSize: 40,
  marginBottom: 30,
};

const row = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#141419",
  padding: 20,
  borderRadius: 12,
  marginBottom: 16,
};

const qty = {
  width: 60,
  padding: 6,
  background: "#0b0b12",
  color: "white",
  border: "1px solid #333",
};

const remove = {
  background: "#b11212",
  border: "none",
  color: "white",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const totalStyle = {
  marginTop: 30,
  fontSize: 28,
};

const checkout = {
  marginTop: 16,
  padding: "14px",
  width: 200,
  background: "linear-gradient(90deg,#b11212,#22c55e)",
  border: "none",
  borderRadius: 10,
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const clearBtn = {
  marginTop: 10,
  background: "transparent",
  border: "1px solid #333",
  color: "white",
  padding: "10px",
  borderRadius: 8,
};
