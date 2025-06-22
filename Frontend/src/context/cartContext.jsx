import React, { createContext, useState } from "react";

/* eslint-disable react-refresh/only-export-components */
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  
  function addToCart(product) {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product }];
      }
    });
  }

  function removeFromCart(productId) {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }
  function clearCart() {
  setCartItems([]);
  localStorage.removeItem("cart"); 
}

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
}