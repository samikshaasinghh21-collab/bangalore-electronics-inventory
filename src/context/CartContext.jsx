import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  // mock inventory stock
  const [stock, setStock] = useState({
    1: 100,
    2: 50,
  });

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQty = (id, qty) => {
    if (isLocked) return;
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const lockCart = () => setIsLocked(true);

  // mock stock deduction
  const deductStock = () => {
    setStock(prev => {
      const updated = { ...prev };
      cart.forEach(item => {
        updated[item.id] -= item.qty;
      });
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, isLocked, lockCart, deductStock }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (p) => useContext(CartContext);
