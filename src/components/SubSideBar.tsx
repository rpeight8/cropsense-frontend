import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";

const DetailedInfoSideBar = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"aside"> & PropsWithChildren) => {
  return (
    <aside className={cn("w-[250px]", className)} {...props}>
      <nav className="h-full w-full flex flex-col">{children}</nav>
    </aside>
  );
};

export default DetailedInfoSideBar;
