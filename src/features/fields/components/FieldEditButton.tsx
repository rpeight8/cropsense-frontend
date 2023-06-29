import { Button } from "@/components/ui/Button";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

type EditFieldButtonProps = ElementProps<typeof Button>;

const EditFieldButton = ({
  variant = "default",
  className,
}: EditFieldButtonProps) => {
  const navigate = useNavigate();
  const { fieldId } = useURLParametersParser();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => {
        if (fieldId) {
          navigate(`${fieldId}/edit`);
        }
      }}
    >
      <Edit className="h-4 w-4" /> Edit Field
    </Button>
  );
};

export default EditFieldButton;
