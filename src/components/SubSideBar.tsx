import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";

const DetailedInfoSideBar = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"aside"> & PropsWithChildren) => {
  return (
    <aside className={cn("w-[200px]", className)} {...props}>
      <nav className="h-full">
        <ScrollArea className="h-full">{children}</ScrollArea>
      </nav>
    </aside>
  );
};

export default DetailedInfoSideBar;
