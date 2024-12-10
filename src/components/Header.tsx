import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useStore } from "../hooks/useStore";

const Header: React.FC = () => {
  const { cart } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MBST
        </Link>
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
