import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import { useFieldParametersHandler } from "@/hooks/useFieldParametersHandler";
import { useFields } from "@/services/fields";
import FieldLayout from "@/layouts/fields/FieldLayout";

const Fields = () => {
  const { isCoordinatesValid, isFieldsParamsValid } =
    useFieldParametersHandler();

  useFields();

  // Will be handled by useFieldParametersHandler
  if (!isFieldsParamsValid || !isCoordinatesValid) {
    return null;
  }

  return <FieldLayout />;
};

export default Fields;
