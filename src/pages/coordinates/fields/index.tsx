import {
  useParams,
  useNavigate,
  Outlet,
  useLocation,
  Form,
} from "react-router-dom";

import { useFields } from "@/services/fields";
import FieldsSideBar from "@/features/fields/components/compound/FieldsSideBar";
import FieldsMap from "@/features/fields/components/FieldsMap";
import FieldsDetailBottom from "@/features/fields/components/compound/FieldDetailBottom";
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
import NDVISelector from "@/features/fields/components/NDVISelector";
import { useNDVI } from "@/services/ndvi";
import {
  selectSelectedNDVIId,
  setSelectedNDVIId,
} from "@/features/ndvi/ndviSlice";

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
  const { isLoading: isLoadingFields, isError } = useFields();
  
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

    if (!isLoadingFields && fields.length !== 0) {
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
    isLoadingFields,
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

  if (isLoadingFields) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <FieldsSideBar className="w-[200px]" />
      <div className="flex-1 flex flex-col relative">
        {fieldId && (
          <NDVISelector
            className="absolute z-[450] w-full flex-shrink"
            fieldId={fieldId}
          />
        )}
        <FieldsMap
          className="flex-1"
          initialZoom={initialZoom}
          initialPosition={initialCoordinates}
        />
        <FieldsDetailBottom />
      </div>
    </>
  );
};

export default Fields;
