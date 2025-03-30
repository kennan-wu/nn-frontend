import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { IconType } from "react-icons";

export interface ActionButtonProps {
  actionName: string;
  action?: () => void;
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
    // <button
    //   onClick={action}
    //   className={`flex justify-start bg-gray-200 rounded px-5 py-9 text-sm font-semibold items-center gap-3 hover:${hoverColor} transition`}
    // >
    //   <Icon className={`${iconColor} rounded-full w-9 h-9 p-2 text-white`} />
    //   {actionName}
    // </button>

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icon
            className={`${iconColor} rounded-full w-9 h-9 p-2 text-white`}
          />
          {actionName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{actionName}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
