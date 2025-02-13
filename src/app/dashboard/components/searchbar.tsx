import { CiSearch } from "react-icons/ci";

export default function Searchbar() {
  return (
    <div className="flex flex-row items-center gap-1 py-1 bg-gray-200 rounded px-2 focus-within:border focus-within:border-blue-500">
      <CiSearch width={20} height={20} />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent placeholder:text-sm flex items-center border-none focus:border-0 focus:outline-none"
      />
    </div>
  );
}
