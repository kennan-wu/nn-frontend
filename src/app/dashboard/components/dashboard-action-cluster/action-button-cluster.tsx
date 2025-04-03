"use client";

import DashboardActionButton from "./action-button";
import ActionDialog from "./action-dialog";
import { actionButtons } from "./dashboard-action-button";

type DialogContextType = {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  resetForm: () => void;
  initializeForm: (formName: string) => void;
  disableButton: boolean;
  hideButton: boolean;
};

export default function DashboardActionButtonCluster() {
  return (
    <div className="flex flex-col justify-start p-8 lg:grid lg:grid-cols-3 lg:gap-8">
      {actionButtons.map((props, index) => (
        <DashboardActionButton
          {...props.buttonProps}
          mainColor={props.mainColor}
          hoverColor={props.hoverColor}
          key={index}
        >
          <ActionDialog
            {...props.dialogProps}
            mainColor={props.mainColor}
            hoverColor={props.hoverColor}
          />
        </DashboardActionButton>
      ))}
    </div>
  );
}
