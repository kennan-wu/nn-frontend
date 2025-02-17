import { IoGridOutline, IoListOutline } from "react-icons/io5";

export default function Filters() {
  return (
    <div className="col-span-2 flex justify-end items-center gap-5 text-sm">
      <div className="flex gap-9 mr-9">
        <div>
          <p className="text-xs text-gray-400 ml-1">Filter</p>
          <select>
            <option>Projects</option>
            <option>Templates</option>
          </select>
        </div>
        <div>
          <p className="text-xs text-gray-400 ml-1">Sort By</p>
          <select>
            <option>Recent</option>
            <option>Created</option>
            <option>Size</option>
          </select>
        </div>
      </div>
      <button>
        <IoGridOutline size={20} />
      </button>
      <button>
        <IoListOutline size={20} />
      </button>
    </div>
  );
}
