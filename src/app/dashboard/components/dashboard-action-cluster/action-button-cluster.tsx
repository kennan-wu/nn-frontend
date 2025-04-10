"use client";

import { HiOutlineSparkles, HiOutlineTemplate } from "react-icons/hi";
import { BiImport } from "react-icons/bi";
import DashboardActionButton from "./action-button";
import ActionDialog from "./action-dialog";
import NameDescriptionForm from "./name-description-form";
import { createContext, useContext, useState } from "react";
import ImportFileForm from "./import-file-form";

type DialogContextType = {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  resetForm: () => void;
  initializeForm: (formName: string) => void;
  disableButton: boolean;
  hideButton: boolean;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

type NameDescriptionForm = {
  name: string;
  description: string;
};

type ImportForm = {
  name: string;
  description: string;
  importUrl: string;
};

type TemplateForm = {
  name: string;
  description: string;
  layers: {
    type: string;
    size: number;
  }[];
};

type FormData = NameDescriptionForm | ImportForm | TemplateForm;

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
}

export default function DashboardActionButtonCluster() {
  const [formData, setFormData] = useState<Record<string, any>>({
    name: "",
    description: "",
  });

  const initializeForm = (formName: string) => {
    let initialForm;
    switch (formName) {
      case "New Neural Network":
        initialForm = { name: "", description: "" };
        break;
      case "Import":
        initialForm = { name: "", description: "", importUrl: "" };
        break;
      case "Create Template":
        initialForm = { name: "", description: "", layers: [] };
        break;
      default:
        initialForm = { name: "", description: "" };
    }
    setFormData(initialForm);
  };

  const handleCreateNNSubmit = () => {
    console.log("Create neural network called with data: ", formData);
  };

  const actionButtons = [
    {
      buttonProps: {
        actionName: "New Neural Network",
        Icon: HiOutlineSparkles,
      },
      dialogProps: {
        title: "Create New Neural Network",
        subtitle:
          "Specify a name, description, and size of your neural network here. Click save when you are done.",
        submitTitle: "Create",
        dialogBody: NameDescriptionForm,
        onSubmit: handleCreateNNSubmit,
      },
      mainColor: "bg-blue-400",
      hoverColor: "hover:bg-blue-200",
    },
    {
      buttonProps: {
        actionName: "Import",
        Icon: BiImport,
      },
      dialogProps: {
        title: "Import Neural Network",
        subtitle:
          "Choose a .keras file you would like to import. Click import when you are done.",
        submitTitle: "Import",
        dialogBody: ImportFileForm,
        onSubmit: handleCreateNNSubmit,
      },
      mainColor: "bg-orange-400",
      hoverColor: "hover:bg-orange-200",
    },
    {
      buttonProps: {
        actionName: "Create Template",
        Icon: HiOutlineTemplate,
      },
      dialogProps: {
        title: "Create Neural Network Template",
        subtitle:
          "Create a template for a neural network bey defining the size and type of each layer.",
        submitTitle: "Create",
        dialogBody: NameDescriptionForm,
        onSubmit: handleCreateNNSubmit,
      },
      mainColor: "bg-green-600",
      hoverColor: "hover:bg-green-200",
    },
  ];

  return (
    <DialogContext.Provider
      value={{
        formData,
        setFormData,
        resetForm: () => initializeForm("New Neural Network"),
        initializeForm,
        disableButton: true,
        hideButton: false,
      }}
    >
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
            >
              {props.dialogProps.dialogBody && <props.dialogProps.dialogBody />}
            </ActionDialog>
          </DashboardActionButton>
        ))}
      </div>
    </DialogContext.Provider>
  );
}
