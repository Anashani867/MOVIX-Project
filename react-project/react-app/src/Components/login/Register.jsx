import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (field, value) => {
    const errors = { ...validationErrors };

    if (field === "name" && !value.trim()) {
      errors.name = "Full Name is required.";
    } else if (field === "email" && (!value.trim() || !/\S+@\S+\.\S+/.test(value))) {
      errors.email = "Invalid email format.";
    } else if (field === "password" && value.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (field === "passwordConfirmation" && value !== password) {
      errors.passwordConfirmation = "Passwords do not match.";
    } else {
      delete errors[field];
    }

    setValidationErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (Object.keys(validationErrors).length > 0) {
      setError("Please fix the validation errors.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name: name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Registration failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-content">
          <div className="login-header">
            <h1>Create Account</h1>
            <p>Sign up to get started</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateField("name", e.target.value);
                }}
                required
              />
              {validationErrors.name && <div className="error">{validationErrors.name}</div>}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateField("email", e.target.value);
                }}
                required
              />
              {validationErrors.email && <div className="error">{validationErrors.email}</div>}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateField("password", e.target.value);
                }}
                required
              />
              {validationErrors.password && <div className="error">{validationErrors.password}</div>}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  validateField("passwordConfirmation", e.target.value);
                }}
                required
              />
              {validationErrors.passwordConfirmation && (
                <div className="error">{validationErrors.passwordConfirmation}</div>
              )}
            </div>
            {error && <div className="error">{error}</div>}
            <button 
              type="submit" 
              className="btn-login" 
              disabled={isLoading || Object.keys(validationErrors).length > 0}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="login-footer">
            <div className="signup-link">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;