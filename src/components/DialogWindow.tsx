import React, { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DialogWindow = ({
  title,
  description,
  additionalComponents,
  trigger,
}: {
  trigger: any;
  title: string;
  description: string;
  additionalComponents?: ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {additionalComponents}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWindow;
