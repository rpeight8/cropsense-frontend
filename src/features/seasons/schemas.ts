import { z } from "zod";
import { FieldsSchema } from "../fields/schemas";

export const SeasonSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});
export const SeasonsSchema = z.array(SeasonSchema);

export const SeasonFromApiSchema = SeasonSchema;

export const SeasonsFromApiSchema = z.array(SeasonFromApiSchema);

export const SeasonWithFieldsSchema = SeasonSchema.extend({
  fields: FieldsSchema,
});

export const SeasonsWithFieldsSchema = z.array(SeasonWithFieldsSchema);

export const SeasonForCreateSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export const SeasonForUpdateSchema = SeasonForCreateSchema.extend({
  id: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});
