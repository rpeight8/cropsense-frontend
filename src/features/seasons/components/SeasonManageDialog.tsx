import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useCallback } from "react";
import { useToast } from "@/components/ui/Toast/useToast";
import { Season } from "../types";
import SeasonManageForm from "./SeasonManageForm";

type SeasonAddDialogProps = ElementProps<typeof Dialog> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  seasonToManage: Season;
};

const SeasonManageDialog = ({
  isOpen,
  setIsOpen,
  seasonToManage,
  ...props
}: SeasonAddDialogProps) => {
  const { toast } = useToast();
  const handleUpdateSuccess = useCallback(() => {
    setIsOpen(false);
    toast({
      variant: "default",
      title: "Success",
      description: "Season was updated.",
    });
  }, [setIsOpen, toast]);

  const handleUpdateError = useCallback(() => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occured while updating season.",
    });
  }, [toast]);

  const handleDeleteSuccess = useCallback(() => {
    setIsOpen(false);
    toast({
      variant: "default",
      title: "Success",
      description: "Season was deleted.",
    });
  }, [setIsOpen, toast]);

  const handleDeleteError = useCallback(() => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occured while deleting season.",
    });
  }, [toast]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage season</DialogTitle>
          <DialogDescription>
            Manage "<span className="font-semibold">{seasonToManage.name}</span>
            " season here. Click <span className="font-semibold">Submit</span>{" "}
            when you're done with changes or{" "}
            <span className="font-semibold">Delete</span> to delete the season.
          </DialogDescription>
        </DialogHeader>
        <SeasonManageForm
          onUpdateSuccess={handleUpdateSuccess}
          onUpdateError={handleUpdateError}
          onDeleteSuccess={handleDeleteSuccess}
          onDeleteError={handleDeleteError}
          seasonToManage={seasonToManage}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SeasonManageDialog;
