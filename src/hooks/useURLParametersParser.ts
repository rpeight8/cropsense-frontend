import { CoordinatesSchema, ZoomSchema } from "@/features/map/schemas";
import { FieldActionsSchema } from "@/features/fields/schemas";
import { Coordinates, Zoom } from "@/features/map/types";
import { FieldAction } from "@/features/fields/types";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { WorkspaceIdURLSchema } from "@/features/workspaces/schemas";
import { SeasonIdURLSchema } from "@/features/seasons/schemas";

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

const getParsedWorkspaceIdParameter = (
  workspaceId: string | undefined
): { workspaceId: string | undefined; valid: boolean } => {
  if (!workspaceId) {
    return {
      workspaceId,
      valid: true,
    };
  }

  return {
    workspaceId,
    valid: WorkspaceIdURLSchema.safeParse(workspaceId).success,
  };
};

const getParsedSeasonIdParameter = (
  seasonId: string | undefined
): { seasonId: string | undefined; valid: boolean } => {
  if (!seasonId) {
    return {
      seasonId,
      valid: true,
    };
  }

  return {
    seasonId,
    valid: SeasonIdURLSchema.safeParse(seasonId).success,
  };
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
  const {
    coordinates = "",
    workspaceId = "",
    seasonsId = "",
    fieldParam1 = "",
    fieldParam2 = "",
  } = useParams();

  const parsedURLCoordinatesParameters = useMemo(
    () => getParsedURLCoordinatesParameters(coordinates),
    [coordinates]
  );

  const parsedURLWorkspaceId = useMemo(
    () => getParsedWorkspaceIdParameter(workspaceId),
    [workspaceId]
  );

  const parsedURLSeasonsId = useMemo(
    () => getParsedSeasonIdParameter(seasonsId),
    [seasonsId]
  );

  const parsedURLFieldParameters = useMemo(
    () => getParsedURLFieldParameters(fieldParam1, fieldParam2),
    [fieldParam1, fieldParam2]
  );

  return {
    ...parsedURLCoordinatesParameters,
    ...parsedURLFieldParameters,
    ...parsedURLWorkspaceId,
    ...parsedURLSeasonsId,
    isCoordinatesValid: parsedURLCoordinatesParameters.valid,
    isFieldsParamsValid: parsedURLFieldParameters.valid,
    isWorkspaceIdValid: parsedURLWorkspaceId.valid,
    isSeasonIdValid: parsedURLSeasonsId.valid,
  };
};

export default useURLParametersParser;
