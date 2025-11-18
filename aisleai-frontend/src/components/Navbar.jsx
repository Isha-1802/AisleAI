import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">AisleAI</Link>
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} style={{ marginLeft: 12 }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}