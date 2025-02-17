import { GrFavorite } from "react-icons/gr";

export default function DashboardItem() {
  return (
    <div className="flex flex-col gap-1 relative group active">
      <div className="absolute opacity-0 group-hover:opacity-100 transition top-2 right-2">
        <GrFavorite className="hover:text-pink-400" />
      </div>
      <img
        src="/images/neural-labs-logo.png"
        className="border-gray-200 border rounded aspect-[16/9] w-full group-active:border-blue-400"
      ></img>
      <h1 className="mt-2 font-semibold">Project Name</h1>
      <p className="text-xs text-gray-400">Edited on: 12/3/25</p>
    </div>
  );
}
