import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type AddFieldButtonProps = React.ComponentProps<typeof Button>;

const AddFieldButton = ({
  variant = "secondary",
  className,
}: AddFieldButtonProps) => {
  console.log(className);
  return (
    <Button variant={variant} className={className}>
      <Plus className="h-4 w-4" /> Add Field
    </Button>
  );
};

export default AddFieldButton;
