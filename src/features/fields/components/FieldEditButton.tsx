import { Button } from "@/components/ui/Button";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { FieldId } from "../types";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSelectedFieldId } from "../fieldsSlice";

type EditFieldButtonProps = ElementProps<typeof Button>;

const FieldEditButton = ({ className }: EditFieldButtonProps) => {
  const navigate = useNavigate();
  const selectedFieldId = useSelector(selectSelectedFieldId);

  return (
    <Button
      variant="default"
      className={className}
      onClick={() => {
        if (selectedFieldId) {
          navigate(`${selectedFieldId}/edit`);
        }
      }}
    >
      <Edit className="h-4 w-4" /> Edit Field
    </Button>
  );
};

export default FieldEditButton;
