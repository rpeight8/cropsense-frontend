import { selectSelectedSeasonId } from "@/features/seasons/seasonsSlice";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import { useSeasonFields } from "../services";
import { selectSelectedFieldId } from "../fieldsSlice";
import { ComponentPropsWithoutRef } from "react";
import FieldEditForm from "./FieldEditForm";
import FieldEditButton from "./FieldEditButton";

type FieldDetailPanelProps = ComponentPropsWithoutRef<"div">;

const FieldDetailPanel = ({ className, ...props }: FieldDetailPanelProps) => {
  const selectedSeasonsId = useAppSelector(selectSelectedSeasonId);
  const { action } = useURLParametersParser();
  const { data: fields } = useSeasonFields(selectedSeasonsId);
  const selectedFieldId = useAppSelector(selectSelectedFieldId);

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
            <FieldEditForm
              className=""
              field={{
                ...selectedField,
                crop: selectedField?.crop,
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
