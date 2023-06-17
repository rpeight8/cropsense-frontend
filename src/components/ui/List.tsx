import { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from "react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
} & ComponentPropsWithoutRef<"ul">;

const List = <T,>({ items, renderItem, className, ...props }: ListProps<T>) => {
  return (
    <ScrollArea className="h-full">
      <ul className={cn("p-2", className)} {...props}>
        {items.map(renderItem)}
      </ul>
    </ScrollArea>
  );
};

export default List;
