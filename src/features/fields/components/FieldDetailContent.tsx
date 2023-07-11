import FieldEditButton from "@/features/fields/components/FieldEditButton";
import FieldEditForm from "@/features/fields/components/FieldEditForm";
import { useAppSelector } from "@/store";
import { FieldAction, FieldId } from "../types";
import {
  selectFields,
  selectSelectedFieldId,
} from "@features/fields/fieldsSlice";
import { useSeasonFields } from "../services";
import { selectSelectedSeasonId } from "@/features/seasons/seasonsSlice";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import useURLParametersParser from "@/hooks/useURLParametersParser";

type FieldsDetailContentProps = ComponentPropsWithoutRef<"div">;

const FieldsDetailContent = ({
  className,
  ...props
}: FieldsDetailContentProps) => {
  const selectedSeasonsId = useAppSelector(selectSelectedSeasonId);
  const { action } = useURLParametersParser();
  const { data: fields } = useSeasonFields(selectedSeasonsId);
  const selectedFieldId = useAppSelector(selectSelectedFieldId);

  if (!fields) {
    return null;
  }

  const selectedField = fields.find((f) => f.id === fieldId);
  return (
    <div className={cn("p-1 pt-3 h-full flex w-full", className)} {...props}>
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
            <FieldEditButton fieldId={fieldId} className="ml-5" />
          </>
        ))}
    </div>
  );
};

export default FieldsDetailContent;
