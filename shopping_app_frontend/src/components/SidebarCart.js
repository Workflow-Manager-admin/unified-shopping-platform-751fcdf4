import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

// PUBLIC_INTERFACE
const SidebarCart = ({ onCheckout }) => {
  const { cart, updateCart, removeFromCart, clearCart } = useContext(CartContext);
  const [editing, setEditing] = useState({}); // { [productId]: quantity }

  const handleQtyChange = (productId, qty) => {
    setEditing((ed) => ({ ...ed, [productId]: qty }));
  };

  const saveQty = (productId) => {
    const qty = parseInt(editing[productId] ?? 1);
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      updateCart(productId, qty);
    }
    setEditing((ed) => {
      const { [productId]: _, ...rest } = ed;
      return rest;
    });
  };

  if (!cart.items?.length)
    return (
      <aside className="sidebar-cart">
        <div className="sidebar-cart-header">
          <span role="img" aria-label="cart">
            🛒
          </span>
          Cart
        </div>
        <p style={{ color: "#aaa" }}>Your cart is empty.</p>
      </aside>
    );

  return (
    <aside className="sidebar-cart">
      <div className="sidebar-cart-header">
        <span role="img" aria-label="cart">
          🛒
        </span>
        Cart
      </div>
      <div className="cart-items-list">
        {cart.items.map((item) => (
          <div className="cart-item" key={item.product_id}>
            <div className="cart-item-info">
              <div className="cart-item-title">{item.product_name}</div>
              <div className="cart-item-qty">
                Qty:{" "}
                <input
                  type="number"
                  min={1}
                  value={editing[item.product_id] ?? item.quantity}
                  style={{ width: 48, marginLeft: 3 }}
                  onChange={(e) =>
                    handleQtyChange(item.product_id, e.target.value)
                  }
                  onBlur={() => saveQty(item.product_id)}
                />
                <button
                  className="btn btn-secondary"
                  style={{ marginLeft: 5 }}
                  onClick={() => saveQty(item.product_id)}
                  aria-label="Update quantity"
                >
                  ↺
                </button>
              </div>
            </div>
            <button
              className="btn btn-accent"
              style={{ marginLeft: 8, padding: "5px 11px" }}
              onClick={() => removeFromCart(item.product_id)}
              aria-label="Remove from cart"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div style={{ margin: "1.2rem 0 0.55rem 0", fontWeight: 600 }}>
        Total:{" "}
        <span className="product-price">${cart.total?.toFixed(2) ?? "0.00"}</span>
      </div>
      <div style={{ marginTop: 7, display: "flex", gap: 12 }}>
        <button className="btn btn-ghost" onClick={clearCart}>
          Clear
        </button>
        <button
          className="btn"
          style={{
            fontWeight: "bold",
            marginLeft: "auto",
            background: "var(--color-primary)",
          }}
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
};

export default SidebarCart;
