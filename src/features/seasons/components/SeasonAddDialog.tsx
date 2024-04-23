import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import SeasonAddForm from "./SeasonAddForm";
import { useCallback } from "react";
import { useToast } from "@/components/ui/Toast/useToast";

type SeasonAddDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToWorkspaceId: string;
};

const SeasonAddDialog = ({
  isOpen,
  setIsOpen,
  addToWorkspaceId,
  ...props
}: SeasonAddDialogProps) => {
  const { toast } = useToast();
  const handleAddSuccess = useCallback(() => {
    setIsOpen(false);
    toast({
      variant: "default",
      title: "Success",
      description: "Season was created.",
    });
  }, [setIsOpen, toast]);

  const handleAddError = useCallback(() => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occured while creating season.",
    });
  }, [toast]);

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
        <SeasonAddForm
          onSuccess={handleAddSuccess}
          onError={handleAddError}
          addToWorkspaceId={addToWorkspaceId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SeasonAddDialog;
