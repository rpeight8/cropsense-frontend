import { z } from "zod";

export const FieldWeatherSchema = z.object({
  date: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  precipitation: z.number(),
  windSpeed: z.number(),
  windDirection: z.number(),
  cloudCover: z.number(),
  cloudType: z.number(),
});

export const FieldWeatherApiSchema = FieldWeatherSchema;
