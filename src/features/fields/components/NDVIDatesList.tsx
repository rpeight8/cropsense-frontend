import {
  selectNDVIByFieldId,
  selectSelectedNDVIId,
  setSelectedNDVIId,
} from "@/features/ndvi/ndviSlice";
import List from "@/components/ui/List/List";
import { useAppDispatch, useAppSelector } from "@/store";
import { FieldId } from "@/types";
import NDVIDateButton from "./NDVIDateButton";
import { cn, japaneseDateToShortDate } from "@/lib/utils";
import { Component, ComponentPropsWithoutRef, useCallback } from "react";

type NDVIDatesListProps = {
  fieldId: FieldId;
  isLoading?: boolean;
  isError?: boolean;
} & ComponentPropsWithoutRef<"ul">;

const NDVIDatesList = ({
  fieldId,
  isLoading = false,
  isError = false,
  className,
}: NDVIDatesListProps) => {
  const NDVIs = useAppSelector((state) => selectNDVIByFieldId(state, fieldId));
  const dispatch = useAppDispatch();
  const selectedNDVIId = useAppSelector(selectSelectedNDVIId);
  const dateItems = NDVIs.map((NDVI) => ({
    id: NDVI.id,
    title: japaneseDateToShortDate(NDVI.date),
  }));

  const renderItem = useCallback((item: (typeof NDVIs)[number]) => {
    const title = japaneseDateToShortDate(item.date);
    return (
      <NDVIDateButton
        date={title}
        onClick={() => dispatch(setSelectedNDVIId(item.id))}
        selected={item.id === selectedNDVIId}
        key={item.id}
      >
        {title}
      </NDVIDateButton>
    );
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <List
      className={cn("flex gap-x-3 justify-center", {}, className)}
      items={NDVIs}
      renderItem={renderItem}
    />
  );
};

export default NDVIDatesList;
