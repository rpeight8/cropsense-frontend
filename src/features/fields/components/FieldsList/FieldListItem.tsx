import { Link} from "react-router-dom";

import { FieldForDisplay } from "@/types";
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
import { Skeleton } from "@/components/ui/Skeleton";

type FieldlistItemProps = Omit<FieldForDisplay, "crop"> &
  ComponentPropsWithoutRef<"li"> & {
    className?: string;
  };

export const FieldListItemSkeleton = () => {
  return (
    <ListItem className={cn("text-white flex")}>
      <Skeleton className="w-full my-1 p-5"></Skeleton>
    </ListItem>
  );
};

const FieldListItem = ({
  id,
  name,
  className,
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
      className={cn(
        "text-white flex hover:bg-slate-600",
        {
          "bg-slate-600": id === hoveredFieldId,
        },
        className
      )}
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
