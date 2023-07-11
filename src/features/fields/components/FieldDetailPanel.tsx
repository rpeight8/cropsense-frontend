import { selectSelectedSeasonId } from "@/features/seasons/seasonsSlice";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import { useSeasonFields } from "../services";
import { selectSelectedFieldId } from "../fieldsSlice";
import { ComponentPropsWithoutRef, useCallback } from "react";
import FieldManageForm from "./FieldManageForm";
import FieldEditButton from "./FieldEditButton";
import { useToast } from "@/components/ui/Toast/useToast";
import { useNavigate } from "react-router-dom";

type FieldDetailPanelProps = ComponentPropsWithoutRef<"div">;

const FieldDetailPanel = ({ className, ...props }: FieldDetailPanelProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedSeasonsId = useAppSelector(selectSelectedSeasonId);
  const { action } = useURLParametersParser();
  const { data: fields } = useSeasonFields(selectedSeasonsId);
  const selectedFieldId = useAppSelector(selectSelectedFieldId);

  const onUpdateSuccess = useCallback(() => {
    toast({
      title: "Field updated",
      description: "Field updated successfully",
      variant: "default",
    });
    navigate(-1);
  }, [navigate, toast]);

  const onUpdateError = useCallback(() => {
    toast({
      title: "Error",
      description: "Field has not been updated",
      variant: "destructive",
    });
  }, [toast]);

  const onDeleteError = useCallback(() => {
    toast({
      title: "Error",
      description: "Field has not been deleted",
      variant: "destructive",
    });
  }, [toast]);

  const onDeleteSuccess = useCallback(() => {
    toast({
      title: "Field deleted",
      description: "Field deleted successfully",
      variant: "default",
    });
    navigate(-1);
  }, [navigate, toast]);

  if (!fields) {
    return null;
  }

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div
      className={cn(
        "h-[350px] w-[full] animate-fade-right transition-all duration-100 animate-fade-up animate-once animate-ease-linear animate-reverse animate-fill-backwards",
        {
          "h-0 overflow-hidden": !selectedFieldId,
        }
      )}
    >
      {action && selectedFieldId && (
        <div
          className={cn("p-1 pt-3 h-full flex w-full", className)}
          {...props}
        >
          {(action === "edit" && selectedField && (
            <FieldManageForm
              className=""
              onDeleteSuccess={onDeleteSuccess}
              onDeleteError={onDeleteError}
              onUpdateSuccess={onUpdateSuccess}
              onUpdateError={onUpdateError}
              field={{
                ...selectedField,
                crop: selectedField.crop && {
                  ...selectedField.crop,
                },
              }}
            />
          )) ||
            (action === "display" && (
              <>
                <p className="text-3xl font-bold">{selectedField?.name} </p>
                <FieldEditButton fieldId={selectedFieldId} className="ml-5" />
              </>
            ))}
        </div>
      )}
    </div>
  );
};

export default FieldDetailPanel;
