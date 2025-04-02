import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { useDialogContext } from "./action-button-cluster";

export interface ActionDialogProps {
  title: string;
  subtitle: string;
  submitTitle: string;
  children: React.ReactNode;
  onSubmit: () => void;
  mainColor: string;
  hoverColor: string;
}

export default function ActionDialog({
  title,
  subtitle,
  submitTitle,
  children,
  onSubmit,
  mainColor,
  hoverColor,
}: ActionDialogProps) {
  const { resetForm, disableButton } = useDialogContext();

  const handleSubmit = () => {
    onSubmit();
    resetForm();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{subtitle}</DialogDescription>
      </DialogHeader>
      {children}
      <DialogFooter>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={disableButton}
          className={`${mainColor} ${hoverColor}`}
        >
          {submitTitle}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
