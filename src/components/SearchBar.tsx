import { FiSearch } from "react-icons/fi";
function SearchBar() {
  return (
    <form className="focus-within:border-white my-4 text-lg flex bg-white text-white rounded-mdborder-transparent border-2">
      <label
        className="flex-shrink-0 bg-blue-500 rounded-l-md flex justify-center items-center px-4 "
        htmlFor="search"
      >
        <FiSearch />
        <p className="sr-only">Search Shop</p>
      </label>
      <input
        className="focus:outline-none p-2 flex-grow min-w-0 inline-block bg-blue-500 rounded-r-md"
        type="search"
        name="search"
        id="search"
      />
    </form>
  );
}

export default SearchBar;
