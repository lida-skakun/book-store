import { useContext, createContext } from "react";

const CartContext = createContext(null);

export const CartProvider = CartContext.Provider;

export const useCart = () => useContext(CartContext);
