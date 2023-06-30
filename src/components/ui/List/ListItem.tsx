import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ListItem = PropsWithChildren & ComponentPropsWithoutRef<"li">;

const ListItem = ({ children, className, ...props }: ListItem) => {
  return (
    <li className={cn("text-base", className)} {...props}>
      {children}
    </li>
  );
};

export default ListItem;
