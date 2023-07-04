import { ComponentPropsWithoutRef, useCallback } from "react";

import {
  selectFields,
  selectHoveredFieldId,
  setHoveredFieldId,
} from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";

import List from "@/components/ui/List/List";
import FieldListItem, {
  FieldListItemSkeleton,
} from "@/features/fields/components/FieldsList/FieldListItem";
import { Field, FieldId } from "@/types";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/Skeleton";

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
      <List
        items={skeletonFields}
        renderItem={renderSkeletonField}
        className={className}
        {...props}
      />
    );
  }
  return (
    <List
      items={fields}
      renderItem={renderField}
      className={cn("p-0", className)}
      {...props}
    />
  );
};

export default FieldsList;