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

export const fieldAddAction = "add" as const;
export const fieldActions = [
  fieldAddAction,
  "edit",
  "delete",
  "display",
] as const;

export const CoordinatesSchema = z.tuple([
  z.number().min(-90).max(90),
  z.number().min(-180).max(180),
]);

export const ZoomSchema = z.number().min(3).max(20);

type FieldAction = (typeof fieldActions)[number];
export const FieldActionsSchema = z
  .union([
    z.literal(fieldActions[0]),
    z.literal(fieldActions[1]),
    z.literal(fieldActions[2]),
    z.literal(fieldActions[3]),
  ])
  .refine((value: FieldAction) => fieldActions.includes(value), {
    message: "Invalid field action value",
  });

export const FieldsSchema = z.array(FieldSchema);
