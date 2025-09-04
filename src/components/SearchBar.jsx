import { BiSearch } from "react-icons/bi";

export default function SearchBar({ searchText, setSearchText }) {
  return (
    <div className="flex justify-center items-center gap-2 mb-6 w-full max-w-4xl mx-auto border border-gray-500 rounded-md p-2">
      <input
        type="text"
        placeholder="Enter an ingredient (e.g. chicken)"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="p-2 w-full border-none outline-none"
      />
      <BiSearch
        size={32}
        className="text-gray-500 hover:text-gray-600 cursor-pointer"
      />
    </div>
  );
}
