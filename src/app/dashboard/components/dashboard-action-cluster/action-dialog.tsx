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
}

export default function ActionDialog(props: ActionDialogProps) {
  const { resetForm } = useDialogContext();

  const handleSubmit = () => {
    props.onSubmit();
    resetForm();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>{props.subtitle}</DialogDescription>
      </DialogHeader>
      {props.children}
      <DialogFooter>
        <Button type="submit" onClick={handleSubmit}>
          {props.submitTitle}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
