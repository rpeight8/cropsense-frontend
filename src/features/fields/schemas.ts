import { z } from "zod";
import { CropSchema } from "@/features/crops/schemas";
import { CoordinatesSchema } from "@/features/map/schemas";

export const FieldHoleSchema = z.array(CoordinatesSchema);
export const FieldPolygonSchema = z.array(CoordinatesSchema).min(1);

export const FieldCoordinatesSchema = z.tuple([
  FieldPolygonSchema,
  FieldHoleSchema,
]);

export const FieldGeometrySchema = z.object({
  type: z.string(),
  coordinates: FieldCoordinatesSchema,
});

export const FieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  geometry: FieldGeometrySchema,
  crop: CropSchema.nullable(),
  seasonId: z.string(),
});

export const FieldsSchema = z.array(FieldSchema);

export const FieldApiSchema = FieldSchema;
export const FieldsApiSchema = FieldsSchema;

export const FieldForCreateSchema = FieldSchema.omit({
  id: true,
  seasonId: true,
});

export const FieldForUpdateSchema = FieldSchema.extend({
  id: z.string().optional(),
});

export const fieldAddAction = "add" as const;

export const fieldActions = [
  fieldAddAction,
  "edit",
  "delete",
  "display",
] as const;

export const FieldActionsSchema = z
  .union([
    z.literal(fieldActions[0]),
    z.literal(fieldActions[1]),
    z.literal(fieldActions[2]),
    z.literal(fieldActions[3]),
  ])
  .refine(
    (value: (typeof fieldActions)[number]) => fieldActions.includes(value),
    {
      message: "Invalid field action value",
    }
  );
