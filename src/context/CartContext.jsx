import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(cart.map(prod => 
        prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeItem = (itemId) => {
    setCart(cart.filter(prod => prod.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const isInCart = (itemId) => cart.some(prod => prod.id === itemId);

  const totalQuantity = cart.reduce((acc, prod) => acc + prod.quantity, 0);


  const totalPrecio = cart.reduce((acc, prod) => acc + (prod.quantity * prod.price), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, totalPrecio }}>
      {children}
    </CartContext.Provider>
  );
};