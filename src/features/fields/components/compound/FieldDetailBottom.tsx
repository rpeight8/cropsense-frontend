import EditFieldButton from "@/features/fields/components/FieldEditButton";
import FieldEditForm from "@/features/fields/components/FieldEditForm";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import {
  selectFields,
  selectSelectedFieldId,
} from "@features/fields/fieldsSlice";

const FieldsDetailBottom = () => {
  const selectedFieldId = useAppSelector(selectSelectedFieldId);
  const fields = useAppSelector(selectFields);
  const selectedField = fields.find((f) => f.id === selectedFieldId);
  const { action } = useURLParametersParser();

  return (
    <div
      className={cn(
        "h-[350px] w-[full] animate-fade-right transition-all duration-100 animate-fade-up animate-once animate-ease-linear animate-reverse animate-fill-backwards",
        {
          "h-0 overflow-hidden": !selectedFieldId || !selectedField,
        }
      )}
    >
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
            <EditFieldButton />
          </>
        ))}
    </div>
  );
};

export default FieldsDetailBottom;
