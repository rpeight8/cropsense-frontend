import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import WorkspaceAddForm from "./WorkspaceAddForm";
import { useCallback } from "react";
import { useCreateWorkspace } from "../services";
import { toast, useToast } from "@/components/ui/Toast/useToast";

type WorkspaceManageDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkspaceAddDialog = ({
  isOpen,
  setIsOpen,
  ...props
}: WorkspaceManageDialogProps) => {
  const { toast } = useToast();

  const handleAddWorkspaceSuccess = useCallback(() => {
    setIsOpen(false);
    toast({
      variant: "default",
      title: "Success",
      description: "Workspace was created.",
    });
  }, [setIsOpen, toast]);

  const handleAddWorkspaceError = useCallback(() => {
    toast({
      variant: "destructive",
      title: "Success",
      description: "An error occured while creating workspace.",
    });
  }, [toast]);

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
        <WorkspaceAddForm
          onSuccess={handleAddWorkspaceSuccess}
          onError={handleAddWorkspaceError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceAddDialog;
