import { z } from "zod";

export const CropSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const CropsSchema = z.array(CropSchema);
