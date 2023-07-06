import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type SpinnerLoaderProps = ComponentPropsWithoutRef<"div"> & {
  backgroundOverlayClassName?: string;
  spinnerClassName?: string;
};

const SpinnerLoader = ({
  className,
  backgroundOverlayClassName,
  spinnerClassName,
  ...props
}: SpinnerLoaderProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 h-full w-full flex justify-center items-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "bg-secondary/50 absolute h-full w-full",
          backgroundOverlayClassName
        )}
      />
      <Spinner className={cn("w-12 h-12", spinnerClassName)} />
    </div>
  );
};

export default SpinnerLoader;
