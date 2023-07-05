import { Button } from "@/components/ui/Button";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { FieldId } from "../types";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

type EditFieldButtonProps = ElementProps<typeof Button> & {
  fieldId: FieldId;
};

const FieldEditButton = ({ fieldId, className }: EditFieldButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="default"
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

export default FieldEditButton;
