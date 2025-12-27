export default function Footer() {
  return (
    <footer style={footer}>
      <p>© {new Date().getFullYear()} MineRise. All rights reserved.</p>
      <p style={{ opacity: 0.6 }}>Not affiliated with Mojang or Microsoft.</p>
    </footer>
  );
}

const footer = {
  textAlign: "center" as const,
  padding: "40px 20px",
  borderTop: "1px solid #222",
  background: "#0b0b12",
};
