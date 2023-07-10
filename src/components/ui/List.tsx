import { ComponentPropsWithoutRef, PropsWithChildren, memo } from "react";

import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";

type ListProps = ComponentPropsWithoutRef<"ul">;

export const List = ({ className, children, ...props }: ListProps) => {
  return (
    <ScrollArea className="h-full">
      {children ? (
        <ul className={cn("flex flex-col p-2", className)} {...props}>
          {children}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-full flex-1">
          No data
        </div>
      )}
    </ScrollArea>
  );
};

type ListItem = PropsWithChildren &
  ComponentPropsWithoutRef<"li"> & {
    selected?: boolean;
  };

export const ListItem = ({
  children,
  className,
  selected,
  ...props
}: ListItem) => {
  return (
    <li
      className={cn(
        "cursor-pointer",
        {
          "hover:bg-accent hover:text-accent-foreground transition-colors duration-150":
            !selected,
          "bg-accent text-accent-foreground": selected,
        },
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
};

export const MemoizedList = memo(List) as typeof List & {
  displayName: string;
};

MemoizedList.displayName = "List";

export default MemoizedList;
