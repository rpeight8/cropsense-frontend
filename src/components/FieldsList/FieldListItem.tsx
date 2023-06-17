import { NavLink } from "react-router-dom";

import { Field } from "@/types";
import { cn } from "@/lib/utils";

import ListItem from "@/components/ui/List/ListItem";

type FieldlistItemProps = Field;

const FieldListItem = ({ id, text }: FieldlistItemProps) => {
  return (
    <ListItem className={cn("text-white flex hover:bg-slate-600")}>
      <NavLink
        className={({ isActive, isPending }) => {
          return cn("w-full p-2", {
            "bg-cyan-700": isActive,
            "bg-slate-700": isPending,
          });
        }}
        to={`display/${id}`}
      >
        {text}
      </NavLink>
    </ListItem>
  );
};

export default FieldListItem;
