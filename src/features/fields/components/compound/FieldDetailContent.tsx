import FieldEditButton from "@/features/fields/components/FieldEditButton";
import FieldEditForm from "@/features/fields/components/FieldEditForm";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import { FieldAction, FieldId } from "@/types";
import {
  selectFields,
  selectSelectedFieldId,
} from "@features/fields/fieldsSlice";
import { memo } from "react";

type FieldsDetailContent = {
  action: FieldAction;
  fieldId: FieldId;
};

const FieldsDetailContent = ({ action, fieldId }: FieldsDetailContent) => {
  const fields = useAppSelector(selectFields);
  const selectedField = fields.find((f) => f.id === fieldId);

  return (
    <>
      {(action === "edit" && selectedField && (
        <FieldEditForm
          field={{
            ...selectedField,
            crop: selectedField?.crop?.id,
          }}
        />
      )) ||
        (action === "display" && (
          <>
            <p>Field name: {selectedField?.name} </p>
            <FieldEditButton fieldId={fieldId} />
          </>
        ))}
    </>
  );
};

export default FieldsDetailContent;
