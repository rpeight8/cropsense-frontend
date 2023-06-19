import { z } from "zod";

export const FieldHoleSchema = z.array(
  z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)])
);
export const FieldPolygonSchema = z.array(
  z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)])
);

export const FieldCoordinatesSchema = z.tuple([
  FieldPolygonSchema,
  FieldHoleSchema,
]);

export const FieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  coordinates: FieldCoordinatesSchema,
  color: z.string(),
});

export const FieldForCreationSchema = FieldSchema.omit({
  id: true,
});

export const FieldsSchema = z.array(FieldSchema);
