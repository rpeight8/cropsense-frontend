import {
  useParams,
  useNavigate,
  Outlet,
  useLocation,
  Form,
} from "react-router-dom";

import { useFields } from "@/services/fields";
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
  selectViewPort,
  selectZoom,
  setCenter,
  setMapCoordinates,
  setZoom,
} from "@/features/map/mapSlice";
import NDVISelector from "@/features/ndvi/components/NDVISelector";
import { useNDVI } from "@/services/ndvi";
import {
  selectSelectedNDVIId,
  setSelectedNDVIId,
} from "@/features/ndvi/ndviSlice";
import { cn } from "@/lib/utils";

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

  // Validate url params
  useEffect(() => {
    if (!isCoordinatesValid || !isFieldsParamsValid) {
      navigate(`/52.4,31,10/fields`);
      return;
    }
  }, [isCoordinatesValid, isFieldsParamsValid, navigate]);

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
    return null;
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
            className="absolute z-[450] w-full flex-shrink"
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
