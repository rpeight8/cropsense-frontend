import { z } from "zod";
import { FieldsSchema } from "../fields/schemas";
import { SeasonsSchema, SeasonsWithFieldsSchema } from "../seasons/schemas";

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const WorkspacesSchema = z.array(WorkspaceSchema);

export const WorkspaceWithSeasonsSchema = WorkspaceSchema.extend({
  seasons: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
});

export const WorkspaceWithSeasonsWithFieldsSchema =
  WorkspaceWithSeasonsSchema.extend({
    seasons: SeasonsWithFieldsSchema,
  });

export const WorkspacesWithSeasonsWithFieldsSchema = z.array(
  WorkspaceWithSeasonsWithFieldsSchema
);

export const WorkspaceForUpdateSchema = WorkspaceSchema;
export const WorkspaceForCreateSchema = WorkspaceSchema.omit({
  id: true,
});
