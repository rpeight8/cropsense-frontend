import FieldsList from "@/features/fields/components/FieldsList/FieldsList";
import { useAppSelector } from "@/store";
import FieldAddButton from "@/features/fields/components/FieldAddButton";
import FieldAddForm from "@/features/fields/components/FieldAddForm";
import { useCallback } from "react";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { selectSelectedSeasonId } from "@/features/seasons/seasonsSlice";
import { useToast } from "@/components/ui/Toast/useToast";
import { useNavigate } from "react-router-dom";

const FieldsAsideContent = () => {
  const { toast } = useToast();
  const { action } = useURLParametersParser();
  const navigate = useNavigate();
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);

  const handleAddSuccess = useCallback(() => {
    toast({
      title: "Field added",
      description: "Field has been successfully added",
      variant: "default",
    });
    navigate("");
  }, [navigate, toast]);

  const handleAddError = useCallback(() => {
    toast({
      title: "Error",
      description: "Field has not been added",
      variant: "destructive",
    });
  }, [toast]);

  return (
    <>
      {action === "add" ? (
        selectedSeasonId && (
          <FieldAddForm
            addToSeasonsId={selectedSeasonId}
            onSuccess={handleAddSuccess}
            onError={handleAddError}
          />
        )
      ) : (
        <>
          <FieldsList />
          <FieldAddButton className="mt-auto" disabled={!selectedSeasonId} />
        </>
      )}
    </>
  );
};

FieldsAsideContent.displayName = "FieldsAsideContent";

export default FieldsAsideContent;
