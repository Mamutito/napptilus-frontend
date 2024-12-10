import React from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../types/Phone";
import { useStore } from "../hooks/useStore";

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useStore();

  const totalPrice = cart.reduce((total, item) => total + item.basePrice, 0);

  const handleDeleteItem = (id: string) => {
    removeFromCart(id);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-137px)] flex flex-col">
      <h1 className="text-2xl uppercase mb-8">CART ({cart.length})</h1>
      {cart.length === 0 ? (
        <div className="flex-grow flex flex-col justify-center items-center">
          <p className="text-xl text-gray-500 mb-8">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex-grow grid gap-8">
          <div className=" space-y-6">
            {cart.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex items-start space-x-4 py-6 border-b"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="md:w-64 w-44 object-contain"
                />
                <div className="flex justify-between flex-col md:h-56 h-32 md:mt-5 mt-2">
                  <div className="flex-grow">
                    <h3 className="uppercase">{item.name}</h3>
                    <p className="text-gray-600 uppercase">
                      {item.selectedStorage} | {item.selectedColor}
                    </p>
                    <p className="mt-2">{item.basePrice} EUR</p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 text-sm mt-2 text-left hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex w-full justify-between items-center gap-5 mt-5 md:hidden px-5">
        <span className="text-sm">TOTAL</span>
        <span className="text-sm">{totalPrice} EUR</span>
      </div>
      <div className="flex md:justify-between justify-around mt-8">
        <Link
          to="/"
          className="inline-block border h-[56px] md:w-64 w-44 text-center  border-black md:px-8 pt-[18px] text-xs hover:bg-black hover:text-white transition-colors"
        >
          CONTINUE SHOPPING
        </Link>

        <div className="flex md:space-x-14">
          <div className="justify-between items-center gap-5 mb-4 md:flex hidden">
            <span className="text-sm">TOTAL</span>
            <span className="text-sm">{totalPrice} EUR</span>
          </div>
          <button className="h-[56px] md:w-64 w-44 bg-black text-white py-3 px-4 text-sm mb-4">
            PAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
