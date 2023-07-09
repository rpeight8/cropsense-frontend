import { z } from "zod";
import {
  SeasonForCreateSchema,
  SeasonForUpdateSchema,
  SeasonSchema,
  SeasonsSchema,
} from "./schemas";

export type Season = z.infer<typeof SeasonSchema>;
export type Seasons = z.infer<typeof SeasonsSchema>;

export type SeasonForCreate = z.infer<typeof SeasonForCreateSchema>;
export type SeasonForUpdate = z.infer<typeof SeasonForUpdateSchema>;
