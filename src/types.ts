import { z } from "zod";
import * as Schemas from "@/schemas";

export type Field = z.infer<typeof Schemas.FieldSchema>;
export type FieldForCreation = z.infer<typeof Schemas.FieldForCreationSchema>;
export type FieldWithoutCoords = Omit<Field, "coordinates">;
export type FieldForDisplay = Omit<Field, "coordinates" | "color">;

export type FieldPolygon = z.infer<typeof Schemas.FieldPolygonSchema>;
export type FieldCoordinates = Field["coordinates"];

export type FieldAction = "add" | "edit" | "display" | "none";

export type FieldId = Field["id"];
