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

export const FieldGeometrySchema = z.object({
  type: z.string(),
  coordinates: FieldCoordinatesSchema,
});

export const FieldCropsSchema = z.array(z.string());

export const FieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  geometry: FieldGeometrySchema,
  color: z.string(),
  crops: FieldCropsSchema.optional(),
});

export const FieldForCreationSchema = FieldSchema.omit({
  id: true,
});

export const FieldForUpdateSchema = FieldSchema.omit({
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
const japaneseDateFormatRegExp = /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})$/;

export const JapaneseDateFormatSchema = z
  .string()
  .regex(japaneseDateFormatRegExp, {
    message: "Invalid Japanese date format. Expected format: 'YYYYMMDD'.",
  })
  .refine((value) => {
    const match = japaneseDateFormatRegExp.exec(value);
    if (!match) throw new Error("Invalid date format. Must be YYYYMMDD.");

    const { year, month, day } = match.groups ?? {};
    const parsedYear = parseInt(year ?? "", 10);
    const parsedMonth = parseInt(month ?? "", 10);
    const parsedDay = parseInt(day ?? "", 10);

    // Validate month
    if (parsedMonth < 1 || parsedMonth > 12) {
      throw new Error(
        `Invalid month. Must be between 01 and 12. But got ${parsedMonth}.`
      );
    }

    // Validate day based on the month
    const daysInMonth = new Date(parsedYear, parsedMonth, 0).getDate();
    if (parsedDay < 1 || parsedDay > daysInMonth) {
      throw new Error(
        `Invalid day. Must be between 01 and ${daysInMonth} for month ${parsedMonth}. But got ${parsedDay}.`
      );
    }

    return true;
  });

export const NDVISchema = z.object({
  id: z.string(),
  fieldId: z.string(),
  date: JapaneseDateFormatSchema,
  pictureURL: z.string(),
});

export const NDVIsSchema = z.array(NDVISchema);

export const NDVIDateSchema = z.object({
  date: JapaneseDateFormatSchema,
  NDVIId: z.string(),
  type: z.string(),
});

export const FieldsSchema = z.array(FieldSchema);
