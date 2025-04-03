import { HiOutlineSparkles, HiOutlineTemplate } from "react-icons/hi";
import { BiImport } from "react-icons/bi";
import NameDescriptionForm from "./name-description-form";
import ImportFileForm from "./import-file-form";

const handleCreateNNSubmit = (formData: Record<string, any>) => {
  console.log("Create neural network called with data: ", formData);
};

export const actionButtons = [
  {
    buttonProps: {
      actionName: "New Neural Network",
      Icon: HiOutlineSparkles,
    },
    dialogProps: {
      title: "Create New Neural Network",
      subtitle:
        "Name and describe your network. Set layer count, types, and neuron numbers.",
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
      hideButton: true,
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
        "Create a template for a neural network by defining the size and type of each layer.",
      submitTitle: "Create",
      dialogBody: NameDescriptionForm,
      onSubmit: handleCreateNNSubmit,
    },
    mainColor: "bg-green-600",
    hoverColor: "hover:bg-green-200",
  },
];

export type CreateForm = {
  name: string;
  description: string;
  layers: {
    name: string;
    activation: string;
    neuronCount: string;
  }[];
};

export type ImportForm = {
  name: string;
  description: string;
  importUrl: string;
};

export type TemplateForm = {
  name: string;
  description: string;
  layers: {
    type: string;
    size: number;
  }[];
};

export type FormData = CreateForm | ImportForm | TemplateForm;

export const initializeForm = (formName: string) => {
  let initialForm;
  switch (formName) {
    case "Create New Neural Network":
      initialForm = {
        name: "",
        description: "",
        layers: [
          { name: "Input Layer", activation: "", neuronCount: "" },
          { name: "Output Layer", activation: "", neuronCount: "" },
        ],
      };
      break;
    case "Import Neural Network":
      initialForm = { name: "", description: "", importUrl: "" };
      break;
    case "Create Neural Network Template":
      initialForm = { name: "", description: "", layers: [] };
      break;
    default:
      initialForm = { name: "", description: "" };
  }
  return initialForm;
};
