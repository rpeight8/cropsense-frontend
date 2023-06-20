import { CoordinatesSchema, FieldActionsSchema, ZoomSchema } from "@/schemas";
import { Coordinates, FieldAction, Zoom } from "@/types";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useURLParametersParser from "./useURLParametersParser";

export const useFieldParametersHandler = () => {
  const URLParams = useParams();
  const navigate = useNavigate();

  const parsedURLParams = useURLParametersParser();

  useEffect(() => {
    if (
      !parsedURLParams.isCoordinatesValid ||
      !parsedURLParams.isFieldsParamsValid
    ) {
      navigate(`/52.4,31,10/fields`);
    }
  }, [
    parsedURLParams.isCoordinatesValid,
    parsedURLParams.isFieldsParamsValid,
    navigate,
  ]);

  return parsedURLParams;
};
