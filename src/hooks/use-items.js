import { useContext, createContext } from "react";

const ItemsContext = createContext(null);

export const ItemsProvider = ItemsContext.Provider;

export const useItems = () => useContext(ItemsContext);
