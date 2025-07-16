import React, { useContext, useEffect, useState } from "react";
import { OrderAPI } from "../api";
import { AuthContext } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
const OrderHistory = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderAPI.list(token)
      .then((res) => {
        setOrders(res);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setLoading(false);
      });
  }, [token]);

  if (loading)
    return <div style={{ padding: 40 }}>Loading orders...</div>;
  if (err)
    return <div style={{ color: "var(--color-accent)", padding: 40 }}>Error: {err}</div>;

  return (
    <div className="order-history-container">
      <div style={{ fontSize: 20, fontWeight: "bold", color: "var(--color-secondary)", marginBottom: 15 }}>Order History</div>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ol className="order-history-list">
          {orders.map((order) => (
            <li className="order-card" key={order.id}>
              <div className="order-title">Order #{order.id}</div>
              <div className="order-meta">
                {order.status === "completed" ? "✅ Completed" : `Status: ${order.status}`}
              </div>
              <div className="order-meta">
                {order.timestamp ? new Date(order.timestamp).toLocaleString() : ""}
              </div>
              <ul className="order-items-list">
                {(order.items || []).map((item, idx) => (
                  <li key={idx}>{item.product_name} × {item.quantity} — <span style={{color:"var(--color-accent)"}}>${(item.price * item.quantity).toFixed(2)}</span></li>
                ))}
              </ul>
              <div style={{marginTop:5, color:"var(--color-primary)", fontWeight:600}}>
                Total: ${order.total?.toFixed(2)}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default OrderHistory;
