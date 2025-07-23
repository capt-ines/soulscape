import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteMockup } from "./mockup-studio/deleteMockup";
import { Button } from "./ui/button";

const MockupSettingsDropdownMenu = ({ id, mockup, setMockupsData }) => {
  const handleDeleteMockup = async () => {
    const toastId = toast.loading("Deleting in progress...");
    try {
      await deleteMockup(mockup);
      setMockupsData((prev) => prev.filter((m) => m.id !== id));
      toast.success("Mockup deleted successfully.", { id: toastId });
    } catch {
      toast.error("Failed to delete mockup.", { id: toastId });
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-full w-10 cursor-pointer items-center justify-center">
          <BsThreeDots size={20} />
        </DropdownMenuTrigger>

        <DropdownMenuContent variant="droplet" align="start">
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">
              <AiOutlineDelete />
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className="text-sm">
            Proceeding will result in permanent deletion of mockup @
            {mockup.username}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleDeleteMockup}
              type="button"
              variant={"destructive"}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MockupSettingsDropdownMenu;
