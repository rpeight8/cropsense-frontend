import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Workspace } from "../types";
import WorkspaceManageForm from "./WorkspaceManageForm";
import WorkspaceAddForm from "./WorkspaceAddForm";
import { useCallback } from "react";

type WorkspaceManageDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkspaceAddDialog = ({
  isOpen,
  setIsOpen,
  ...props
}: WorkspaceManageDialogProps) => {
  // Should it be moved to somewhere else?
  const handleAddWorkspace = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new workspace</DialogTitle>
          <DialogDescription>
            Add new workspace here. Click{" "}
            <span className="font-semibold">Submit</span> when you're done.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceAddForm onAdd={handleAddWorkspace} />
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceAddDialog;
