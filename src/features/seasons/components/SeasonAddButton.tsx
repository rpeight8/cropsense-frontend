import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

type SeasonAddButtonProps = ElementProps<typeof Button>;

const SeasonAddButton = ({ className, ...props }: SeasonAddButtonProps) => {
  return (
    <Button variant="default" className={className} {...props}>
      <Plus className="h-4 w-4 mr-1" />
      Add season
    </Button>
  );
};

export default SeasonAddButton;
