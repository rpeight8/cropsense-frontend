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

type WorkspaceManageDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkspaceAddDialog = ({
  isOpen,
  setIsOpen,
  ...props
}: WorkspaceManageDialogProps) => {
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
        <WorkspaceAddForm />
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceAddDialog;