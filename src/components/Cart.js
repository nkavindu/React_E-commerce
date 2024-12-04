import React from "react";

const Cart = ({ cart, removeFromCart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} - ${item.price} x {item.quantity} = $
                  {item.price * item.quantity}
                </span>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove One
                </button>
              </li>
            ))}
          </ul>
          <h3>Total Price: ${calculateTotal()}</h3>
        </>
      ) : (
        <p>The cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
