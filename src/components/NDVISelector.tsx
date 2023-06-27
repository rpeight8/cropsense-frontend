import { cn, japaneseDateToShortDate } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { ComponentPropsWithoutRef } from "react";
import List from "@/components//ui/List/List";
import { useAppSelector } from "@/store";
import { selectNDVIByFieldId } from "@/features/ndvi/ndviSlice";
import { FieldId } from "@/types";

type NDVISelectorProps = ElementProps<typeof ScrollArea> &
  ComponentPropsWithoutRef<"div"> & {
    fieldId: FieldId;
  };

const NDVISelector = ({ className, fieldId }: NDVISelectorProps) => {
  const NDVIs = useAppSelector((state) => selectNDVIByFieldId(state, fieldId));

  const dateItems =
    NDVIs &&
    NDVIs.length &&
    NDVIs.map((NDVI) => ({
      id: NDVI.id,
      title: japaneseDateToShortDate(NDVI.date),
    }));

  return (
    <div className={cn("flex justify-center h-[40px]", {}, className)}>
      <ScrollArea className="w-3/4 rounded-md bg-primary">
        {dateItems && dateItems.length && (
          <List
            className="flex gap-x-7 justify-center"
            items={dateItems}
            renderItem={(item) => {
              return <div key={item.id}>{item.title}</div>;
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
