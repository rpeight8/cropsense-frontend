import { z } from "zod";

export const CropSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});
export const CropsSchema = z.array(CropSchema);

export const CropRotationSchema = z.object({
  id: z.string(),
  crop: CropSchema,
  startDate: z.date(),
  endDate: z.date(),
});
export const CropRotationsSchema = z.array(CropRotationSchema);

export const CropRotationApiSchema = z.object({
  id: z.string(),
  crop: CropSchema,
  startDate: z.string(),
  endDate: z.string(),
});
export const CropRotationsApiSchema = z.array(CropRotationApiSchema);
