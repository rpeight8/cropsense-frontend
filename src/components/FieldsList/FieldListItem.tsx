import { Link, NavLink } from "react-router-dom";

import { Field, FieldForDisplay } from "@/types";
import { cn } from "@/lib/utils";

import ListItem from "@/components/ui/List/ListItem";
import { ComponentPropsWithoutRef } from "react";
import { selectSelectedFieldId } from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";

type FieldlistItemProps = FieldForDisplay &
  ComponentPropsWithoutRef<"li"> & {
    className?: string;
  };

const FieldListItem = ({
  id,
  name,
  className = "",
  ...props
}: FieldlistItemProps) => {
  const selectedFieldId = useAppSelector(selectSelectedFieldId);
  return (
    <ListItem
      className={cn("text-white flex hover:bg-slate-600", className)}
      {...props}
    >
      <Link
        className={cn("w-full p-2", {
          "bg-cyan-700": selectedFieldId === id,
        })}
        to={`${id}/display`}
      >
        {name}
      </Link>
    </ListItem>
  );
};

export default FieldListItem;
