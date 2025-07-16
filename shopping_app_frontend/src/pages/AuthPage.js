import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
const AuthPage = ({ isRegister = false }) => {
  const { login, register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegister) {
        await register(username, password);
      } else {
        await login(username, password);
      }
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-title">{isRegister ? "Register" : "Login"}</div>
      {error && <div className="auth-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="auth-form-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            autoComplete="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="auth-form-field">
          <label htmlFor="password">Password</label>
          <div style={{position:"relative"}}>
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: 32 }}
            />
            <span
              role="button"
              tabIndex="0"
              style={{
                position: "absolute",
                right: 9,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#aaa",
                cursor: "pointer",
                fontSize: 17,
              }}
              onClick={() => setShowPw(x=>!x)}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        <button className="btn btn-primary" style={{marginTop:"0.7rem", width:"100%"}} type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <div className="auth-form-footer">
        {!isRegister ? (
          <>Don't have an account? <Link to="/register">Register</Link></>
        ) : (
          <>Already have an account? <Link to="/login">Login</Link></>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
