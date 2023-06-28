import { cn, japaneseDateToShortDate } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { ComponentPropsWithoutRef } from "react";
import List from "@/components//ui/List/List";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectNDVIByFieldId,
  selectSelectedNDVIId,
  setSelectedNDVIId,
} from "@/features/ndvi/ndviSlice";
import { FieldId } from "@/types";
import NDVIDateButton from "@/components/NDVIDateButton";

type NDVISelectorProps = ElementProps<typeof ScrollArea> &
  ComponentPropsWithoutRef<"div"> & {
    fieldId: FieldId;
  };

const NDVISelector = ({ className, fieldId }: NDVISelectorProps) => {
  const NDVIs = useAppSelector((state) => selectNDVIByFieldId(state, fieldId));
  const dispatch = useAppDispatch();
  const selectedNDVIId = useAppSelector(selectSelectedNDVIId);

  const dateItems =
    NDVIs &&
    NDVIs.length &&
    NDVIs.map((NDVI) => ({
      id: NDVI.id,
      title: japaneseDateToShortDate(NDVI.date),
    }));

  if (!selectedNDVIId) {
    if (dateItems && dateItems.length)
      dispatch(setSelectedNDVIId(dateItems[dateItems.length - 1].id));
  } else {
    if (dateItems && dateItems.length) {
      const selectedNDVI = dateItems.find((item) => item.id === selectedNDVIId);
      if (!selectedNDVI)
        dispatch(setSelectedNDVIId(dateItems[dateItems.length - 1].id));
    } else {
      dispatch(setSelectedNDVIId(undefined));
    }
  }

  return (
    <div className={cn("flex justify-center h-auto", {}, className)}>
      <ScrollArea className="w-3/4 rounded-md bg-primary">
        {dateItems && dateItems.length && (
          <List
            className="flex gap-x-3 justify-center"
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
        )}
        <ScrollBar
          forceMount={true}
          orientation="horizontal"
          className="border-yellow-400"
        />
      </ScrollArea>
    </div>
  );
};

export default NDVISelector;
