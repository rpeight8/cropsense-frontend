import { z } from "zod";
import { JapaneseDateFormatSchema } from "./utils";

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
