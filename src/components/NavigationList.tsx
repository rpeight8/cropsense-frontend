import { ComponentPropsWithoutRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const NavigationSideBar = ({ ...props }: ComponentPropsWithoutRef<"div">) => {
  const items = Array(50)
    .fill("Navigation Item")
    .map((item, index) => (
      <li key={index} className={cn("text-white p-3")}>
        {item + `-${index}`}
        <Separator className={cn("bg-white")} />
      </li>
    ));
  return (
    <ScrollArea className={cn("h-full")}>
      <ul>{items}</ul>
    </ScrollArea>
  );
};

export default NavigationSideBar;
