import React, { useEffect, useState } from "react";
import { ColorOption, PhoneDetailEntity, StorageOption } from "../types/Phone";
import { useStore } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";

interface PhoneDetailProps {
  phone: PhoneDetailEntity;
}

const PhoneDetail: React.FC<PhoneDetailProps> = ({ phone }) => {
  const [selectedStorage, setSelectedStorage] =
    useState<StorageOption | null>();
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>();
  const { addToCart, cart } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedStorage(null);
    setSelectedColor(null);
  }, [phone]);

  const handleAddToCart = () => {
    if (selectedStorage && selectedColor) {
      const item = {
        id: phone.id,
        name: phone.name,
        brand: phone.brand,
        imageUrl: selectedColor.imageUrl,
        basePrice: selectedStorage.price || phone.basePrice,
        selectedStorage: selectedStorage.capacity,
        selectedColor: selectedColor.name,
      };
      addToCart(item);
      localStorage.setItem("cart", JSON.stringify([...cart, item]));
      navigate("/cart");
    }
  };

  const currentPrince = selectedStorage?.price || phone.basePrice;
  return (
    <>
      <div className="flex lg:justify-around justify-center items-center flex-wrap gap-12">
        <div className="max-w-[510px]">
          <img
            src={
              selectedColor
                ? selectedColor.imageUrl
                : phone.colorOptions[0].imageUrl
            }
            alt={phone.name}
            className="w-full aspect-square object-contain"
          />
        </div>

        <div className="w-380">
          <h1 className="text-2xl mb-2 uppercase">{phone.name}</h1>
          <p className="xl mb-8">{currentPrince} EUR</p>

          <div className="mb-8">
            <h2 className="text-sm mb-4">
              STORAGE: HOW MUCH SPACE DO YOU NEED?
            </h2>
            <div className="flex ">
              {phone.storageOptions.map((option) => (
                <button
                  key={option.capacity}
                  onClick={() => setSelectedStorage(option)}
                  className={`border px-2 py-5 text-center w-24 ${
                    selectedStorage?.capacity === option.capacity
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  {option.capacity}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-sm mb-4">COLOR: PICK YOUR FAVORITE</h2>
            <div className="flex gap-4 mb-4 grid-flow-row-dense">
              {phone.colorOptions.map((color) => (
                <button
                  key={color.name}
                  data-testid="color-button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-5 aspect-square ${
                    selectedColor?.name === color.name
                      ? "ring-2 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                />
              ))}
            </div>
            <p className="text-sm">{selectedColor?.name}</p>
          </div>

          <button
            className={`w-full py-4 px-8 text-center ${
              selectedStorage && selectedColor
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedStorage || !selectedColor}
            onClick={handleAddToCart}
          >
            AÑADIR
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-lg uppercase mb-8">SPECIFICATIONS</h2>
        <div className="border-t">
          {Object.entries(phone.specs).map(([key, value]) => (
            <div key={key} className="grid grid-cols-[200px_1fr] border-b py-4">
              <div className="text-sm text-gray-500">{key.toUpperCase()}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PhoneDetail;
