import { z } from "zod";
import { FieldWeatherSchema } from "./schemas";

export type FieldWeather = z.infer<typeof FieldWeatherSchema>;
