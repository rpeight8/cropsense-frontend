import { useAppDispatch } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Workspaces } from "./types";
import { WorkspacesSchema } from "./schemas";
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
