import { Link } from "react-router-dom";

import { FieldForDisplay } from "../../types";
import { cn } from "@/lib/utils";

import { ComponentPropsWithoutRef, useCallback } from "react";
import {
  selectHoveredFieldId,
  selectSelectedFieldId,
  setHoveredFieldId,
} from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/Skeleton";
import { ListItem } from "@/components/ui/List";

type FieldlistItemProps = Omit<FieldForDisplay, "crop"> &
  ComponentPropsWithoutRef<"li"> & {
    className?: string;
  };

export const FieldListItemSkeleton = () => {
  return (
    <li>
      <Skeleton className="w-full my-1 p-5"></Skeleton>
    </li>
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
      selected={id === selectedFieldId}
      className={cn(
        "flex",
        {
          "bg-accent": id === hoveredFieldId && id !== selectedFieldId,
        },
        className
      )}
      {...props}
    >
      <Link className={cn("w-full p-2")} to={`${id}/display`}>
        {name}
      </Link>
    </ListItem>
  );
};

export default FieldListItem;
