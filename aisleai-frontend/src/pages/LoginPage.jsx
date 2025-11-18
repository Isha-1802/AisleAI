import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMsg("Loading...");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // store token if provided by backend; otherwise store a simple flag
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        localStorage.setItem("token", "logged-in");
      }

      setMsg("Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div className="page form-page">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
      <p className="msg">{msg}</p>
    </div>
  );
}