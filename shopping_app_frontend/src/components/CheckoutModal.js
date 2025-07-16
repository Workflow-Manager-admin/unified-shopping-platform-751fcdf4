import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

// PUBLIC_INTERFACE
const CheckoutModal = ({ onClose }) => {
  const { cart, checkout } = useContext(CartContext);
  const [step, setStep] = useState(1); // 1 = confirm, 2 = processing, 3 = done
  const [err, setErr] = useState(null);

  const handleCheckout = async () => {
    setStep(2);
    setErr(null);
    try {
      await checkout();
      setStep(3);
    } catch (e) {
      setErr(e.message);
      setStep(1);
    }
  };

  return (
    <div className="modal" tabIndex={-1} >
      <div className="modal-content" role="dialog" aria-modal="true">
        {step === 1 && (
          <>
            <div style={{ fontWeight: 600, fontSize: 18, color: "var(--color-secondary)", marginBottom: 14 }}>
              Checkout Order
            </div>
            <ul style={{ marginBottom: 13 }}>
              {cart.items.map((item) => (
                <li key={item.product_id} style={{color: "var(--color-secondary)"}}>
                  {item.product_name} × {item.quantity} — <span style={{color:"var(--color-accent)"}}>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              Total: <span className="product-price">${cart.total?.toFixed(2)}</span>
            </div>
            {err && <div className="auth-error">{err}</div>}
            <div style={{ marginTop: 19, display: "flex", justifyContent: "flex-end", gap: 16 }}>
              <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button className="btn btn-accent" onClick={handleCheckout}>Confirm</button>
            </div>
          </>
        )}
        {step === 2 && (
          <div style={{textAlign:"center", padding:"2rem 1rem"}}>
            <div>Processing...</div>
          </div>
        )}
        {step === 3 && (
          <div style={{textAlign:"center", minWidth: 230, padding:"1.3rem 0"}}>
            <div style={{fontSize:54}}>✅</div>
            <div style={{marginTop:7, marginBottom: 14, color:"var(--color-primary)", fontWeight: 700}}>Order placed!</div>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
