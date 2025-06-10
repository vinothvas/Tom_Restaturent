// context/ShopContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  popular?: boolean;
}

interface ShopContextType {
  foods: Product[];
  backendUrl: any;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Default to localhost if not set

  const [foods, setFoods] = useState<Product[]>([]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        const popularOnly = response.data.products
        setFoods(popularOnly);
      } else {
        console.error("Failed to fetch foods:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <ShopContext.Provider value={{ foods, backendUrl }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopContextProvider");
  }
  return context;
};
