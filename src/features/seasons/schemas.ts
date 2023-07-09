import { z } from "zod";
import { FieldsSchema } from "../fields/schemas";

export const SeasonSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const SeasonsSchema = z.array(SeasonSchema);

export const SeasonWithFieldsSchema = SeasonSchema.extend({
  fields: FieldsSchema,
});

export const SeasonsWithFieldsSchema = z.array(SeasonWithFieldsSchema);

export const SeasonForCreateSchema = z.object({
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const SeasonForUpdateSchema = SeasonForCreateSchema.extend({
  id: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});
