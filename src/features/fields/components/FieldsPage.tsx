import { Navigate, useNavigate } from "react-router-dom";

import FieldsAsideContent from "@/features/fields/components/FieldsAsideContent";
import FieldsMap from "@/features/fields/components/FieldsMap";
import FieldsDetailContent from "@/features/fields/components/FieldDetailContent";
import { useEffect } from "react";
import {
  selectFieldId,
  selectSelectedFieldId,
  setFields,
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
import { useSeasonFields } from "@/features/fields/services";
import { selectSelectedSeasonId } from "@/features/seasons/seasonsSlice";

const FieldsPage = () => {
  const navigate = useNavigate();
  const {
    initialCoordinates: coordinatesFromURL,
    initialZoom: zoomFromURL,
    action,
    fieldId: selectedFieldIdFromURL,
    isFieldsParamsValid,
  } = useURLParametersParser();

  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);

  const {
    data: fields,
    isError: isFieldsError,
    isLoading: isFieldsLoading,
    isFetching: isFieldsFetching,
  } = useSeasonFields(selectedSeasonId);

  const mapCenter = useAppSelector(selectCenter);
  const mapZoom = useAppSelector(selectZoom);
  const selectedFieldId = useAppSelector(selectSelectedFieldId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fields) return;

    dispatch(setFields(fields));
  }, [dispatch, fields]);

  // Sync selected field id from URL with redux store
  useEffect(() => {
    if (!fields) return;

    if (selectedFieldIdFromURL) {
      if (fields.some((f) => f.id === selectedFieldIdFromURL)) {
        if (selectedFieldId !== selectedFieldIdFromURL) {
          dispatch(selectFieldId(selectedFieldIdFromURL));
        }
      } else {
        navigate(`.`);
      }
    } else {
      if (selectedFieldId !== undefined) {
        dispatch(selectFieldId(undefined));
      }
    }
  }, [dispatch, fields, navigate, selectedFieldId, selectedFieldIdFromURL]);

  // Sync map center and zoom from URL with redux store
  useEffect(() => {
    if (
      coordinatesFromURL[0] !== mapCenter[0] ||
      coordinatesFromURL[1] !== mapCenter[1] ||
      zoomFromURL !== mapZoom
    ) {
      dispatch(
        setMapCoordinates({
          center: coordinatesFromURL,
          zoom: zoomFromURL,
        })
      );
    }
  }, [coordinatesFromURL, dispatch, mapCenter, mapZoom, zoomFromURL]);

  if (!isFieldsParamsValid) {
    return <Navigate to="." />;
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
        <FieldsMap className="flex-1" />
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

export default FieldsPage;
