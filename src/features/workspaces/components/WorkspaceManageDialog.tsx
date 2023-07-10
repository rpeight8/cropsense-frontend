import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Workspace } from "../types";
import WorkspaceManageForm from "./WorkspaceManageForm";
import { useCallback } from "react";
import { useToast } from "@/components/ui/Toast/useToast";

type WorkspaceManageDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workspaceToManage: Workspace;
};

const WorkspaceManageDialog = ({
  isOpen,
  setIsOpen,
  workspaceToManage,
  ...props
}: WorkspaceManageDialogProps) => {
  const { toast } = useToast();

  const handleUpdateSuccess = useCallback(() => {
    setIsOpen(false);
    toast({
      variant: "default",
      title: "Success",
      description: "Workspace was updated.",
    });
  }, [setIsOpen, toast]);

  const handleUpdateError = useCallback(() => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occured while updating workspace.",
    });
  }, [toast]);

  const handleDeleteSuccess = useCallback(() => {
    setIsOpen(false);
    toast({
      variant: "default",
      title: "Success",
      description: "Workspace was deleted.",
    });
  }, [setIsOpen, toast]);

  const handleDeleteError = useCallback(() => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occured while deleting workspace.",
    });
  }, [toast]);

 
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage workspace</DialogTitle>
          <DialogDescription>
            Manage "<span className="font-semibold">{workspaceToManage.name}</span>"
            workspace here. Click <span className="font-semibold">Submit</span>{" "}
            when you're done with changes or{" "}
            <span className="font-semibold">Delete</span> to delete the
            workspace.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceManageForm
          workspaceToManage={workspaceToManage}
          onUpdateSuccess={handleUpdateSuccess}
          onUpdateError={handleUpdateError}
          onDeleteSuccess={handleDeleteSuccess}
          onDeleteError={handleDeleteError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceManageDialog;
