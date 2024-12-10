import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="fixed top-[60px] left-0 right-0 bg-white z-20 md:pt-10 pb-5">
      <div className="container mx-auto px-4 py-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search for a smartphone..."
            className="w-full border-b border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
