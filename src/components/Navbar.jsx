import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import useGlobalState from "../hooks/useGlobalState";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const { setCity,toggleDarkMode,theme } = useGlobalState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(search);
  };
  return (
    <div className=" h-[50px] flex justify-end px-5 gap-2 w-full items-center bg-gradient-light dark:bg-gradient-dark">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-fit flex items-center justify-center gap-2"
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-light flex-1 dark:text-white py-1 px-2 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-light hover:bg-blue-500 text-white font-bold py-1 px-4 "
        >
          Search
        </button>
      </form>
      <div>
        <button
          className={`p-2 rounded-full ${
            theme === "dark" ? "bg-white" : "bg-[#242424]"
          }`}
          onClick={toggleDarkMode}
        >
          {theme === "light" ? (
            <FaMoon size={20} className="text-white" />
          ) : (
            <FaSun className="text-orange-400" size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
