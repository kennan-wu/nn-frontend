"use client";

import { HiOutlineSparkles, HiOutlineTemplate } from "react-icons/hi";
import { BiImport } from "react-icons/bi";
import DashboardActionButton from "./action-button";
import ActionDialog from "./action-dialog";
import NameDescriptionForm from "../name-description-form";
import { createContext, useContext, useState } from "react";

interface DialogContextType {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  resetForm: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
}

export default function DashboardActionButtonCluster() {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleCreateNNSubmit = () => {
    console.log("Create neural network called with data: ", formData);
  };

  const actionButtons = [
    {
      buttonProps: {
        actionName: "New Neural Network",
        iconColor: "lg:bg-blue-400",
        Icon: HiOutlineSparkles,
        hoverColor: "hover:bg-blue-200",
      },
      dialogProps: {
        title: "Create New Neural Network",
        subtitle:
          "Specify a name, description, and size of your neural network here. Click save when you are done.",
        submitTitle: "Create",
        dialogBody: NameDescriptionForm,
        onSubmit: handleCreateNNSubmit,
      },
    },
    {
      buttonProps: {
        actionName: "Import",
        iconColor: "lg:bg-orange-400",
        Icon: BiImport,
        hoverColor: "hover:bg-orange-200",
      },
      dialogProps: {
        title: "Import Neural Network",
        subtitle: "Import a neural network from a file.",
        submitTitle: "Import",
        dialogBody: NameDescriptionForm,
        onSubmit: handleCreateNNSubmit,
      },
    },
    {
      buttonProps: {
        actionName: "Create Template",
        iconColor: "lg:bg-green-600",
        Icon: HiOutlineTemplate,
        hoverColor: "hover:bg-green-200",
      },
      dialogProps: {
        title: "Create Neural Network Template",
        subtitle:
          "Create a template for a neural network bey defining the size and type of each layer.",
        submitTitle: "Create",
        dialogBody: NameDescriptionForm,
        onSubmit: handleCreateNNSubmit,
      },
    },
  ];

  return (
    <DialogContext.Provider
      value={{ formData, setFormData, resetForm: () => setFormData({}) }}
    >
      <div className="flex flex-col justify-start p-8 lg:grid lg:grid-cols-3 lg:gap-8">
        {actionButtons.map((props, index) => (
          <DashboardActionButton {...props.buttonProps} key={index}>
            <ActionDialog {...props.dialogProps}>
              {props.dialogProps.dialogBody && <props.dialogProps.dialogBody />}
            </ActionDialog>
          </DashboardActionButton>
        ))}
      </div>
    </DialogContext.Provider>
  );
}
