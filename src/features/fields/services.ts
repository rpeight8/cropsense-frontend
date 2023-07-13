import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Field,
  FieldForCreate,
  FieldForUpdate,
  FieldId,
  FieldSummary,
  Fields,
} from "./types";
import {
  FieldApiSchema,
  FieldSummaryApiSchema,
  FieldsApiSchema,
} from "./schemas";
import axios from "axios";

export const useSeasonFields = (seasonId: string | null) => {
  return useQuery<Fields, Error>(
    ["seasons", seasonId, "fields"],
    async (): Promise<Fields> => {
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/seasons/${seasonId}/fields`,
          {
            withCredentials: true,
          }
        );
        const fields = await FieldsApiSchema.parseAsync(resp.data);
        return fields;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching fields."
          );
        } else if (error instanceof Error) {
          console.error(error.message);
          throw new Error(
            "Server responded with an unappropriated data format."
          );
        } else {
          throw new Error("Unexpected error occured while fetching fields.");
        }
      }
    },
    {
      enabled: !!seasonId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 60 * 1000 * 10,
      refetchIntervalInBackground: true,
    }
  );
};

export const useCreateField = (
  seasonId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Field, Error, FieldForCreate>({
    onSuccess: () => {
      queryClient.invalidateQueries(["seasons", seasonId, "fields"]);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
    mutationFn: async (field) => {
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/seasons/${seasonId}/fields`,
          field,
          {
            withCredentials: true,
          }
        );

        const createdField = await FieldApiSchema.parseAsync(resp.data);
        return createdField;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error creating field."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error creating field.");
        }
      }
    },
  });

  return mutation;
};

export const useUpdateField = (
  seasonId: string | null,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Field,
    Error,
    {
      fieldId: FieldId;
      field: FieldForUpdate;
    }
  >({
    onSuccess: () => {
      queryClient.invalidateQueries(["seasons", seasonId, "fields"]);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
    mutationFn: async ({ fieldId, field }) => {
      try {
        const resp = await axios.put(
          `${import.meta.env.VITE_API_URL}/fields/${fieldId}`,
          field,
          {
            withCredentials: true,
          }
        );

        const updatedField = await FieldApiSchema.parseAsync(resp.data);
        return updatedField;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error updating field."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error updating field.");
        }
      }
    },
  });

  return mutation;
};

export const useDeleteField = (
  seasonId: string | null,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, FieldId>({
    onSuccess: () => {
      queryClient.invalidateQueries(["seasons", seasonId, "fields"]);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
    mutationFn: async (fieldId) => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/fields/${fieldId}`,
          {
            withCredentials: true,
          }
        );
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error deleting field."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error deleting field.");
        }
      }
    },
  });

  return mutation;
};

export const useFieldSummary = (fieldId: string | null) => {
  return useQuery<FieldSummary, Error>(
    ["fields", fieldId, "information"],
    async (): Promise<FieldSummary> => {
      return {
        id: fieldId!,
        name: "Field 1",
        seasons: [
          {
            id: "1",
            name: "Season 1",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            crop: {
              id: "1",
              name: "Crop 1",
              color: "red",
            },
          },
          {
            id: "2",
            name: "Season 2",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            crop: {
              id: "2",
              name: "Crop 2",
              color: "yellow",
            },
          },
          {
            id: "3",
            name: "Season 3",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            crop: {
              id: "3",
              name: "Crop 3",
              color: "green",
            },
          },
        ],
        area: 100,
        areaUnit: "ha",
      };
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/fields/${fieldId}/summary`,
          {
            withCredentials: true,
          }
        );
        const summary = await FieldSummaryApiSchema.parseAsync(resp.data);
        return summary;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching field."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error fetching field.");
        }
      }
    },
    {
      enabled: !!fieldId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 60 * 1000 * 10,
      refetchIntervalInBackground: true,
    }
  );
};
