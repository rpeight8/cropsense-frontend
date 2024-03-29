import { CoordinatesSchema, ZoomSchema } from "@/features/map/schemas";
import { FieldActionsSchema } from "@/features/fields/schemas";
import { Coordinates, Zoom } from "@/features/map/types";
import { FieldAction } from "@/features/fields/types";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

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
  action?: FieldAction;
  fieldId?: string;
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

export const useURLParametersParser = () => {
  const { coordinates = "", param1 = "", param2 = "" } = useParams();

  const parsedURLCoordinatesParameters = useMemo(
    () => getParsedURLCoordinatesParameters(coordinates),
    [coordinates]
  );
  const parsedURLFieldParameters = useMemo(
    () => getParsedURLFieldParameters(param1, param2),
    [param1, param2]
  );

  return {
    ...parsedURLCoordinatesParameters,
    ...parsedURLFieldParameters,
    isCoordinatesValid: parsedURLCoordinatesParameters.valid,
    isFieldsParamsValid: parsedURLFieldParameters.valid,
  };
};

export default useURLParametersParser;
