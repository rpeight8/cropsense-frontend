import FieldsList from "@/features/fields/components/FieldsList/FieldsList";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectFields } from "@/features/fields/fieldsSlice";
import FieldAddButton from "@/features/fields/components/FieldAddButton";
import FieldAddForm from "@/features/fields/components/FieldAddForm";
import { memo, useEffect } from "react";
import { FieldAction } from "../../types";
import { resetAddField } from "@/features/forms/formsSlice";

type FieldsSideBarProps = {
  isFieldsLoading?: boolean;
  isFieldsError?: boolean;
  action?: FieldAction;
};

const FieldsAsideContent = memo(
  ({ isFieldsLoading, action }: FieldsSideBarProps) => {
    const fields = useAppSelector(selectFields);
    const dispatch = useAppDispatch();

    // Hack to clear state of add field form
    useEffect(() => {
      if (action === "add") {
        dispatch(resetAddField());
      }
    }, [action, dispatch]);

    return (
      <>
        {action === "add" ? (
          <FieldAddForm />
        ) : (
          <>
            <FieldsList isLoading={isFieldsLoading} fields={fields} />
            <FieldAddButton isLoading={isFieldsLoading} />
          </>
        )}
      </>
    );
  }
);

FieldsAsideContent.displayName = "FieldsAsideContent";

export default FieldsAsideContent;
