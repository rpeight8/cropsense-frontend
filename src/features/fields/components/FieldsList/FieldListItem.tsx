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
    <li
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      className={cn(
        "flex",
        {
          "bg-secondary/20": id === hoveredFieldId,
        },
        className
      )}
      {...props}
    >
      <Link
        className={cn("w-full p-2", {
          "bg-secondary": selectedFieldId === id,
        })}
        to={`${id}/display`}
      >
        {name}
      </Link>
    </li>
  );
};

export default FieldListItem;
