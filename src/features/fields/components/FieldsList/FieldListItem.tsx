import { Link, NavLink } from "react-router-dom";

import { Field, FieldForDisplay } from "@/types";
import { cn } from "@/lib/utils";

import ListItem from "@/components/ui/List/ListItem";
import { ComponentPropsWithoutRef, useCallback } from "react";
import {
  selectHoveredFieldId,
  selectSelectedFieldId,
  setHoveredFieldId,
} from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";

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
  const hoveredFieldId = useAppSelector(selectHoveredFieldId);
  const dispatch = useDispatch();

  const onMouseOver = useCallback(() => {
    dispatch(setHoveredFieldId(id));
  }, [dispatch, id]);

  const onMouseLeave = useCallback(() => {
    dispatch(setHoveredFieldId(undefined));
  }, [dispatch]);

  return (
    <ListItem
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      className={cn("text-white flex hover:bg-slate-600", {
        "bg-slate-600": id === hoveredFieldId,
      })}
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
