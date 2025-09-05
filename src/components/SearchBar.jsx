import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar({ searchText, setSearchText, ingredients }) {
  const [showDropdown, setShowDropdown] = useState(false);

    const filtered = ingredients?.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );
  
   const handleSelect = (ingredient) => {
    setSearchText(ingredient);
    setShowDropdown(false);
  };
  return (
    <div className="relative flex justify-center items-center gap-2 mb-6 w-full max-w-4xl mx-auto border border-gray-500 rounded-md p-2">
      <input
        type="text"
        placeholder="Enter an ingredient (e.g. chicken)"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setShowDropdown(true);
        }}
        className="p-2 w-full border-none outline-none"
      />
      <BiSearch
        size={32}
        className="text-gray-500 hover:text-gray-600 cursor-pointer"
      />

        {/* Autocomplete dropdown */}
      {showDropdown && searchText && filtered.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
          {filtered.slice(0, 10).map((ingredient, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(ingredient)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
