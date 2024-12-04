import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({
  totalItems,
  setCart,
  setShowCartModal,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout function
  const handleLogout = () => {
    setCart([])
    localStorage.removeItem("cart");
    localStorage.removeItem("currentPage");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>MyShop</h1>
        </div>

        <div className="nav-lg">
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
              </>
            )}
            <li>
              {isAuthenticated ? (
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout 👤
                </span>
              ) : location.pathname === "/login" ? (
                <Link to="/signup">Signup</Link> // If at /login, show Signup
              ) : location.pathname === "/signup" ? (
                <Link to="/login">Login</Link> // If at /signup, show Login
              ) : (
                <Link to="/login">Login</Link> // Default to Login if on any other page
              )}
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/" onClick={() => setShowCartModal(true)}>
                  <span className="nav-icon">
                    🛒
                    {totalItems > 0 && (
                      <span className="cart-count">{totalItems}</span>
                    )}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </div>
      </div>

      {isMenuOpen && (
        <div className="dropdown">
          <ul>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
              </>
            )}
            <li>
              {isAuthenticated ? (
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout 👤
                </span>
              ) : location.pathname === "/login" ? (
                <Link to="/signup">Signup</Link> // If at /login, show Signup
              ) : location.pathname === "/signup" ? (
                <Link to="/login">Login</Link> // If at /signup, show Login
              ) : (
                <Link to="/login">Login</Link> // Default to Login if on any other page
              )}
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/" onClick={() => setShowCartModal(true)}>
                  <span className="nav-icon">
                    🛒
                    {totalItems > 0 && (
                      <span className="cart-count">{totalItems}</span>
                    )}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
