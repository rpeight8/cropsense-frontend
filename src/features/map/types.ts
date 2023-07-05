import { z } from "zod";
import * as MapSchemas from "./schemas";

export type Coordinates = z.infer<typeof MapSchemas.CoordinatesSchema>;
export type Zoom = z.infer<typeof MapSchemas.ZoomSchema>;
