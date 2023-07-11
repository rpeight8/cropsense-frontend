import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Season, SeasonForCreate, SeasonForUpdate, Seasons } from "./types";
import { SeasonFromApiSchema, SeasonsFromApiSchema } from "./schemas";

export const useUpdateSeason = (
  workspaceId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Season,
    Error,
    { season: SeasonForUpdate; seasonId: string }
  >({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces", workspaceId, "seasons"]);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
    mutationFn: async ({ season, seasonId }) => {
      try {
        const resp = await axios.put(
          `${import.meta.env.VITE_API_URL}/seasons/${seasonId}`,
          season,
          {
            withCredentials: true,
          }
        );

        const parsedSeason = await SeasonFromApiSchema.parseAsync(resp.data);

        return parsedSeason;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error updating season."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error updating season.");
        }
      }
    },
  });

  return mutation;
};

export const useDeleteSeason = (
  workspaceId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, string>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces", workspaceId, "seasons"], {
        exact: true,
      });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
    mutationFn: async (seasonId) => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/seasons/${seasonId}`,
          {
            withCredentials: true,
          }
        );
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error deleting season."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error deleting season.");
        }
      }
    },
  });

  return mutation;
};

export const useCreateSeason = (
  workspaceId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Season, Error, SeasonForCreate>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces", workspaceId, "seasons"]);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
    mutationFn: async (season) => {
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}/seasons`,
          season,
          {
            withCredentials: true,
          }
        );

        const parsedSeason = await SeasonFromApiSchema.parseAsync(resp.data);

        return parsedSeason;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error creating season."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error creating season.");
        }
      }
    },
  });

  return mutation;
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
