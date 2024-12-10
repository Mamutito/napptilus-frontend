import React, { createContext, useState, useEffect } from "react";
import { CartItem, Phone, PhoneDetailEntity } from "../types/Phone";

interface StoreContextType {
  phones: Phone[];
  cart: CartItem[];
  addToCart: (phone: Phone) => void;
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
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch phones from API
    const fetchPhones = async () => {
      try {
        // Solicito 21 elementos en lugar de 20 para que se muestren 20 elementos en la página principal
        // debido al duplicado.
        const response = await fetch(
          "https://prueba-tecnica-api-tienda-moviles.onrender.com/products?limit=21",
          {
            headers: {
              "x-api-key": "87909682e6cd74208f41a6ef39fe4191",
            },
          }
        );
        const data = await response.json();
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

  const addToCart = (phone: Phone) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === phone.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === phone.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...phone, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getPhoneById = async (
    id: string
  ): Promise<PhoneDetailEntity | null> => {
    try {
      const response = await fetch(
        `https://prueba-tecnica-api-tienda-moviles.onrender.com/products/${id}`,
        {
          headers: {
            "x-api-key": "87909682e6cd74208f41a6ef39fe4191",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching phone details:", error);
      return null;
    }
  };

  return (
    <StoreContext.Provider
      value={{ phones, cart, addToCart, removeFromCart, getPhoneById }}
    >
      {children}
    </StoreContext.Provider>
  );
};
