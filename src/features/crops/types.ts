import { z } from "zod";
import { CropRotationsSchema } from "./schemas";

export type CropRotation = z.infer<typeof CropRotationsSchema>[number];
export type CropRotations = z.infer<typeof CropRotationsSchema>;
