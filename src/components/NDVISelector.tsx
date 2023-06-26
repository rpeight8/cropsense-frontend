import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { ComponentPropsWithoutRef } from "react";
import List from "@/components//ui/List/List";

type NDVISelectorProps = ElementProps<typeof ScrollArea> &
  ComponentPropsWithoutRef<"div">;

const NDVISelector = ({ className }: NDVISelectorProps) => {
  return (
    <div
      className={cn(
        "flex justify-center border border-indigo-500",
        {},
        className
      )}
    >
      <ScrollArea className="w-full h-full rounded-md border">
        {/* <List items /> */}
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
