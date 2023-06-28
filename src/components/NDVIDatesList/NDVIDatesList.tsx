import {
  selectNDVIByFieldId,
  selectSelectedNDVIId,
  setSelectedNDVIId,
} from "@/features/ndvi/ndviSlice";
import List from "@/components/ui/List/List";
import { useAppDispatch, useAppSelector } from "@/store";
import { FieldId } from "@/types";
import NDVIDateButton from "../NDVIDateButton";
import { cn, japaneseDateToShortDate } from "@/lib/utils";
import { Component, ComponentPropsWithoutRef } from "react";

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const dateItems = NDVIs.map((NDVI) => ({
    id: NDVI.id,
    title: japaneseDateToShortDate(NDVI.date),
  }));

  return (
    <List
      className={cn("flex gap-x-3 justify-center", {}, className)}
      items={dateItems}
      renderItem={(item) => {
        return (
          <NDVIDateButton
            date={item.title}
            onClick={() => dispatch(setSelectedNDVIId(item.id))}
            selected={item.id === selectedNDVIId}
            key={item.id}
          >
            {item.title}
          </NDVIDateButton>
        );
      }}
    />
  );
};

export default NDVIDatesList;
