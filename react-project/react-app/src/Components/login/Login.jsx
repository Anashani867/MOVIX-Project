import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("currentUser");

    if (token && storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      navigate("/");
    }
  }, [setCurrentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response.data) {
        setCurrentUser(response.data.status);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        navigate("/");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-content">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Log in to continue your session</p>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button 
              type="submit" 
              className="btn-login" 
              disabled={!email || !password}
            >
              Log In
            </button>
          </form>
          <div className="login-footer">
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
            <div className="signup-link">
              Don't have an account? <a href="/register">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;