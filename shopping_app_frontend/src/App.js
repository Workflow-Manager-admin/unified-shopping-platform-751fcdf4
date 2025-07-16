import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import SidebarCart from "./components/SidebarCart";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import AuthPage from "./pages/AuthPage";
import CheckoutModal from "./components/CheckoutModal";
import OrderHistory from "./pages/OrderHistory";
import "./App.css";

// App layout with providers
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <MainAppLayout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

// PUBLIC_INTERFACE
function MainAppLayout() {
  const { user } = useContext(AuthContext);
  // Track modal visibility in global state for simplicity with context
  const [isCheckoutOpen, setCheckoutOpen] = React.useState(false);

  return (
    <div className="app-root" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar onCheckout={() => setCheckoutOpen(true)} />
      <div className="main-layout">
        <SidebarCart onCheckout={() => setCheckoutOpen(true)} />
        <div className="page-content">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <AuthPage />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <AuthPage isRegister />} />
            <Route path="/products/:id" element={user ? <ProductDetail /> : <Navigate to="/login" />} />
            <Route path="/orders" element={user ? <OrderHistory /> : <Navigate to="/login" />} />
            <Route path="/" element={user ? <ProductGrid /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      {isCheckoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
    </div>
  );
}

export default App;
