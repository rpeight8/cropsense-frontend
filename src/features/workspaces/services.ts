import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Workspace,
  WorkspaceForCreate,
  WorkspaceForUpdate,
  Workspaces,
} from "./types";
import { WorkspaceSchema, WorkspacesSchema } from "./schemas";
import { Seasons } from "../seasons/types";
import { SeasonsFromApiSchema } from "../seasons/schemas";

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

export const useUpdateWorkspace = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Workspace,
    unknown,
    { workspace: WorkspaceForUpdate; workspaceId: string }
  >({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"], { exact: true });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
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

export const useDeleteWorkspace = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, string>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
    mutationFn: async (workspaceId) => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}`,
          {
            withCredentials: true,
          }
        );
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

export const useCreateWorkspace = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Workspace, Error, WorkspaceForCreate>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"], { exact: true });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
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
