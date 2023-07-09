import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Field,
  FieldForCreation,
  FieldForUpdate,
  FieldId,
  Fields,
} from "./types";
import { FieldSchema, FieldsSchema } from "./schemas";
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
        const fields = await FieldsSchema.parseAsync(resp.data);

        return fields;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching fields."
          );
        } else {
          throw new Error("Error fetching fields.");
        }
      }
    },
    {
      enabled: !!seasonId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 60 * 1000 * 1,
      refetchIntervalInBackground: true,
    }
  );
};

export const useAddField = (
  seasonId: string | null,
  onSuccess?: (data: Field) => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Field, Error, FieldForCreation>({
    onSuccess: (data) => {
      queryClient.invalidateQueries(["seasons", seasonId, "fields"]);
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
    mutationFn: async (field: FieldForCreation) => {
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/seasons/${seasonId}/fields`,
          field,
          {
            withCredentials: true,
          }
        );

        const craeteField = await FieldSchema.parseAsync(resp.data);
        return craeteField;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error creating field."
          );
        } else {
          throw new Error("Error creating field..");
        }
      }
    },
  });

  return mutation;
};

export const useEditField = (
  fieldId: FieldId,
  seasonId: string | null,
  onSuccess?: (data: Field) => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Field, Error, FieldForUpdate>({
    onSuccess: (data) => {
      queryClient.invalidateQueries(["seasons", seasonId, "fields"]);
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
    mutationFn: async (field: FieldForUpdate) => {
      try {
        const resp = await axios.put(
          `${import.meta.env.VITE_API_URL}/fields/${fieldId}`,
          field,
          {
            withCredentials: true,
          }
        );

        const updatedField = await FieldSchema.parseAsync(resp.data);
        return updatedField;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error updating field."
          );
        } else {
          throw new Error("Error updating field.");
        }
      }
    },
  });

  return mutation;
};
