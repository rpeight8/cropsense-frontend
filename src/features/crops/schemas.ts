import { z } from "zod";

export const CropSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});
export const CropsSchema = z.array(CropSchema);

export const CropRotationSchema = z.object({
  id: z.string().optional(),
  _key: z.string(),
  cropId: z.string().nullable(),
  cropPlantingDate: z.date().nullable(),
  cropHarvestDate: z.date().nullable(),
});
export const CropRotationsSchema = z.array(CropRotationSchema);

export const CropRotationApiSchema = z.object({
  id: z.string(),
  crop: CropSchema,
  startDate: z.string(),
  endDate: z.string(),
});
export const CropRotationsApiSchema = z.array(CropRotationApiSchema);
