import FieldAddForm from "@/components/FieldAddForm";
import SubSideBar from "@/components/SubSideBar";
import FieldMap, { MapFromEvents } from "@/components/FieldsMap";
import { useFieldAddForm } from "@/hooks/useFieldAddForm";
import { FieldCoordinates } from "@/types";
import { useNavigate } from "react-router-dom";
import FieldsList from "@/components/FieldsList/FieldsList";
import FieldAddButton from "@/components/FieldAddButton";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { useCallback } from "react";

const FieldLayout = () => {
  const navigate = useNavigate();
  const { action, fieldId, initialCoordinates, initialZoom } =
    useURLParametersParser();
  const {
    fieldAddForm,
    FormProvider,
    onSubmit,
    onErrors,
    newField,
    isLoading: isFieldCreating,
    isSuccess: isFieldCreated,
  } = useFieldAddForm();

  const onMapCoordinatesChange = useCallback(
    (map: MapFromEvents) => {
      const center = map.getCenter();
      const lat = Number(center.lat.toFixed(5));
      const lng = Number(center.lng.toFixed(5));

      const url = [`/${lat},${lng},${map.getZoom()}/fields`];
      if (fieldId) url.push(`${fieldId}`);
      if (action) url.push(`${action}`);
      navigate(url.join("/"), {
        replace: true,
      });
    },
    [action, fieldId, navigate]
  );

  return (
    <>
      <FormProvider {...fieldAddForm}>
        <SubSideBar className="bg-ternary flex">
          {action === "add" && (
            <FieldAddForm onSubmit={onSubmit} onErrors={onErrors} />
          )}
          {!action && (
            <>
              <FieldsList />
              <FieldAddButton />
            </>
          )}
        </SubSideBar>
        <FieldMap
          key="1"
          className="flex-1"
          action={action}
          initialPosition={initialCoordinates}
          initialZoom={initialZoom}
          onZoomEnd={onMapCoordinatesChange}
          onDragEnd={onMapCoordinatesChange}
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

export default FieldLayout;
