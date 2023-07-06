import {
  selectNDVIByFieldId,
  selectSelectedNDVIId,
  setSelectedNDVIId,
} from "../ndviSlice";
import List from "@/components/ui/List";
import { useAppDispatch, useAppSelector } from "@/store";
import NDVIDateButton from "./NDVIDateButton";
import { cn, japaneseDateToShortDate } from "@/lib/utils";
import { ComponentPropsWithoutRef, useCallback } from "react";
import Spinner from "@/components/ui/Spinner";
import { FieldId } from "@/features/fields/types";

type NDVIDatesListProps = {
  fieldId: FieldId;
  isLoading?: boolean;
  isError?: boolean;
} & ComponentPropsWithoutRef<"ul">;

const NDVIDatesList = ({
  fieldId,
  isLoading,
  isError,
  className,
}: NDVIDatesListProps) => {
  const NDVIs = useAppSelector((state) => selectNDVIByFieldId(state, fieldId));
  const dispatch = useAppDispatch();
  const selectedNDVIId = useAppSelector(selectSelectedNDVIId);

  const renderItem = useCallback(
    (item: (typeof NDVIs)[number]) => {
      const title = japaneseDateToShortDate(item.date);
      return (
        <NDVIDateButton
          date={title}
          onClick={() => dispatch(setSelectedNDVIId(item.id))}
          selected={item.id === selectedNDVIId}
          key={item.id}
          className="h-full"
        >
          {title}
        </NDVIDateButton>
      );
    },
    [selectedNDVIId]
  );

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center h-11">
        <Spinner />
      </div>
    );
  if (isError) return <div>Error</div>;

  return (
    <List
      className={cn("flex gap-x-3 justify-center h-11", {}, className)}
      items={NDVIs}
      renderItem={renderItem}
    />
  );
};

export default NDVIDatesList;
