import { ComponentPropsWithoutRef, useCallback } from "react";

import {
  selectFields,
  selectHoveredFieldId,
  setHoveredFieldId,
} from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";

import List from "@/components/ui/List/List";
import FieldListItem from "@/features/fields/components/FieldsList/FieldListItem";
import { Field, FieldId } from "@/types";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";

type FieldListProps = ComponentPropsWithoutRef<"ul"> & {
  fields: Field[];
  isLoading?: boolean;
};

const FieldsList = ({
  className,
  isLoading,
  fields,
  ...props
}: FieldListProps) => {
  const renderField = useCallback((field: (typeof fields)[number]) => {
    return <FieldListItem key={field.id} id={field.id} name={field.name} />;
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
