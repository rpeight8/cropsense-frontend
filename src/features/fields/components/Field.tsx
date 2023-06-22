import FieldAddForm from "@/components/FieldAddForm";
import SubSideBar from "@/components/SubSideBar";
import FieldMap, { Map } from "@/components/FieldsMap";
import { Coordinates, Field, FieldCoordinates, FieldId } from "@/types";
import { Form, useNavigate } from "react-router-dom";
import FieldsList from "@/components/FieldsList/FieldsList";
import FieldAddButton from "@/components/FieldAddButton";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { useCallback, useMemo, useState } from "react";
import { selectFields } from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";
import EditFieldButton from "@/components/FieldEditButton";
import FieldEditForm from "@/components/FieldEditForm";
import { cn } from "@/lib/utils";
import useFieldForm from "@/hooks/useFieldForm";
import { FormProvider } from "react-hook-form";
import { useFieldAddForm } from "@/hooks/useFieldAddForm";
import { useFieldEditForm } from "@/hooks/useFieldEditForm";

const FieldLayout = () => {
  const [hoveredFieldId, setHoveredFieldId] = useState<FieldId | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { action, fieldId, initialCoordinates, initialZoom } =
    useURLParametersParser();

  const fields = useAppSelector(selectFields);

  const fieldAddForm = useFieldAddForm();
  const fieldEditForm = useFieldEditForm(fields.find((f) => f.id === fieldId));

  // https://github.com/microsoft/TypeScript/issues/44392
  // https://github.com/microsoft/TypeScript/issues/1805
  // const fieldForm = useFieldForm(
  //   // @ts-ignore
  //   action,
  //   fields.find((f) => f.id === fieldId)
  // );

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
      fieldAddForm.form.setValue("coordinates", coordinates, {
        shouldValidate: true,
      });
    },
    [fieldAddForm.form]
  );

  const onFieldModified = useCallback(
    (coordinates: FieldCoordinates) => {
      fieldEditForm.form.setValue("coordinates", coordinates, {
        shouldValidate: true,
      });
    },
    [fieldEditForm.form]
  );

  const getSideBarContent = () => {
    if (fieldId && action) {
      if (action === "display") {
        return (
          <>
            <FieldsList highlightedFieldId={hoveredFieldId} />
            <FieldAddButton />
          </>
        );
      }

      if (action === "delete") {
        return (
          <>
            <div>Delete</div>
          </>
        );
      }
    }

    return <></>;
  };
  return (
    <>
      <div className="h-full w-full flex">
        <SubSideBar className="bg-ternary">
          <FieldsList highlightedFieldId={hoveredFieldId} />
          <FieldAddButton />
        </SubSideBar>
        <div className="flex-1 flex flex-col">
          {action !== "edit" && (
            <FieldMap
              className="flex-1"
              action={action}
              fields={fields}
              selectedFieldId={fieldId || fieldAddForm.newField?.id}
              initialPosition={initialCoordinates}
              initialZoom={initialZoom}
              onZoomEnd={onMapCoordinatesChange}
              onDragEnd={onMapCoordinatesChange}
              onFieldClick={onFieldClick}
              onFieldMouseOver={(fieldId: FieldId) =>
                setHoveredFieldId(fieldId)
              }
              onFieldMouseOut={() => setHoveredFieldId(undefined)}
              handleNewField={onFieldCreated}
            />
          )}

          {action === "edit" && (
            <FieldMap
              className="flex-1"
              action={action}
              fields={fields}
              selectedFieldId={fieldId}
              initialPosition={initialCoordinates}
              initialZoom={initialZoom}
              onZoomEnd={onMapCoordinatesChange}
              onDragEnd={onMapCoordinatesChange}
              onFieldClick={onFieldClick}
              onFieldMouseOver={(fieldId: FieldId) =>
                setHoveredFieldId(fieldId)
              }
              onFieldMouseOut={() => setHoveredFieldId(undefined)}
              handleNewField={onFieldCreated}
            />
          )}
          <div
            className={cn(
              "h-[350px] w-[full] animate-fade-right transition-all duration-100 animate-fade-up animate-once animate-ease-linear animate-reverse animate-fill-backwards",
              {
                "h-0 overflow-hidden":
                  action === undefined || action === "delete",
              }
            )}
          >
            {action === "edit" && (
              <FormProvider {...fieldEditForm.form}>
                <div>
                  <FieldEditForm
                    onSubmit={fieldEditForm.onSubmit}
                    onErrors={fieldEditForm.onErrors}
                  />
                </div>
              </FormProvider>
            )}
            {action === "display" && (
              <div className={cn("")}>
                Display {fieldId} <EditFieldButton />
              </div>
            )}
            {action === "add" && (
              <FormProvider {...fieldAddForm.form}>
                <div>
                  <FieldAddForm
                    onSubmit={fieldAddForm.onSubmit}
                    onErrors={fieldAddForm.onErrors}
                  />
                </div>
              </FormProvider>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldLayout;
