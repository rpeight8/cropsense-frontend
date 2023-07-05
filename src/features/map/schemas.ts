import { z } from "zod";

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

export const LatitudeSchema = z.number().min(MIN_LATITUDE).max(MAX_LATITUDE);
export const LongitudeSchema = z.number().min(MIN_LONGITUDE).max(MAX_LONGITUDE);

export const CoordinatesSchema = z.tuple([LatitudeSchema, LongitudeSchema]);

const MIN_ZOOM = 3;
const MAX_ZOOM = 20;

export const ZoomSchema = z.number().min(MIN_ZOOM).max(MAX_ZOOM);
