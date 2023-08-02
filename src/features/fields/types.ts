import { z } from "zod";
import {
  AddFormSchema,
  FieldForCreateSchema,
  FieldForUpdateSchema,
  FieldGeometrySchema,
  FieldPolygonSchema,
  FieldSchema,
  FieldSummaryApiSchema,
  FieldsSchema,
  ManageFormSchema,
  fieldActions,
} from "./schemas";

export type Field = z.infer<typeof FieldSchema>;
export type Fields = z.infer<typeof FieldsSchema>;

export type FieldForCreate = z.infer<typeof FieldForCreateSchema>;
export type FieldForUpdate = z.infer<typeof FieldForUpdateSchema>;
export type FieldGeometry = z.infer<typeof FieldGeometrySchema>;
export type FieldWithoutGeometry = Omit<Field, "geometry">;
export type FieldForDisplay = Omit<Field, "geometry" | "color">;

export type FieldPolygon = z.infer<typeof FieldPolygonSchema>;
export type FieldCoordinates = Field["geometry"]["coordinates"];

export type FieldAction = (typeof fieldActions)[number];

export type FieldId = Field["id"];

export type FieldSummary = z.infer<typeof FieldSummaryApiSchema>;

export type AddFormType = z.infer<typeof AddFormSchema>;
export type ManageFormType = z.infer<typeof ManageFormSchema>;
