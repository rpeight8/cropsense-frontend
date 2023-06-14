import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type ListItem = PropsWithChildren & ComponentPropsWithoutRef<"li">;

const ListItem = ({ children, className, ...props }: ListItem) => {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
};

export default ListItem;
