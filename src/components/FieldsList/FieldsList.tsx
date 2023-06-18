import { ComponentPropsWithoutRef, useCallback } from "react";

import { selectFields } from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";

import List from "@/components/ui/List/List";
import FieldListItem from "@/components/FieldsList/FieldListItem";

type FieldListProps = ComponentPropsWithoutRef<"ul">;

const FieldsList = ({ className, ...props }: FieldListProps) => {
  const fields = useAppSelector(selectFields);

  const renderField = useCallback((field: (typeof fields)[number]) => {
    return <FieldListItem key={field.id} id={field.id} name={field.name} />;
  }, []);
  return (
    <List
      items={fields}
      renderItem={renderField}
      className={className}
      {...props}
    />
  );
};

export default FieldsList;
