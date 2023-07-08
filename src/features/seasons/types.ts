import { z } from "zod";
import { SeasonSchema, SeasonsSchema } from "./schemas";

export type Season = z.infer<typeof SeasonSchema>;
export type Seasons = z.infer<typeof SeasonsSchema>;


