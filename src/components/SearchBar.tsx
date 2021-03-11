import { FiSearch } from "react-icons/fi";
function SearchBar() {
  return (
    <form className="focus-within:border-white my-4 text-lg flex text-white p-2 rounded-md bg-blue-500 border-transparent border-2">
      <label className="btn flex-shrink-0" htmlFor="search">
        <FiSearch />
        <p className="sr-only">Search Shop</p>
      </label>
      <input
        className="focus:outline-none p-2 flex-grow min-w-0 inline-block bg-blue-500"
        type="search"
        name="search"
        id="search"
      />
    </form>
  );
}

export default SearchBar;
