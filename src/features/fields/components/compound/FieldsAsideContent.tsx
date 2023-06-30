import FieldsList from "@/features/fields/components/FieldsList/FieldsList";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { useAppSelector } from "@/store";
import { selectFields } from "@/features/fields/fieldsSlice";
import FieldAddButton from "@/features/fields/components/FieldAddButton";
import FieldAddForm from "@/features/fields/components/FieldAddForm";
import { ComponentPropsWithoutRef, memo } from "react";
import { cn } from "@/lib/utils";
import { FieldAction } from "@/types";

type FieldsSideBarProps = {
  isFieldsLoading?: boolean;
  isFieldsError?: boolean;
  action?: FieldAction;
};

const FieldsAsideContent = memo(
  ({ isFieldsLoading, action }: FieldsSideBarProps) => {
    const fields = useAppSelector(selectFields);

    return (
      <>
        {action === "add" ? (
          <FieldAddForm />
        ) : (
          <>
            <FieldsList isLoading={isFieldsLoading} fields={fields} />
            <FieldAddButton />
          </>
        )}
      </>
    );
  }
);

export default FieldsAsideContent;
