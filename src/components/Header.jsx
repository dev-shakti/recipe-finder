import SearchBar from "./SearchBar";


export default function Header({ searchText, setSearchText, options }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full mb-6">
       <div className="w-full max-w-7xl p-4  mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
          🍳 Recipe Finder
        </h1>

        {/* Search Bar */}
        <div className="w-full md:w-1/2">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            options={options}
          />
        </div>
      </div>
    </header>
  );
}
