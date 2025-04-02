import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IconType } from "react-icons";
import ActionDialog from "./action-dialog";
import { useDialogContext } from "./action-button-cluster";

export default function DashboardActionButton({
  hoverColor,
  mainColor,
  Icon,
  actionName,
  children,
}: {
  hoverColor: string;
  mainColor: string;
  Icon: IconType;
  actionName: string;
  children: React.ReactElement<typeof ActionDialog>;
}) {
  const { initializeForm } = useDialogContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${hoverColor} lg:py-8 border-transparent lg:border-gray-200`}
          onClick={() => initializeForm(actionName)}
        >
          <div
            className={`${mainColor} lg:rounded-full lg:p-2 lg:block hidden`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          {actionName}
        </Button>
      </DialogTrigger>
      {children}
    </Dialog>
  );
}
