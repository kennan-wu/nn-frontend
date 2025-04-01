import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionButtonProps } from "./dashboard-action-cluster/action-button";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IoChevronDown } from "react-icons/io5";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export default function CreateButtonDropdown({
  actionButtons,
}: {
  actionButtons: ActionButtonProps[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="lg:hidden bg-blue-500 hover:bg-blue-400 w-fit text-base font-semibold"
        >
          <Plus size={12} className="text-gray-100" />
          Create
          <IoChevronDown size={12} className="mt-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actionButtons.map((props, index) => (
          <DropdownMenuItem
            key={index}
            // onClick={() => handleMenuItemClick(props)}
          >
            <div
              className={`${props.iconColor.replace(
                "lg:",
                ""
              )} rounded-full p-1 mr-2`}
            >
              <props.Icon className="w-4 h-4 text-white" />
            </div>
            {props.actionName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
