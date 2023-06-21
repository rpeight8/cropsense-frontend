import FieldAddForm from "@/components/FieldAddForm";
import SubSideBar from "@/components/SubSideBar";
import FieldMap, { Map } from "@/components/FieldsMap";
import { useFieldAddForm } from "@/hooks/useFieldAddForm";
import { Coordinates, FieldCoordinates, FieldId } from "@/types";
import { useNavigate } from "react-router-dom";
import FieldsList from "@/components/FieldsList/FieldsList";
import FieldAddButton from "@/components/FieldAddButton";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { useCallback, useMemo, useState } from "react";
import { useFields } from "@/services/fields";
import { selectFields } from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";

const FieldLayout = () => {
  const [hoveredFieldId, setHoveredFieldId] = useState<FieldId | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { action, fieldId, initialCoordinates, initialZoom } =
    useURLParametersParser();

  const fields = useAppSelector(selectFields);

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
    (map: Map) => {
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

  const onFieldClick = useCallback(
    (fieldId: FieldId) => {
      navigate(`${fieldId}/display`);
    },
    [navigate]
  );

  const onFieldCreated = useCallback(
    (coordinates: FieldCoordinates) => {
      fieldAddForm.setValue("coordinates", coordinates, {
        shouldValidate: true,
      });
    },
    [fieldAddForm]
  );

  const getSideBarContent = () => {
    if (action === "add") {
      return <FieldAddForm onSubmit={onSubmit} onErrors={onErrors} />;
    }
    if (fieldId && action) {
      if (action === "display") {
        return (
          <>
            <FieldsList highlightedFieldId={hoveredFieldId} />;
            <FieldAddButton />
          </>
        );
      }

      if (action === "edit") {
        return (
          <>
            <div>Edit</div>
            <FieldAddForm onSubmit={onSubmit} onErrors={onErrors} />;
          </>
        );
      }

      if (action === "delete") {
        return (
          <>
            <div>Delete</div>
            <FieldsList highlightedFieldId={hoveredFieldId} />;
          </>
        );
      }
    }

    return (
      <>
        <FieldsList highlightedFieldId={hoveredFieldId} />;
        <FieldAddButton />
      </>
    );
  };

  return (
    <>
      <FormProvider {...fieldAddForm}>
        <SubSideBar className="bg-ternary flex">
          {getSideBarContent()}
        </SubSideBar>
        <div className="flex-1 flex flex-col">
          <FieldMap
            className="flex-1"
            action={action}
            fields={fields}
            selectedFieldId={fieldId || newField?.id}
            initialPosition={initialCoordinates}
            initialZoom={initialZoom}
            onZoomEnd={onMapCoordinatesChange}
            onDragEnd={onMapCoordinatesChange}
            onFieldClick={onFieldClick}
            onFieldMouseOver={(fieldId: FieldId) => setHoveredFieldId(fieldId)}
            onFieldMouseOut={() => setHoveredFieldId(undefined)}
            handleNewField={onFieldCreated}
          />
          {action === "display" && (
            <div className="h-[300px] w-[full]">Display {fieldId}</div>
          )}
        </div>
      </FormProvider>
    </>
  );
};

export default FieldLayout;
