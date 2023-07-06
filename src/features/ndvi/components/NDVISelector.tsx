import { cn, japaneseDateToShortDate } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { ComponentPropsWithoutRef, memo, useCallback } from "react";

import { useNDVI } from "@/features/ndvi/services";
import NDVIDatesList from "./NDVIDatesList";
import { FieldId } from "@/features/fields/types";
import List from "@/components/ui/List";
import {
  selectNDVIByFieldId,
  selectSelectedNDVIId,
  setSelectedNDVIId,
} from "../ndviSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

type NDVISelectorProps = ElementProps<typeof ScrollArea> &
  ComponentPropsWithoutRef<"div"> & {
    fieldId: FieldId;
  };

const NDVISelector = memo(({ className, fieldId }: NDVISelectorProps) => {
  const { isLoading, isError, isFetching } = useNDVI(fieldId);
  const NDVIs = useAppSelector((state) => selectNDVIByFieldId(state, fieldId));
  const dispatch = useAppDispatch();
  const selectedNDVIId = useAppSelector(selectSelectedNDVIId);

  const onClick = useCallback(
    (id: string) => {
      if (id) {
        dispatch(setSelectedNDVIId(id));
      }
    },
    [dispatch]
  );

  const renderItem = useCallback(
    (item: (typeof NDVIs)[number]) => {
      const title = japaneseDateToShortDate(item.date);
      return (
        <li key={item.id}>
          <Button
            variant="default"
            onClick={() => {
              onClick(item.id);
            }}
            className={cn("p-0 h-7 px-4", {
              "bg-border text-primary hover:bg-border text-primary":
                selectedNDVIId === item.id,
            })}
          >
            {title}
          </Button>
        </li>
      );
    },
    [onClick, selectedNDVIId]
  );

  return (
    <div className={cn("flex justify-center h-11 ", {}, className)}>
      <ScrollArea className="w-3/4 rounded-lg px-3flex items-center justify-center bg-secondary">
        {isLoading && (
          <div className="w-full flex justify-center items-center h-11">
            <Spinner />
          </div>
        )}
        {!isError && (
          <List className="flex flex-row gap-x-2 justify-center">
            {NDVIs.map(renderItem)}
          </List>
        )}
        <ScrollBar forceMount={true} orientation="horizontal" />
      </ScrollArea>
    </div>
  );
});

NDVISelector.displayName = "NDVISelector";

export default NDVISelector;
