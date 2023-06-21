import { NavLink } from "react-router-dom";

import { Field, FieldForDisplay, FieldWithoutCoords } from "@/types";
import { cn } from "@/lib/utils";

import ListItem from "@/components/ui/List/ListItem";

type FieldlistItemProps = FieldForDisplay & {
  className?: string;
};

const FieldListItem = ({ id, name, className = "" }: FieldlistItemProps) => {
  return (
    <ListItem className={cn("text-white flex hover:bg-slate-600", className)}>
      <NavLink
        className={({ isActive, isPending }) => {
          return cn("w-full p-2", {
            "bg-cyan-700": isActive,
            "bg-slate-700": isPending,
          });
        }}
        to={`${id}/display`}
      >
        {name}
      </NavLink>
    </ListItem>
  );
};

export default FieldListItem;
