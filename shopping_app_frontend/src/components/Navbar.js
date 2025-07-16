import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
const Navbar = ({ onCheckout }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span role="img" aria-label="cart" style={{ marginRight: 5 }}>
          🛒
        </span>
        ShopLite
      </Link>
      <div className="navbar-links">
        {user && (
          <>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Shop
            </Link>
            <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>
              Orders
            </Link>
            <button
              className="btn btn-accent"
              style={{ marginLeft: 8 }}
              onClick={onCheckout}
            >
              Checkout
            </button>
            <span className="navbar-user">{user.username}</span>
            <button className="btn btn-ghost" onClick={logout}>
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
