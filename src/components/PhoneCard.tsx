import React from "react";
import { Phone } from "../types/Phone";
import { Link } from "react-router-dom";

interface PhoneCardProps {
  phone: Phone;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  return (
    <Link
      to={`/phone/${phone.id}`}
      key={phone.id}
      className="group relative border-r border-b p-3 overflow-hidden"
    >
      <div className="absolute inset-[-1px] bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>

      <div className="relative z-10">
        <div className="aspect-[1/1] relative mb-4">
          <img
            src={phone.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 uppercase">{phone.brand}</div>
            <div className="text-sm uppercase group-hover:text-white">
              {phone.name}
            </div>
          </div>
          <div className="text-sm group-hover:text-white">
            {phone.basePrice} EUR
          </div>
        </div>
      </div>
    </Link>
  );
};
