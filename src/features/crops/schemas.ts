import { z } from "zod";

export const CropSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});
export const CropsSchema = z.array(CropSchema);

export const CropRotationSchema = z.object({
  id: z.string(),
  name: z.string(),
  crops: z.array(CropSchema),
  startDate: z.date(),
  endDate: z.date(),
});
export const CropRotationsSchema = z.array(CropRotationSchema);
