import { z } from "zod";
import * as Schemas from "@/schemas";

export type Field = z.infer<typeof Schemas.FieldSchema>;
export type FieldForCreation = z.infer<typeof Schemas.FieldForCreationSchema>;
export type FieldForUpdate = z.infer<typeof Schemas.FieldForUpdateSchema>;
export type FieldGeometry = z.infer<typeof Schemas.FieldGeometrySchema>;
export type FieldWithoutGeometry = Omit<Field, "geometry">;
export type FieldForDisplay = Omit<Field, "geometry" | "color">;

export type FieldPolygon = z.infer<typeof Schemas.FieldPolygonSchema>;
export type FieldCoordinates = Field["geometry"]["coordinates"];
export type Coordinates = z.infer<typeof Schemas.CoordinatesSchema>;
export type Zoom = z.infer<typeof Schemas.ZoomSchema>;

export type FieldAction = (typeof Schemas.fieldActions)[number];

export type FieldId = Field["id"];
