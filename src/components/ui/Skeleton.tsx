import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type SkeletonProps = ComponentPropsWithoutRef<"div">;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary/20", className)}
      {...props}
    />
  );
}

export { Skeleton };
