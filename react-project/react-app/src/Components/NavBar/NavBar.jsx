import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext); // Access currentUser and logout from context

  return (
    <header className="navbar-header-xyz">
      <nav className="navbar">
        <ul className="navbar-links">
          {/* Left Side Links */}
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/watchlist" className="navbar-link">Watchlist</Link>
          </li>

          {/* Only show "My Profile" if the user is logged in */}
          {currentUser && (
            <li>
              <Link to="/profile" className="navbar-link profile-link">
                My Profile
              </Link>
            </li>
          )}

          {/* Right Side Buttons (only show logout/login if logged in) */}
          {currentUser ? (
            <li className="logout-item">
              <button 
                onClick={logout} 
                className="navbar-button logout-button"
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="navbar-link login-link">
                Log In
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="navbar-header-content-pqr">
      <svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 300 150" 
  width="300" 
  height="150"
  className="w-40 h-auto"
>
  {/* Background gradient for the cassette body */}
  <defs>
    <linearGradient id="cassetteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#1CE783" />
      <stop offset="100%" stopColor="#0DBD5E" />
    </linearGradient>
  </defs>

  {/* Cassette Body */}
  <rect 
    x="10" 
    y="10" 
    width="280" 
    height="130" 
    rx="15" 
    ry="15" 
    fill="url(#cassetteGradient)" 
    stroke="#045C2D" 
    strokeWidth="4"
  />

  {/* Label Area */}
  <rect 
    x="40" 
    y="25" 
    width="220" 
    height="50" 
    rx="5" 
    ry="5" 
    fill="#FFFFFF" 
    stroke="#045C2D" 
    strokeWidth="2"
  />
  <text 
    x="150" 
    y="55" 
    textAnchor="middle" 
    fontFamily="Arial, sans-serif" 
    fontSize="16" 
    fontWeight="bold" 
    fill="#045C2D"
  >
    MOVIX
  </text>

  {/* Left Tape Reel */}
  <circle cx="80" cy="100" r="25" fill="#FFFFFF" stroke="#045C2D" strokeWidth="2" />
  <circle cx="80" cy="100" r="8" fill="#0DBD5E" />
  <line x1="80" y1="75" x2="80" y2="125" stroke="#045C2D" strokeWidth="1" />
  <line x1="55" y1="100" x2="105" y2="100" stroke="#045C2D" strokeWidth="1" />

  {/* Right Tape Reel */}
  <circle cx="220" cy="100" r="25" fill="#FFFFFF" stroke="#045C2D" strokeWidth="2" />
  <circle cx="220" cy="100" r="8" fill="#0DBD5E" />
  <line x1="220" y1="75" x2="220" y2="125" stroke="#045C2D" strokeWidth="1" />
  <line x1="195" y1="100" x2="245" y2="100" stroke="#045C2D" strokeWidth="1" />

  {/* Tape Strip */}
  <rect 
    x="80" 
    y="95" 
    width="140" 
    height="10" 
    fill="#0DBD5E" 
    stroke="#045C2D" 
    strokeWidth="1"
  />
</svg>



        <h1 className="navbar-header-text-1-lmn">
          Watch thousands of TV shows and movies.
        </h1>
        <p className="navbar-header-text-2-ghi">
          HBO Max™, SHOWTIME®, CINEMAX® and STARZ® available as add-ons.
        </p>
        <Link 
          to="/subscriptions" 
          className="navbar-btn-cta-vbn"
        >
          Start Your Free Trial
        </Link>
        <p className="navbar-legal-text-efg">
          Free trial for new & eligible returning subscribers only.
        </p>
      </div>
    </header>
  );
};

export default Navbar;
