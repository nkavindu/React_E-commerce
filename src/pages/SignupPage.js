import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate the password first before proceeding
    if (!passwordError) {
      // Store user data in local storage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.email === formData.email);

      if (userExists) {
        alert("User already exists! Please log in.");
        navigate("/login");
      } else {
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful! Please log in.");
        navigate("/login");
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  const validatePassword = (password) => {
    // Password validation regex (minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character)
    const regex =
      /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain both uppercase and lowercase letters, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Signup</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Password :</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setPasswordError("");
            }}
            onBlur={(e) => validatePassword(e.target.value)}
            required
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        <button type="submit">Signup</button>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
