import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AddFieldButtonProps = React.ComponentProps<typeof Button>;

const AddFieldButton = ({
  variant = "secondary",
  className,
}: AddFieldButtonProps) => {
  const navigate = useNavigate();
  console.log(className);
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => {
        navigate("add");
      }}
    >
      <Plus className="h-4 w-4" /> Add Field
    </Button>
  );
};

export default AddFieldButton;
