import { useAppDispatch } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Workspace,
  WorkspaceForCreate,
  WorkspaceForUpdate,
  Workspaces,
} from "./types";
import { WorkspaceSchema, WorkspacesSchema } from "./schemas";
import { setWorkspaces } from "./workspacesSlice";
import { Seasons } from "../seasons/types";
import { SeasonsFromApiSchema, SeasonsSchema } from "../seasons/schemas";
import { setSeasons } from "../seasons/seasonsSlice";

export const useWorkspaces = () => {
  return useQuery<Workspaces, Error>(
    ["workspaces"],
    async (): Promise<Workspaces> => {
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/workspaces`,
          {
            withCredentials: true,
          }
        );
        const workspaces = await WorkspacesSchema.parseAsync(resp.data);

        return workspaces;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching workspaces."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error fetching workspaces.");
        }
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      refetchIntervalInBackground: false,
    }
  );
};

export const useWorkspaceSeasons = (workspaceId: string | null) => {
  return useQuery<Seasons, Error>(
    ["workspaces", workspaceId, "seasons"],
    async (): Promise<Seasons> => {
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}/seasons`,
          {
            withCredentials: true,
          }
        );
        const parsedSeasons = await SeasonsFromApiSchema.parseAsync(resp.data);

        return parsedSeasons;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching seasons."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error fetching seasons.");
        }
      }
    },
    {
      enabled: !!workspaceId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      refetchIntervalInBackground: false,
    }
  );
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Workspace,
    Error,
    { workspace: WorkspaceForUpdate; workspaceId: string }
  >({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
    },
    mutationFn: async ({ workspace, workspaceId }) => {
      try {
        const resp = await axios.put(
          `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}`,
          workspace,
          {
            withCredentials: true,
          }
        );

        const updatedWorkspace = await WorkspaceSchema.parseAsync(resp.data);
        return updatedWorkspace;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error updating workspace."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error updating workspace.");
        }
      }
    },
  });

  return mutation;
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Workspace, Error, string>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
    },
    mutationFn: async (workspaceId) => {
      try {
        const resp = await axios.delete(
          `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}`,
          {
            withCredentials: true,
          }
        );

        const deletedWorkspace = await WorkspaceSchema.parseAsync(resp.data);
        return deletedWorkspace;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error deleting workspace."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error deleting workspace.");
        }
      }
    },
  });

  return mutation;
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Workspace, Error, WorkspaceForCreate>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
    },
    mutationFn: async (workspace: WorkspaceForCreate) => {
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/workspaces`,
          workspace,
          {
            withCredentials: true,
          }
        );

        const createdWorkspace = await WorkspaceSchema.parseAsync(resp.data);
        return createdWorkspace;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error creating workspace."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error creating workspace.");
        }
      }
    },
  });

  return mutation;
};
