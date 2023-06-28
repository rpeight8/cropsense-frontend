import { z } from "zod";
import * as FieldSchemas from "@schemas/field";
import * as MapSchemas from "@schemas/map";
import * as NDVISchemas from "@schemas/ndvi";
import * as CropSchemas from "@schemas/crop";

export type Field = z.infer<typeof FieldSchemas.FieldSchema>;
export type FieldForCreation = z.infer<
  typeof FieldSchemas.FieldForCreationSchema
>;
export type FieldForUpdate = z.infer<typeof FieldSchemas.FieldForUpdateSchema>;
export type FieldGeometry = z.infer<typeof FieldSchemas.FieldGeometrySchema>;
export type FieldWithoutGeometry = Omit<Field, "geometry">;
export type FieldForDisplay = Omit<Field, "geometry" | "color">;

export type FieldPolygon = z.infer<typeof FieldSchemas.FieldPolygonSchema>;
export type FieldCoordinates = Field["geometry"]["coordinates"];
export type Coordinates = z.infer<typeof MapSchemas.CoordinatesSchema>;
export type Zoom = z.infer<typeof MapSchemas.ZoomSchema>;

export type FieldAction = (typeof FieldSchemas.fieldActions)[number];

export type FieldId = Field["id"];

export type NDVI = z.infer<typeof NDVISchemas.NDVISchema>;
export type NDVIs = z.infer<typeof NDVISchemas.NDVIsSchema>;
export type NDVIDate = z.infer<typeof NDVISchemas.NDVIDateSchema>;
export type NDVIByFieldId = {
  [key: FieldId]: NDVIs;
};

export type Crop = z.infer<typeof CropSchemas.CropSchema>;
export type Crops = z.infer<typeof CropSchemas.CropsSchema>;
