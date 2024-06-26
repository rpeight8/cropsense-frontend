import { z } from "zod";
import {
  CropRotationsApiSchema,
  CropRotationsSchema,
} from "@/features/crops/schemas";
import { CoordinatesSchema } from "@/features/map/schemas";

// It has to be impoert from ../seasons/schemas.ts, but I just copied it here
//  bacause of the circular dependency
export const SeasonSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  workspaceId: z.string(),
});

export const FieldHoleSchema = z.array(CoordinatesSchema);
export const FieldPolygonSchema = z.array(CoordinatesSchema).min(1);

export const FieldCoordinatesSchema = z.tuple([
  FieldPolygonSchema,
  FieldHoleSchema,
]);

export const FieldGeometrySchema = z.object({
  type: z.string(),
  coordinates: FieldCoordinatesSchema,
});

export const FieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  geometry: FieldGeometrySchema,
  cropRotations: CropRotationsSchema,
  seasonId: z.string(),
});

export const FieldsSchema = z.array(FieldSchema);

export const FieldApiSchema = FieldSchema.extend({
  cropRotations: CropRotationsApiSchema,
});
export const FieldsApiSchema = z.array(FieldApiSchema);

export const FieldForCreateSchema = FieldSchema.omit({
  id: true,
  seasonId: true,
}).extend({
  cropRotations: z.array(
    z.object({
      cropId: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
});

export const FieldForUpdateSchema = FieldSchema.extend({
  id: z.string().optional(),
  cropRotations: z.array(
    z.object({
      cropId: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
});

export const fieldAddAction = "add" as const;

export const fieldActions = [
  fieldAddAction,
  "edit",
  "delete",
  "display",
] as const;

export const FieldActionsSchema = z
  .union([
    z.literal(fieldActions[0]),
    z.literal(fieldActions[1]),
    z.literal(fieldActions[2]),
    z.literal(fieldActions[3]),
  ])
  .refine(
    (value: (typeof fieldActions)[number]) => fieldActions.includes(value),
    {
      message: "Invalid field action value",
    }
  );

export const FieldSeasonSummarySchema = SeasonSchema.extend({
  crop: CropRotationsSchema.nullable(),
}).omit({
  workspaceId: true,
});

export const FieldSeasonsSummarySchema = z.array(FieldSeasonSummarySchema);

export const FieldSummaryApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  seasons: FieldSeasonsSummarySchema,
  area: z.number(),
  areaUnit: z.string(),
});

export const AddFormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  cropRotations: z.array(
    z
      .object({
        _key: z.string(),
        cropId: z.string().nullable(),
        cropPlantingDate: z.date().nullable(),
        cropHarvestDate: z.date().nullable(),
      })
      .refine(
        (data) => {
          if (!data.cropId) return true;
          if (!data.cropPlantingDate || !data.cropHarvestDate) return true;
          return data.cropPlantingDate < data.cropHarvestDate;
        },
        {
          message: "Harvest Date must be after Planting Date.",
          path: ["cropHarvestDate"],
        }
      )
      .refine(
        (data) => {
          if (!data.cropId) return true;
          if (!data.cropPlantingDate) return false;
          return true;
        },
        {
          message: "Planting Date must be specified.",
          path: ["cropPlantingDate"],
        }
      )
      .refine(
        (data) => {
          if (!data.cropId) return true;
          if (!data.cropHarvestDate) return false;
          return true;
        },
        {
          message: "Harvest Date must be specified.",
          path: ["cropHarvestDate"],
        }
      )
  ),

  geometry: FieldGeometrySchema,
});
// TODO: remove duplicated props from AddFormSchema and ManageFormSchema
export const ManageFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  seasonId: z.string(),
  cropRotations: z.array(
    z
      .object({
        _key: z.string(),
        id: z.string().optional(),
        cropId: z.string().nullable(),
        cropPlantingDate: z.date().nullable(),
        cropHarvestDate: z.date().nullable(),
      })
      .refine(
        (data) => {
          if (!data.cropId) return true;
          if (!data.cropPlantingDate || !data.cropHarvestDate) return true;
          return data.cropPlantingDate < data.cropHarvestDate;
        },
        {
          message: "Harvest Date must be after Planting Date.",
          path: ["cropHarvestDate"],
        }
      )
      .refine(
        (data) => {
          if (!data.cropId) return true;
          if (!data.cropPlantingDate) return false;
          return true;
        },
        {
          message: "Planting Date must be specified.",
          path: ["cropPlantingDate"],
        }
      )
      .refine(
        (data) => {
          if (!data.cropId) return true;
          if (!data.cropHarvestDate) return false;
          return true;
        },
        {
          message: "Harvest Date must be specified.",
          path: ["cropHarvestDate"],
        }
      )
  ),
  geometry: FieldGeometrySchema,
});
