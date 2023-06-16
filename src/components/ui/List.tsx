import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";

const List = ({
  children,
  className,
  ...props
}: PropsWithChildren & ComponentPropsWithoutRef<"ul">) => {
  return (
    <ScrollArea className="h-full">
      <ul className={cn("p-2", className)} {...props}>
        {children}
      </ul>
    </ScrollArea>
  );
};

export default List;
