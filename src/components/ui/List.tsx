import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/ScrollArea";

const List = ({
  children,
  ...props
}: PropsWithChildren & ComponentPropsWithoutRef<"ul">) => {
  return (
    <ScrollArea className="h-full">
      <ul {...props}>{children}</ul>
    </ScrollArea>
  );
};

export default List;
