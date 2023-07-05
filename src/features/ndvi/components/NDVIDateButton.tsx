import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NDVIDateButtonProps = {
  date: string;
  onClick: (date: string) => void;
  selected: boolean;
} & ElementProps<typeof Button>;

const NDVIDateButton = ({
  className,
  selected,
  onClick,
  date,
}: NDVIDateButtonProps) => {
  return (
    <Button
      variant="default"
      onClick={onClick}
      className={cn(
        "w-20 h-10",
        {
          "": selected,
          "": !selected,
        },
        className
      )}
    >
      {date}
    </Button>
  );
};

export default NDVIDateButton;
