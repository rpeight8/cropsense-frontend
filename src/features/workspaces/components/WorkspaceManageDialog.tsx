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
  // Should it be moved to somewhere else?
  const handleSaveWorkspace = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  // Should it be moved to somewhere else?
  const handleDeleteWorkspace = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

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
          workspace={workspace}
          onDelete={handleDeleteWorkspace}
          onSave={handleSaveWorkspace}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceManageDialog;
