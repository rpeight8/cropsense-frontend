import { ComponentPropsWithoutRef } from "react";
import { format } from "date-fns";

type FieldSummarySeasonItemProps = ComponentPropsWithoutRef<"li"> & {
  seasonName: string;
  startDate: string;
  endDate: string;
  cropName: string;
  cropColor: string;
};

const FieldSummarySeasonItem = ({
  className,
  seasonName,
  startDate,
  endDate,
  cropName,
  cropColor,
  ...props
}: FieldSummarySeasonItemProps) => {
  return (
    <li>
      <div className="grid grid-rows-3 text-sm border-b py-2">
        <div>{seasonName}</div>
        <div className="text-muted-foreground">
          {format(new Date(startDate), "P")} - {format(new Date(endDate), "P")}
        </div>
        <div className="text-muted-foreground">{cropName}</div>
      </div>
    </li>
  );
};

export default FieldSummarySeasonItem;
