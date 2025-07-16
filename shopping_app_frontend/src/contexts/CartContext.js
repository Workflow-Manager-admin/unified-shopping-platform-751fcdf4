import React, { createContext, useContext, useState, useEffect } from "react";
import { CartAPI, OrderAPI } from "../api";
import { AuthContext } from "./AuthContext";

// PUBLIC_INTERFACE
export const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartReloadKey, setCartReloadKey] = useState(0);

  // Load cart from backend on (token, cartReloadKey) change
  useEffect(() => {
    if (!token) {
      setCart({ items: [], total: 0 });
      return;
    }
    CartAPI.get(token).then(setCart).catch(() => setCart({ items: [], total: 0 }));
  }, [token, cartReloadKey]);

  // PUBLIC_INTERFACE
  const addToCart = async (productId, quantity = 1) => {
    await CartAPI.add(productId, quantity, token);
    setCartReloadKey((k) => k + 1);
  };

  // PUBLIC_INTERFACE
  const updateCart = async (productId, quantity) => {
    await CartAPI.update(productId, quantity, token);
    setCartReloadKey((k) => k + 1);
  };

  // PUBLIC_INTERFACE
  const removeFromCart = async (productId) => {
    await CartAPI.remove(productId, token);
    setCartReloadKey((k) => k + 1);
  };

  // PUBLIC_INTERFACE
  const clearCart = async () => {
    await CartAPI.clear(token);
    setCartReloadKey((k) => k + 1);
  };

  // PUBLIC_INTERFACE
  const checkout = async () => {
    await OrderAPI.checkout(token);
    setCartReloadKey((k) => k + 1); // reload cart after
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
