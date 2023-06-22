import { CoordinatesSchema, FieldActionsSchema, ZoomSchema } from "@/schemas";
import { Coordinates, FieldAction, Zoom } from "@/types";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useURLParametersParser from "./useURLParametersParser";

export const useFieldParametersHandler = () => {
  const URLParams = useParams();
  const navigate = useNavigate();

  

  return parsedURLParams;
};
