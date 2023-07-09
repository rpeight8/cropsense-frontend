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
import SeasonAddForm from "./SeasonAddForm";
import { useCallback } from "react";

type SeasonAddDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workspaceId: string;
};

const SeasonAddDialog = ({
  isOpen,
  setIsOpen,
  workspaceId,
  ...props
}: SeasonAddDialogProps) => {
  // Should it be moved to somewhere else?
  const handleAddSeason = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new season</DialogTitle>
          <DialogDescription>
            Add new season here. Click{" "}
            <span className="font-semibold">Submit</span> when you're done.
          </DialogDescription>
        </DialogHeader>
        <SeasonAddForm onAdd={handleAddSeason} workspaceId={workspaceId} />
      </DialogContent>
    </Dialog>
  );
};

export default SeasonAddDialog;
