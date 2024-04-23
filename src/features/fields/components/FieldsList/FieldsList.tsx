import { ComponentPropsWithoutRef, useCallback, useEffect } from "react";

import List from "@/components/ui/List";
import FieldListItem, {
  FieldListItemSkeleton,
} from "@/features/fields/components/FieldsList/FieldListItem";
import { cn } from "@/lib/utils";
import { selectSelectedSeasonId } from "@/features/seasons/seasonsSlice";
import { useAppSelector } from "@/store";
import { useSeasonFields } from "../../services";
import { useToast } from "@/components/ui/Toast/useToast";

type FieldListProps = ComponentPropsWithoutRef<"ul"> & {
  isLoading?: boolean;
};

const FieldsList = ({ className, ...props }: FieldListProps) => {
  const { toast } = useToast();
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);
  const {
    data: fields,
    isLoading,
    isFetching,
    isError,
  } = useSeasonFields(selectedSeasonId);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Could not load fields",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  const renderField = useCallback(
    (field: NonNullable<typeof fields>[number]) => {
      return <FieldListItem key={field.id} id={field.id} name={field.name} />;
    },
    []
  );

  const renderSkeletonField = useCallback((skeleton: { id: string }) => {
    return <FieldListItemSkeleton key={skeleton.id} />;
  }, []);

  if ((isLoading && isFetching) || isFetching) {
    const skeletonFields = Array.from({ length: 10 }, (_, i) => ({
      id: `skeleton-${i}`,
    }));

    return (
      <List className={className} {...props}>
        {skeletonFields.map(renderSkeletonField)}
      </List>
    );
  }

  if (!fields) {
    return null;
  }

  return (
    <List className={cn("p-0", className)} {...props}>
      {fields.map(renderField)}
    </List>
  );
};

export default FieldsList;
