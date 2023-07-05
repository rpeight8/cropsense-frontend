import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { ComponentPropsWithoutRef, memo } from "react";

import { useNDVI } from "@/features/ndvi/services";
import NDVIDatesList from "./NDVIDatesList";
import { FieldId } from "@/features/fields/types";

type NDVISelectorProps = ElementProps<typeof ScrollArea> &
  ComponentPropsWithoutRef<"div"> & {
    fieldId: FieldId;
  };

const NDVISelector = memo(({ className, fieldId }: NDVISelectorProps) => {
  const { isLoading, isError, isFetching } = useNDVI(fieldId);

  return (
    <div className={cn("flex justify-center h-11", {}, className)}>
      <ScrollArea className="w-3/4 rounded-md bg-primary px-3">
        {!isError && (
          <NDVIDatesList
            fieldId={fieldId}
            isLoading={isLoading || isFetching}
            isError={isError}
            className="flex"
          />
        )}
        <ScrollBar forceMount={true} orientation="horizontal" />
      </ScrollArea>
    </div>
  );
});

NDVISelector.displayName = "NDVISelector";

export default NDVISelector;
