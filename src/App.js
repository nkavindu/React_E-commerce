import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductPage from "./pages/ProductPage";
import ServicesPage from "./pages/ServicesPage";

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false); // State for cart popup visibility
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication status

  // Check localStorage for the authentication status when the app starts
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Check localStorage for cart 
  useEffect(() => {
    // Get the cart data from localStorage
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      // Parse the JSON string into an array/object and set the state
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Calculate totalItems (sum of all quantities in the cart)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      // Create a new cart array by mapping and filtering the previous cart
      let updatedCart = prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Updated Cart:", updatedCart); // Log the updated cart
      return updatedCart; // Return the updated cart
    });
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Redirect to homepage if already logged in
  const RedirectIfAuthenticated = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar
        totalItems={totalItems}
        setCart={setCart}
        setShowCartModal={setShowCartModal}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Routes>
        {/* Only show these pages if the user is not authenticated */}
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <SignupPage />
            </RedirectIfAuthenticated>
          }
        />

        {/* Protected Routes - only accessible if authenticated */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProductPage setCart={setCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductPage cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServicesPage />
            </ProtectedRoute>
          }
        />

        {/* Add more protected routes here if needed */}
      </Routes>

      {/* Cart Modal (Popup) */}
      {showCartModal && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <h2>Your Cart</h2>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Remove One
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-price">
              <h3>
                Total: $
                {cart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </h3>
            </div>
            <button
              className="close-modal"
              onClick={() => setShowCartModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
