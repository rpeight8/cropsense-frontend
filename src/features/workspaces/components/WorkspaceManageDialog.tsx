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
import useWorkspaceManageForm from "../hooks/useWorkspaceManageForm";
import { useCallback } from "react";
import useWorkspaceAddForm from "../hooks/useWorkspaceAddForm";
import { useToast } from "@/components/ui/Toast/useToast";

type WorkspaceManageDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workspace: Workspace | null;
};

const WorkspaceManageDialog = ({
  isOpen,
  setIsOpen,
  workspace,
  ...props
}: WorkspaceManageDialogProps) => {
  const { toast } = useToast();

  const handleWorkspaceSuccessUpdate = useCallback(() => {
    setIsOpen(false);
    toast({
      variant: "default",
      title: "Success",
      description: "Workspace was updated.",
    });
  }, [setIsOpen]);

  const handleWorkspaceErrorUpdate = useCallback(() => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occured while updating workspace.",
    });
  }, [toast]);

  const handleWorkspaceSuccessDelete = useCallback(() => {
    setIsOpen(false);
    toast({
      variant: "default",
      title: "Success",
      description: "Workspace was deleted.",
    });
  }, [setIsOpen, toast]);

  const handleWorkspaceErrorDelete = useCallback(() => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occured while deleting workspace.",
    });
  }, [toast]);

  if (!workspace) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage workspace</DialogTitle>
          <DialogDescription>
            Manage "<span className="font-semibold">{workspace.name}</span>"
            workspace here. Click <span className="font-semibold">Submit</span>{" "}
            when you're done with changes or{" "}
            <span className="font-semibold">Delete</span> to delete the
            workspace.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceManageForm
          workspaceToManage={workspace}
          onUpdateSuccess={handleWorkspaceSuccessUpdate}
          onUpdateError={handleWorkspaceErrorUpdate}
          onDeleteSuccess={handleWorkspaceSuccessDelete}
          onDeleteError={handleWorkspaceErrorDelete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceManageDialog;
