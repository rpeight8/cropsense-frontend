import { z } from "zod";
import * as FieldSchemas from "./schemas";

export type Field = z.infer<typeof FieldSchemas.FieldSchema>;
export type Fields = z.infer<typeof FieldSchemas.FieldsSchema>;

export type FieldForCreation = z.infer<
  typeof FieldSchemas.FieldForCreationSchema
>;
export type FieldForUpdate = z.infer<typeof FieldSchemas.FieldForUpdateSchema>;
export type FieldGeometry = z.infer<typeof FieldSchemas.FieldGeometrySchema>;
export type FieldWithoutGeometry = Omit<Field, "geometry">;
export type FieldForDisplay = Omit<Field, "geometry" | "color">;

export type FieldPolygon = z.infer<typeof FieldSchemas.FieldPolygonSchema>;
export type FieldCoordinates = Field["geometry"]["coordinates"];

export type FieldAction = (typeof FieldSchemas.fieldActions)[number];

export type FieldId = Field["id"];
