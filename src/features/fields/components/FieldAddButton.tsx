import { Button } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AddFieldButtonProps = ElementProps<typeof Button>;

const AddFieldButton = ({
  variant = "secondary",
  className,
  isLoading,
}: AddFieldButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => {
        navigate("add");
      }}
      isLoading={isLoading}
    >
      {isLoading ? (
        <Spinner className="h-4 w-4 mr-1" />
      ) : (
        <Plus className="h-4 w-4 mr-1" />
      )}{" "}
      Add Field
    </Button>
  );
};

export default AddFieldButton;
