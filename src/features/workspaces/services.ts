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
import { SeasonsSchema } from "../seasons/schemas";
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
        const workspaces = WorkspacesSchema.parse(resp.data);

        return workspaces;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching workspaces."
          );
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

export const useWorkspaceSeasons = (workspaceId?: string) => {
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
        const seasons = SeasonsSchema.parse(resp.data);

        return seasons;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching seasons."
          );
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

export const useUpdateWorkspace = (workspaceId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Workspace, Error, WorkspaceForUpdate>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
    },
    mutationFn: async (workspace: WorkspaceForUpdate) => {
      try {
        const resp = await axios.put(
          `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}`,
          workspace,
          {
            withCredentials: true,
          }
        );

        const updatedWorkspace = WorkspaceSchema.parse(resp.data);
        return updatedWorkspace;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error updating workspace."
          );
        } else {
          throw new Error("Error updating workspace.");
        }
      }
    },
  });

  return mutation;
};

export const useDeleteWorkspace = (workspaceId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Workspace, Error>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
    },
    mutationFn: async () => {
      try {
        const resp = await axios.delete(
          `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}`,
          {
            withCredentials: true,
          }
        );

        const deletedWorkspace = WorkspaceSchema.parse(resp.data);
        return deletedWorkspace;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error deleting workspace."
          );
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

        const createdWorkspace = WorkspaceSchema.parse(resp.data);
        return createdWorkspace;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error creating workspace."
          );
        } else {
          throw new Error("Error creating workspace.");
        }
      }
    },
  });

  return mutation;
};
