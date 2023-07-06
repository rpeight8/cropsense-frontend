import FieldEditButton from "@/features/fields/components/FieldEditButton";
import FieldEditForm from "@/features/fields/components/FieldEditForm";
import { useAppSelector } from "@/store";
import { FieldAction, FieldId } from "../../types";
import { selectFields } from "@features/fields/fieldsSlice";

type FieldsDetailContent = {
  isLoading?: boolean;
  action: FieldAction;
  fieldId: FieldId;
};

const FieldsDetailContent = ({ action, fieldId }: FieldsDetailContent) => {
  const fields = useAppSelector(selectFields);
  const selectedField = fields.find((f) => f.id === fieldId);
  return (
    <div className="p-1 pt-3 h-full flex w-full">
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
