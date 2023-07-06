import { Navigate, useNavigate } from "react-router-dom";

import FieldsAsideContent from "@/features/fields/components/compound/FieldsAsideContent";
import FieldsMap from "@/features/fields/components/FieldsMap";
import FieldsDetailContent from "@/features/fields/components/compound/FieldDetailContent";
import { useEffect } from "react";
import {
  selectFieldId,
  selectFields,
  selectSelectedFieldId,
} from "@/features/fields/fieldsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import {
  selectCenter,
  selectZoom,
  setMapCoordinates,
} from "@/features/map/mapSlice";
import NDVISelector from "@/features/ndvi/components/NDVISelector";
import { cn } from "@/lib/utils";
import { useFields } from "@/features/fields/services";

const Fields = () => {
  const navigate = useNavigate();
  const {
    initialCoordinates,
    initialZoom,
    isCoordinatesValid,
    isFieldsParamsValid,
    action,
    fieldId,
  } = useURLParametersParser();
  const {
    isLoading: isFieldsLoading,
    isFetching: isFieldsFetching,
    isError: isFieldsError,
  } = useFields();

  const fields = useAppSelector(selectFields);

  const mapCenter = useAppSelector(selectCenter);
  const mapZoom = useAppSelector(selectZoom);
  const selectedFieldId = useAppSelector(selectSelectedFieldId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fieldId) {
      if (selectedFieldId !== fieldId) {
        dispatch(selectFieldId(fieldId));
      }
      return;
    }

    if (!isFieldsLoading && !isFieldsFetching && fields.length !== 0) {
      const field = fields.find((f) => f.id === fieldId);
      if (!field) {
        const navigatePath = `${initialCoordinates[0]},${initialCoordinates[1]},${initialZoom}/fields`;
        navigate(navigatePath);
      } else if (selectedFieldId !== fieldId) {
        dispatch(selectFieldId(fieldId));
      }
    }
  }, [
    dispatch,
    fieldId,
    fields,
    initialCoordinates,
    initialZoom,
    isFieldsLoading,
    isFieldsFetching,
    navigate,
    selectedFieldId,
  ]);

  useEffect(() => {
    if (
      initialCoordinates[0] !== mapCenter[0] ||
      initialCoordinates[1] !== mapCenter[1] ||
      initialZoom !== mapZoom
    ) {
      dispatch(
        setMapCoordinates({
          center: initialCoordinates,
          zoom: initialZoom,
        })
      );
    }
  }, [dispatch, initialCoordinates, initialZoom, mapCenter, mapZoom]);

  if (!isCoordinatesValid || !isFieldsParamsValid) {
    return <Navigate to={`/52.4,31,10/fields`} replace />;
  }

  return (
    <>
      <aside className="flex flex-col w-[200px] p-1">
        <FieldsAsideContent
          isFieldsLoading={isFieldsFetching || isFieldsLoading}
          isFieldsError={isFieldsError}
          action={action}
        />
      </aside>
      <div className="flex-1 flex flex-col relative">
        {selectedFieldId && (
          <NDVISelector
            className="absolute z-[450] w-full flex-shrink mt-2"
            fieldId={selectedFieldId}
          />
        )}
        <FieldsMap
          className="flex-1"
          initialZoom={initialZoom}
          initialPosition={initialCoordinates}
        />
        <div
          className={cn(
            "h-[350px] w-[full] animate-fade-right transition-all duration-100 animate-fade-up animate-once animate-ease-linear animate-reverse animate-fill-backwards",
            {
              "h-0 overflow-hidden": !selectedFieldId,
            }
          )}
        >
          {action && selectedFieldId && (
            <FieldsDetailContent
              action={action}
              fieldId={selectedFieldId}
              isLoading={isFieldsLoading || isFieldsFetching}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Fields;
