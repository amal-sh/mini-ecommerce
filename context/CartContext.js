'use client'; // This directive is required since we are using React state

import { createContext, useContext, useState } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create the Provider Component
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Function to increment the cart
  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Create a custom hook so any component can easily use this context
export function useCart() {
  return useContext(CartContext);
}