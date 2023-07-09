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

type WorkspaceManageDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workspace: Workspace | null;
  onWorkspaceNameChange: React.ChangeEventHandler<HTMLInputElement>;
};

const WorkspaceManageDialog = ({
  isOpen,
  setIsOpen,
  workspace,
  onWorkspaceNameChange,
  ...props
}: WorkspaceManageDialogProps) => {
  if (!workspace) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage workspace</DialogTitle>
          <DialogDescription>
            Manage "
            <span className="font-semibold">{workspace.name}</span>" workspace
            here. Click <span className="font-semibold">Submit</span> when
            you're done with changes or{" "}
            <span className="font-semibold">Delete</span> to delete the
            workspace.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceManageForm workspace={workspace} />
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={workspace.name}
              onChange={onWorkspaceNameChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceManageDialog;
