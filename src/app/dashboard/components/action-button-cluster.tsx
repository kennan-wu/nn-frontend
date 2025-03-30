import { HiOutlineSparkles, HiOutlineTemplate } from "react-icons/hi";
import DashboardActionButton, { ActionButtonProps } from "./action-button";
import { BiImport } from "react-icons/bi";

export default function DashboardActionButtonCluster() {
  function handleCreateNNPress() {}

  const actionButtons: ActionButtonProps[] = [
    {
      actionName: "New Neural Network",
      //   action: handleCreateNNPress,
      iconColor: "bg-blue-400",
      Icon: HiOutlineSparkles,
      hoverColor: "bg-blue-200",
    },
    {
      actionName: "Import",
      //   action: handleCreateNNPress,
      iconColor: "bg-orange-400",
      Icon: BiImport,
      hoverColor: "bg-orange-200",
    },
    {
      actionName: "Create Template",
      //   action: handleCreateNNPress,
      iconColor: "bg-green-600",
      Icon: HiOutlineTemplate,
      hoverColor: "bg-green-200",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {actionButtons.map((props, index) => (
        <DashboardActionButton key={index} {...props} />
      ))}
    </div>
  );
}
