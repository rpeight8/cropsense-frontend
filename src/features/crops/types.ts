import { z } from "zod";
import * as CropSchemas from "./schemas";

export type Crop = z.infer<typeof CropSchemas.CropSchema>;
export type Crops = z.infer<typeof CropSchemas.CropsSchema>;


