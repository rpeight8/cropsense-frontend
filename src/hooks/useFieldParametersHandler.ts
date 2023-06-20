import { CoordinatesSchema, FieldActionsSchema, ZoomSchema } from "@/schemas";
import { Coordinates, FieldAction, Zoom } from "@/types";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const getParsedURLCoordinatesParameters = (
  coordinates: string
): {
  initialCoordinates: Coordinates;
  initialZoom: Zoom;
  valid: boolean;
} => {
  const [lat, lng, zoom] = coordinates.split(",").map((item) => Number(item));

  try {
    const parsedCoordinates = CoordinatesSchema.parse([lat, lng]);
    const parsedZoom = ZoomSchema.parse(zoom);
    return {
      initialCoordinates: parsedCoordinates,
      initialZoom: parsedZoom,
      valid: true,
    };
  } catch (err) {
    return { initialCoordinates: [52, 32], initialZoom: 15, valid: false };
  }
};

const getParsedURLFieldParameters = (
  param1: string | undefined,
  param2: string | undefined
): {
  action?: FieldAction | undefined;
  fieldId?: string | undefined;
  valid: boolean;
} => {
  if (!param1 && !param2) {
    return {
      valid: true,
    };
  }

  if (param1 === "add") {
    return {
      action: "add",
      valid: true,
    };
  }

  if (param2 === "add") {
    console.log("Add can't be applied to particular field");
    return {
      valid: false,
    };
  }

  try {
    return {
      action: param2 ? FieldActionsSchema.parse(param2) : undefined,
      fieldId: param1,
      valid: true,
    };
  } catch (err) {
    console.log(err);
    return {
      valid: false,
    };
  }
};

export const useFieldParametersHandler = () => {
  const { coordinates = "", param1 = "", param2 = "" } = useParams();
  const navigate = useNavigate();
  const parsedURLCoordinatesParameters = useMemo(
    () => getParsedURLCoordinatesParameters(coordinates),
    [coordinates]
  );
  const parsedURLFieldParameters = useMemo(
    () => getParsedURLFieldParameters(param1, param2),
    [param1, param2]
  );

  useEffect(() => {
    if (
      !parsedURLCoordinatesParameters.valid ||
      !parsedURLFieldParameters.valid
    ) {
      navigate(`/20,11,15/fields`);
    }
  }, [
    parsedURLCoordinatesParameters.valid,
    parsedURLFieldParameters.valid,
    navigate,
  ]);

  return {
    ...parsedURLCoordinatesParameters,
    ...parsedURLFieldParameters,
    isCoordinatesValid: parsedURLCoordinatesParameters.valid,
    isFieldsParamsValid: parsedURLFieldParameters.valid,
  };
};
