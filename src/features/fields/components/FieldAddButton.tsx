import { Button } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AddFieldButtonProps = ElementProps<typeof Button>;

const AddFieldButton = ({
  className,
  isLoading,
  ...props
}: AddFieldButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="default"
      className={className}
      onClick={() => {
        navigate("add");
      }}
      isLoading={isLoading}
      {...props}
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
