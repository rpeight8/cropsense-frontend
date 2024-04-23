import { z } from "zod";
import { CropRotationsSchema, CropSchema, CropsSchema } from "./schemas";

export type CropRotation = z.infer<typeof CropRotationsSchema>[number];
export type CropRotations = z.infer<typeof CropRotationsSchema>;
export type Crop = z.infer<typeof CropSchema>;
export type Crops = z.infer<typeof CropsSchema>;
