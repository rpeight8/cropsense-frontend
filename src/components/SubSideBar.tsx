import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type SubSideBarProps = PropsWithChildren & ComponentPropsWithoutRef<"aside">;

const DetailedInfoSideBar = ({
  children,
  className,
  ...props
}: SubSideBarProps) => {
  return (
    <aside className={cn("w-[250px]", className)} {...props}>
      <nav className="h-full w-full flex flex-col">{children}</nav>
    </aside>
  );
};

export default DetailedInfoSideBar;
