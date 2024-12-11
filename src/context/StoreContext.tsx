import React, { createContext, useState, useEffect } from "react";
import { CartItem, Phone, PhoneDetailEntity } from "../types/Phone";
import axios from "axios";

interface StoreContextType {
  phones: Phone[];
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  getPhoneById: (id: string) => Promise<PhoneDetailEntity | null>;
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Fetch phones from API
    const fetchPhones = async () => {
      try {
        // Solicito 21 elementos en lugar de 20 para que se muestren 20 elementos en la página principal
        // debido al duplicado.
        const response = await axios.get(
          "https://prueba-tecnica-api-tienda-moviles.onrender.com/products?limit=21",
          {
            headers: {
              "x-api-key": "87909682e6cd74208f41a6ef39fe4191",
            },
          }
        );
        const data = response.data;
        // Hay un error en la lista de productos que hay un elemento duplicado,
        // por lo que se filtran los elementos duplicados antes de guardarlos en el estado
        const uniquePhones = data.filter(
          (phone: Phone, index: number, self: Phone[]) =>
            index === self.findIndex((p) => p.id === phone.id)
        );
        setPhones(uniquePhones);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    fetchPhones();
  }, []);

  const getPhoneById = async (
    id: string
  ): Promise<PhoneDetailEntity | null> => {
    try {
      const response = await axios.get(
        `https://prueba-tecnica-api-tienda-moviles.onrender.com/products/${id}`,
        {
          headers: {
            "x-api-key": "87909682e6cd74208f41a6ef39fe4191",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching phone details:", error);
      return null;
    }
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <StoreContext.Provider
      value={{ phones, cart, addToCart, removeFromCart, getPhoneById }}
    >
      {children}
    </StoreContext.Provider>
  );
};
