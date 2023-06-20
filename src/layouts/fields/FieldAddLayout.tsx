import FieldAddForm from "@/components/FieldAddForm";
import SubSideBar from "@/components/SubSideBar";
import FieldMap from "@/components/FieldsMap";
import { FormProvider } from "react-hook-form";
import { useFields } from "@/services/fields";
import { useFieldAddForm } from "@/hooks/useFieldAddForm";
import { Coordinates, FieldCoordinates } from "@/types";
import { useNavigate } from "react-router-dom";

type FieldAddLayoutProps = {
  initialCoordinates: Coordinates;
  initialZoom: number;
};

const FieldAddLayout = ({
  initialCoordinates,
  initialZoom,
}: FieldAddLayoutProps) => {
  const navigate = useNavigate();

  const {
    fieldAddForm,
    FormProvider,
    onSubmit,
    onErrors,
    newField,
    isLoading: isFieldCreating,
    isSuccess: isFieldCreated,
  } = useFieldAddForm();

  return (
    <>
      <FormProvider {...fieldAddForm}>
        <SubSideBar className="bg-ternary flex">
          <FieldAddForm onSubmit={onSubmit} onErrors={onErrors} />
        </SubSideBar>
        <FieldMap
          className="flex-1"
          initialPosition={initialCoordinates}
          initialZoom={initialZoom}
          onZoomEnd={(map) => {
            // const center = map.getCenter();
            // navigate(`/${center.lat},${center.lng},${map.getZoom()}/fields`);
          }}
          onDragEnd={(map) => {
            // const center = map.getCenter();
            // navigate(`/${center.lat},${center.lng},${map.getZoom()}/fields`);
          }}
          handleNewField={(coordinates: FieldCoordinates) => {
            fieldAddForm.setValue("coordinates", coordinates, {
              shouldValidate: true,
            });
          }}
        />
      </FormProvider>
    </>
  );
};

export default FieldAddLayout;
