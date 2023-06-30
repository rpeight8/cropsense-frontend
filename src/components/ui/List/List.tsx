import { ComponentPropsWithoutRef, ReactNode, memo } from "react";

import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
} & ComponentPropsWithoutRef<"ul">;

export const List = <T,>({
  items,
  renderItem,
  className,
  ...props
}: ListProps<T>) => {
  return (
    <ScrollArea className="h-full">
      {(items && items.length && (
        <ul className={cn("p-2", className)} {...props}>
          {items.map(renderItem)}
        </ul>
      )) || (
        <div className="flex justify-center items-center h-full">No data</div>
      )}
    </ScrollArea>
  );
};

export const MemoizedList = memo(List) as typeof List & {
  displayName: string;
};

MemoizedList.displayName = "List";

export default MemoizedList;
