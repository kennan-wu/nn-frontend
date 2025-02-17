import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";
import { HiOutlineTemplate } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdInfoOutline, MdOutlineBallot } from "react-icons/md";
import { VscFile, VscFiles } from "react-icons/vsc";

export default function DashboardSidebar({ selected }: { selected: string }) {
  const router = useRouter();

  const handleLocationClick = (slug: string) => {
    router.push(`/dashboard/${slug}`);
  };

  return (
    <div className="flex flex-col justify-between w-72 min-h-screen border-r border-gray-300">
      <div>
        <div className="flex h-fit flex-col border-b border-gray-300 pb-2">
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
          <button
            onClick={() => handleLocationClick("projects")}
            disabled={selected === "projects"}
            className={`flex flex-row justify-start items-center p-2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300 ${
              selected === "projects" && "bg-gray-300"
            }`}
          >
            <VscFiles />
            Projects
          </button>
          <button
            onClick={() => handleLocationClick("templates")}
            disabled={selected === "templates"}
            className={`flex flex-row justify-start items-center p-2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300 ${
              selected === "templates" && "bg-gray-300"
            }`}
          >
            <HiOutlineTemplate />
            Templates
          </button>
          <button
            onClick={() => handleLocationClick("all")}
            disabled={selected === "all"}
            className={`flex flex-row justify-start items-center p-2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300 ${
              selected === "all" && "bg-gray-300"
            }`}
          >
            <MdOutlineBallot />
            All
          </button>
        </div>
        <div className="py-3">
          <h2 className="px-5 text-base font-semibold">Recents</h2>
          <button className="flex flex-row justify-start items-center p-2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300 w-full">
            <VscFile />
            Project Name
          </button>
          <button className="flex flex-row justify-start items-center p-2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300 w-full">
            <VscFile />
            Project Name
          </button>
        </div>
        <div className="py-3">
          <h2 className="px-5 text-base font-semibold">Favorites</h2>
          <button className="flex flex-row justify-start items-center p-2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300 w-full">
            <VscFile />
            Project Name
          </button>
        </div>
      </div>
      <div className="pb-3">
        <button className="flex flex-row justify-start items-center p-2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300 w-full">
          <IoSettingsOutline />
          Settings
        </button>
        <button className="flex flex-row justify-start items-center p-2 gap-2 text-sm px-6 py-2 transition hover:bg-gray-300 w-full">
          <MdInfoOutline />
          Info
        </button>
      </div>
    </div>
  );
}
