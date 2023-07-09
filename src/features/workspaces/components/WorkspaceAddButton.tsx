import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

type WorkspaceAddButtonProps = ElementProps<typeof Button>;

const WorkspaceAddButton = ({
  className,
  ...props
}: WorkspaceAddButtonProps) => {
  return (
    <Button variant="default" className={className} {...props}>
      <Plus className="h-4 w-4 mr-1" />
      Add workspace
    </Button>
  );
};

export default WorkspaceAddButton;
