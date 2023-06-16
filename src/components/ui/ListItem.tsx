import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type ListItem = PropsWithChildren & ComponentPropsWithoutRef<"li">;

const ListItem = ({ children, className, ...props }: ListItem) => {
  return (
    <li className={cn("text-base", className)} {...props}>
      {children}
    </li>
  );
};

export default ListItem;
