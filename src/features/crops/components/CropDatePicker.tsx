import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { ComponentPropsWithoutRef, useState } from "react";

type CropDatePickerProps = ComponentPropsWithoutRef<typeof Button> & {
  onButtonBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onButtonChange?: (date: Date | undefined) => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  date?: Date;
};

const CropDatePicker = ({
  onButtonBlur,
  onButtonChange,
  buttonRef,
  date,
  disabled,
}: CropDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  console.log(disabled);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onBlur={onButtonBlur}
          ref={buttonRef}
          variant={"outline"}
          className={cn(
            "w-[170px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selectedDate}
          onSelect={(date) => {
            console.log(date);
            setSelectedDate(date);
            onButtonChange?.(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CropDatePicker;
