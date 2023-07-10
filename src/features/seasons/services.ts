import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Season, SeasonForCreate, SeasonForUpdate } from "./types";
import { SeasonFromApiSchema, SeasonSchema } from "./schemas";

export const useUpdateSeason = (seasonId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Season,
    Error,
    { season: SeasonForUpdate; seasonId: string }
  >({
    onSuccess: () => {
      queryClient.invalidateQueries(["seasons", seasonId]);
    },
    mutationFn: async ({ season }) => {
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

export const useDeleteSeason = (workspaceId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Season, Error, string>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces", workspaceId]);
    },
    mutationFn: async (seasonId) => {
      try {
        const resp = await axios.delete(
          `${import.meta.env.VITE_API_URL}/seasons/${seasonId}`,
          {
            withCredentials: true,
          }
        );

        const parsedSeason = await SeasonFromApiSchema.parseAsync(resp.data);

        return parsedSeason;
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

export const useCreateSeason = (workspaceId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Season, Error, SeasonForCreate>({
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces", workspaceId, "seasons"]);
    },
    mutationFn: async (season: SeasonForCreate) => {
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
        } else {
          throw new Error("Error creating season.");
        }
      }
    },
  });

  return mutation;
};
