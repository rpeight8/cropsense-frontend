import { z } from "zod";
import {
  WorkspaceSchema,
  WorkspaceWithSeasonsWithFieldsSchema,
  WorkspacesSchema,
} from "./schemas";

export type Workspace = z.infer<typeof WorkspaceSchema>;
export type Workspaces = z.infer<typeof WorkspacesSchema>;

export type WorkspaceWithSeasonsWithFields = z.infer<
  typeof WorkspaceWithSeasonsWithFieldsSchema
>;
export type WorkspacesWithSeasonsWithFields = WorkspaceWithSeasonsWithFields[];
