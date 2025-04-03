"use client";

import { HiOutlineSparkles, HiOutlineTemplate } from "react-icons/hi";
import { BiImport } from "react-icons/bi";
import DashboardActionButton from "./action-button";
import ActionDialog from "./action-dialog";
import NameDescriptionForm from "./name-description-form";
import { createContext, useContext, useState } from "react";
import ImportFileForm from "./import-file-form";
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
  const [formData, setFormData] = useState<Record<string, any>>({
    name: "",
    description: "",
  });

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
