import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductAPI } from "../api";
import { CartContext } from "../contexts/CartContext";

// PUBLIC_INTERFACE
const ProductDetail = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    ProductAPI.get(id)
      .then((res) => {
        setProd(res);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setLoading(false);
      });
  }, [id]);

  const handleAdd = async () => {
    try {
      setMsg(null);
      await addToCart(prod.id, qty);
      setMsg("Added to cart!");
    } catch (e) {
      setErr(e.message);
    }
    setTimeout(() => setMsg(null), 2000);
  };

  if (loading)
    return <div style={{ padding: 40 }}>Loading product...</div>;
  if (err)
    return <div style={{ color: "var(--color-accent)", padding: 40 }}>Error: {err}</div>;

  return (
    <div style={{maxWidth: 550, margin: "2rem auto", background: "#fff", borderRadius: "10px", boxShadow:"0 2px 18px rgba(38,70,83,0.07)", padding:"2.5rem"}}>
      <img
        src={prod.image_url || "https://via.placeholder.com/320x240?text=Product"}
        alt={prod.name}
        style={{width:"100%", borderRadius:"8px", marginBottom: "1rem"}}
      />
      <div style={{fontSize: 22, fontWeight: 700, color:"var(--color-secondary)"}}>{prod.name}</div>
      <div style={{color:"var(--color-primary)", fontWeight:600, fontSize:18, margin:"0.6rem 0"}}>${prod.price?.toFixed(2)}</div>
      <div style={{marginBottom:6, color:"#444"}}>{prod.description}</div>
      <div>
        <label>
          Qty:{" "}
          <input
            type="number"
            min={1}
            style={{width: 54}}
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
          />
        </label>
        <button className="btn" style={{marginLeft: 15}} onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
      {msg && <div style={{ color: "var(--color-primary)", marginTop: "1rem" }}>{msg}</div>}
      {err && <div style={{ color: "var(--color-accent)", marginTop:"1rem" }}>{err}</div>}
    </div>
  );
};

export default ProductDetail;
