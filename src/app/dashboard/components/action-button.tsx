import { IconType } from "react-icons";
import { HiOutlineSparkles } from "react-icons/hi";

export interface ActionButtonProps {
  actionName: string;
  action: () => void;
  iconColor: string;
  Icon: IconType;
  hoverColor: string;
}

export default function DashboardActionButton({
  actionName,
  action,
  iconColor,
  Icon,
  hoverColor,
}: ActionButtonProps) {
  return (
    <button
      className={`flex justify-start bg-gray-200 rounded px-5 py-9 text-sm font-semibold items-center gap-3 hover:${hoverColor} transition`}
    >
      <Icon className={`${iconColor} rounded-full w-9 h-9 p-2 text-white`} />
      {actionName}
    </button>
  );
}
