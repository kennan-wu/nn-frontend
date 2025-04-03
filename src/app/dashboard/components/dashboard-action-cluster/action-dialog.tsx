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
    onSubmit(formData);
  };

  const handleClear = (event: React.MouseEvent) => {
    event.preventDefault();
    setFormData(initializeForm(title));
    setDisableButton(true);
  };

  const [formData, setFormData] = useState(initializeForm(title));
  const [disableButton, setDisableButton] = useState(true);
  const [buttonHidden, setButtonHidden] = useState(hideButton);

  return (
    <DialogContent className="flex flex-col max-h-[calc(100vh-3rem)] p-0">
      <DialogHeader className="flex-shrink-0 px-6 pt-6">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{subtitle}</DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto pl-6 pt-4 pb-4 pr-0">
        <div className="pr-6">
          {DialogBody && (
            <DialogBody
              formData={formData}
              setFormData={setFormData}
              setDisableButton={setDisableButton}
            />
          )}
        </div>
      </div>

      <DialogFooter className="flex-shrink-0 px-6 pb-6">
        <Button
          variant="outline"
          onClick={(event) => handleClear(event)}
          className={`${buttonHidden ? "hidden" : ""}`}
        >
          Clear
        </Button>
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
