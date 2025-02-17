import { HiOutlineSparkles, HiOutlineTemplate } from "react-icons/hi";
import DashboardItem from "./dashboard-item";
import { BiImport } from "react-icons/bi";
import Searchbar from "./searchbar";
import Filters from "./filters";
import DashboardActionButton, { ActionButtonProps } from "./action-button";

export default function DashboardGrid() {
  const handleCreateNNPress = () => {};

  const actionButtons: ActionButtonProps[] = [
    {
      actionName: "New Neural Network",
      action: handleCreateNNPress,
      iconColor: "bg-blue-400",
      Icon: HiOutlineSparkles,
      hoverColor: "bg-blue-200",
    },
    {
      actionName: "Import",
      action: handleCreateNNPress,
      iconColor: "bg-orange-400",
      Icon: BiImport,
      hoverColor: "bg-orange-200",
    },
    {
      actionName: "Create Template",
      action: handleCreateNNPress,
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
      <Searchbar />
      <Filters />
      <DashboardItem />
    </div>
  );
}
