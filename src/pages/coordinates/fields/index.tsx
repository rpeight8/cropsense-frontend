import { useNavigate } from "react-router-dom";
import { useFieldParametersHandler } from "@/hooks/useFieldParametersHandler";
import FieldAddLayout from "@/layouts/fields/FieldAddLayout";
import { useFieldAddForm } from "@/hooks/useFieldAddForm";
import SubSideBar from "@/components/SubSideBar";
import FieldAddForm from "@/components/FieldAddForm";
import FieldsMap from "@/components/FieldsMap";
import { FieldCoordinates } from "@/types";

const Fields = () => {
  const navigate = useNavigate();

  const {
    action,
    fieldId,
    initialCoordinates,
    initialZoom,
    isCoordinatesValid,
    isFieldsParamsValid,
  } = useFieldParametersHandler();
  const {
    fieldAddForm,
    FormProvider,
    onSubmit,
    onErrors,
    newField,
    isLoading: isFieldCreating,
    isSuccess: isFieldCreated,
  } = useFieldAddForm();

  // Will be handled by useFieldParametersHandler
  if (!isFieldsParamsValid || !isCoordinatesValid) {
    return null;
  }

  return (
    <>
      <FormProvider {...fieldAddForm}>
        <SubSideBar className="bg-ternary flex">
          <FieldAddForm onSubmit={onSubmit} onErrors={onErrors} />
        </SubSideBar>
        <FieldsMap
          className="flex-1"
          initialPosition={initialCoordinates}
          initialZoom={initialZoom}
          // onZoomEnd={(map) => {
          //   // const center = map.getCenter();
          //   // navigate(`/${center.lat},${center.lng},${map.getZoom()}/fields`);
          // }}
          // onDragEnd={(map) => {
          //   // const center = map.getCenter();
          //   // navigate(`/${center.lat},${center.lng},${map.getZoom()}/fields`);
          // }}
          // handleNewField={(coordinates: FieldCoordinates) => {
          //   fieldAddForm.setValue("coordinates", coordinates, {
          //     shouldValidate: true,
          //   });
          // }}
        />
      </FormProvider>
    </>
  );

  // if (action === "add") {
  //   return (
  //     <FieldAddLayout
  //       initialCoordinates={initialCoordinates}
  //       initialZoom={initialZoom}
  //     />
  //   );
  // }
};

export default Fields;
