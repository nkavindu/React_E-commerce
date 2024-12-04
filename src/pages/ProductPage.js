import React, { useState, useEffect } from "react";
import "../App.css";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";

const ProductPage = ({ cart, setCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 50,
      description: "High-quality sound with noise cancellation.",
      image: "/images/wireless-headphone.webp",
    },
    {
      id: 2,
      name: "Gaming Mouse",
      category: "Electronics",
      price: 30,
      description: "Ergonomic design with customizable buttons.",
      image: "/images/gaming-mouse.webp",
    },
    {
      id: 3,
      name: "Yoga Mat",
      category: "Fitness",
      price: 20,
      description: "Non-slip vsurface for all your workout needs.",
      image: "/images/yoga-mat.webp",
    },
    {
      id: 4,
      name: "Cricket Bat",
      category: "Sport",
      price: 15,
      description: "Enjoy the hovvliday with thrilling of cricket fiesta.",
      image: "/images/cricket-bat.webp",
    },
    {
      id: 5,
      name: "JBL Tune 510BT",
      category: "Electronics",
      price: 50,
      description: "High-quality sound with noise cancellation.",
      image: "/images/jbl.jpg",
    },
    {
      id: 6,
      name: "EVGA X12 Gaming Mouse",
      category: "Electronics",
      price: 30,
      description: "8k, Wired, White, Customizable, Dual Sensor, 16,000 DPI, 5 Profiles, 8 Buttons, Ambidextrous",
      image: "/images/mouse2.jpg",
    },
    {
      id: 7,
      name: "ProsourceFit Tri-Fold Folding Thick Mat",
      category: "Fitness",
      price: 20,
      description: "Non-slip surface for all your workout needs.",
      image: "/images/matt2.jpg",
    },
    {
      id: 8,
      name: "Baseball Bat, Aluminum One Hand",
      category: "Sport",
      price: 15,
      description: "Enjoygg the holiday with thrilling of bassketball fiesta.",
      image: "/images/bass_bat.jpg",
    },
    {
      id: 9,
      name: "Redragon S101 Gaming Keyboard",
      category: "Electronics",
      price: 50,
      description: "M601 Mouse, RGB Backlit Gaming Keyboard, Programmable Backlit Gaming Mouse.",
      image: "/images/keyboard.jpg",
    },
    {
      id: 10,
      name: "	Amazon Basics",
      category: "Electronics",
      price: 30,
      description: "Smooth, precise and affordable wireless optical 3-button mouse with USB nano receiver for laptop, desktop and netbook PCs.",
      image: "/images/gaming-mouse.webp",
    },
    {
      id: 11,
      name: "Airdrops",
      category: "Fitness",
      price: 20,
      description: "Non-slivvvvvvp surface for all your workout needs.",
      image: "/images/airpod.jpg",
    },
    {
      id: 12,
      name: "SS Ikon Kashmir Willow ",
      category: "Sport",
      price: 15,
      description: "Enjoy the holidannnny with thrilling of cricket fiesta.",
      image: "/images/bats.jpg",
    },
  ];

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the product already exists in the cart
      const existingProduct = prevCart.find((item) => item.id === product.id);

      let updatedCart;
      if (existingProduct) {
        // Update the quantity of the existing product
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add the new product to the cart
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Updated Cart:", updatedCart); // Log the updated cart
      return updatedCart; // Return the updated cart
    });
  };

  return (
    <div className="product-page">
      <h1>Product Page</h1>
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ProductList
        products={products}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        addToCart={addToCart}
      />
    </div>
  );
};

export default ProductPage;
