import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import { useFieldParametersHandler } from "@/hooks/useFieldParametersHandler";
import { useFields } from "@/services/fields";
import FieldsSideBar from "@/features/fields/components/FieldSideBar";
import FieldsMap from "@/components/FieldsMap";
import FieldsDetaileBottom from "@/features/fields/components/FieldDetailBottom";
import { useEffect } from "react";
import { selectFields } from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";
import useURLParametersParser from "@/hooks/useURLParametersParser";

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
  const { isLoading, isError } = useFields();
  const fields = useAppSelector(selectFields);

  useEffect(() => {
    if (!isCoordinatesValid || !isFieldsParamsValid) {
      navigate(`/52.4,31,10/fields`);
    }

    if (fieldId && !fields.find((f) => f.id === fieldId)) {
      navigate(
        [
          `${initialCoordinates[0]},${initialCoordinates[1]},${initialZoom}`,
          `fields`,
        ].join("/")
      );
    }
  }, [
    fields,
    fieldId,
    isFieldsParamsValid,
    isCoordinatesValid,
    navigate,
    initialCoordinates,
    initialZoom,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <FieldsSideBar />
      <div>
        {/* <FieldsMap />
        <FieldsDetaileBottom /> */}
      </div>
    </>
  );
};

export default Fields;
