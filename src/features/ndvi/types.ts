import * as z from "zod";
import * as NDVISchemas from "./schemas";
import { FieldId } from "../fields/types";

export type NDVI = z.infer<typeof NDVISchemas.NDVISchema>;
export type NDVIs = z.infer<typeof NDVISchemas.NDVIsSchema>;
export type NDVIDate = z.infer<typeof NDVISchemas.NDVIDateSchema>;
export type NDVIByFieldId = {
  [key: FieldId]: NDVIs;
};
