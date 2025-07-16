import React, { useState, useEffect } from "react";
import { ProductAPI } from "../api";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ProductAPI.list()
      .then(setProducts)
      .catch((error) => setErr(error.message));
  }, []);

  if (err)
    return <div className="product-grid"><div style={{color:"var(--color-accent)"}}>Error: {err}</div></div>;

  return (
    <div className="product-grid" style={{marginTop: "1.1rem"}}>
      {products.length === 0 && (
        <div style={{fontSize: "1rem", color: "#aaa"}}>No products available.</div>
      )}
      {products.map((p) => (
        <div
          className="product-card"
          tabIndex={0}
          key={p.id}
          onClick={() => navigate(`/products/${p.id}`)}
          onKeyDown={e => e.key === "Enter" && navigate(`/products/${p.id}`)}
        >
          <img
            className="product-image"
            src={p.image_url || "https://via.placeholder.com/200x150?text=Product"}
            alt={p.name}
            loading="lazy"
          />
          <div className="product-title">{p.name}</div>
          <div style={{color: "var(--color-primary)", fontSize: 14}}>{p.short_desc}</div>
          <div className="product-price">${p.price?.toFixed(2) ?? "-"}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
