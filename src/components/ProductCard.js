import React from "react";

const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = (e) => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button
        onClick={() => {
          handleAddToCart();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
