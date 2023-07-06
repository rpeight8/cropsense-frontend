import { ComponentPropsWithoutRef, useCallback } from "react";

import List from "@/components/ui/List";
import FieldListItem, {
  FieldListItemSkeleton,
} from "@/features/fields/components/FieldsList/FieldListItem";
import { Field } from "../../types";
import { cn } from "@/lib/utils";

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

  const renderSkeletonField = useCallback((skeleton: { id: string }) => {
    return <FieldListItemSkeleton key={skeleton.id} />;
  }, []);

  if (isLoading) {
    const skeletonFields = Array.from({ length: 10 }, (_, i) => ({
      id: `skeleton-${i}`,
    }));

    return (
      <List className={className} {...props}>
        {skeletonFields.map(renderSkeletonField)}
      </List>
    );
  }
  return (
    <List className={cn("p-0", className)} {...props}>
      {fields.map(renderField)}
    </List>
  );
};

export default FieldsList;
