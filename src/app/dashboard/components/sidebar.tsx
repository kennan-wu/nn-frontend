import Image from "next/image";
import { FaCaretDown } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { VscFile, VscFiles } from "react-icons/vsc";

export default function DashboardSidebar() {
  return (
    <div className="flex flex-col justify-start w-72 h-screen border-r border-gray-300">
      <div className="flex h-fit flex-col border-b border-gray-300 py-1">
        <button className="flex flex-row w-fit items-center gap-2 mx-3 my-1 p-2 rounded hover:bg-gray-300 transition">
          <Image
            src="/images/default-pfp.png"
            alt="profile picture"
            width={25}
            height={25}
            className="border border-gray-400 rounded-full"
          ></Image>
          <h2 className="text-base font-semibold">Kennan Wu</h2>
          <FaCaretDown />
        </button>
        <button className="flex flex-row justify-start items-center p2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300">
          <MdHistory />
          Recents
        </button>
        <button className="flex flex-row justify-start items-center p2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300">
          <VscFiles />
          All projects
        </button>
      </div>
      <div className="py-3">
        <h2 className="px-5 text-base font-semibold">Favorites</h2>
        <button className="flex flex-row justify-start items-center p2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300">
          <VscFile />
          Project Name
        </button>
      </div>
    </div>
  );
}
