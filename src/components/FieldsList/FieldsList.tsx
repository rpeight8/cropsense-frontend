import { ComponentPropsWithoutRef, useCallback } from "react";

import { selectFields } from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";

import List from "@/components/ui/List/List";
import FieldListItem from "@/components/FieldsList/FieldListItem";
import { FieldId } from "@/types";
import { cn } from "@/lib/utils";

type FieldListProps = ComponentPropsWithoutRef<"ul"> & {
  highlightedFieldId?: FieldId;
};

const FieldsList = ({
  className,
  highlightedFieldId,
  ...props
}: FieldListProps) => {
  const fields = useAppSelector(selectFields);

  const renderField = useCallback(
    (field: (typeof fields)[number]) => {
      return (
        <FieldListItem
          key={field.id}
          id={field.id}
          name={field.name}
          className={cn("", {
            "bg-slate-600": field.id === highlightedFieldId,
          })}
        />
      );
    },
    [highlightedFieldId]
  );
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
