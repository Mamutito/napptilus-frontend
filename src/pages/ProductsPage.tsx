import { useState } from "react";
import { PhoneList } from "../components/PhoneList";
import SearchBar from "../components/SearchBar";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="container mx-auto px-4 py-8 pt-[133px]">
        <PhoneList searchTerm={searchTerm} />
      </main>
    </>
  );
};

export default ProductsPage;
