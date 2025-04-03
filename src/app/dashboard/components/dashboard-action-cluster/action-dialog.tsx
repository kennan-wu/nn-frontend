import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { initializeForm } from "./dashboard-action-button";

export interface ActionDialogProps {
  title: string;
  subtitle: string;
  submitTitle: string;
  dialogBody: React.ElementType;
  onSubmit: (formData: Record<string, any>) => void;
  mainColor: string;
  hoverColor: string;
  disableButton?: boolean;
  hideButton?: boolean;
}

export default function ActionDialog({
  title,
  subtitle,
  submitTitle,
  dialogBody: DialogBody,
  onSubmit,
  mainColor,
  hoverColor,
  hideButton = false,
}: ActionDialogProps) {
  const handleSubmit = () => {
    onSubmit({});
  };

  const [formData, setFormData] = useState(initializeForm(title));
  const [disableButton, setDisableButton] = useState(true);
  const [buttonHidden, setButtonHidden] = useState(hideButton);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{subtitle}</DialogDescription>
      </DialogHeader>
      {DialogBody && (
        <DialogBody
          formData={formData}
          setFormData={setFormData}
          setDisableButton={setDisableButton}
        />
      )}
      <DialogFooter>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={disableButton}
          className={`${mainColor} ${hoverColor} ${
            buttonHidden ? "hidden" : ""
          }`}
        >
          {submitTitle}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
