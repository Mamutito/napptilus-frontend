import React from "react";
import { PhoneCard } from "./PhoneCard";
import { useStore } from "../hooks/useStore";

interface PhoneListProps {
  searchTerm: string;
}

export const PhoneList: React.FC<PhoneListProps> = ({ searchTerm }) => {
  const { phones } = useStore();

  if (!phones.length) {
    return <div>Loading...</div>;
  }

  const filteredPhones = phones.filter(
    (phone) =>
      phone.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {searchTerm && (
        <div className="text-sm text-gray-500 mb-8">
          {filteredPhones.length} RESULTS
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border-b">
        {filteredPhones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </>
  );
};
