import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Field, FieldForCreation, FieldForUpdate, FieldId } from "./types";
import { FieldSchema, FieldsSchema } from "./schemas";
import { useAppDispatch } from "@/store";
import { set } from "./fieldsSlice";
import axios from "axios";

export const useFields = () => {
  const dispatch = useAppDispatch();

  return useQuery<Field[], Error>(
    ["fields"],
    async (): Promise<Field[]> => {
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}/fields`, {
          withCredentials: true,
        });

        const fields = FieldsSchema.parse(resp.data);
        dispatch(set(fields));
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
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: 60000,
      refetchIntervalInBackground: false,
    }
  );
};

export const useMutateNewField = (
  onSuccess?: (data: Field) => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Field, Error, FieldForCreation>({
    onSuccess: (data) => {
      queryClient.invalidateQueries(["fields"]);
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
    mutationFn: async (field: FieldForCreation) => {
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/fields`,
          field,
          {
            withCredentials: true,
          }
        );

        const newField = FieldSchema.parse(resp.data);
        return newField;
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

export const useMutateField = (
  fieldId: FieldId,
  onSuccess?: (data: Field) => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Field, Error, FieldForUpdate>({
    onSuccess: (data) => {
      queryClient.invalidateQueries(["fields"]);
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

        const updatedField = FieldSchema.parse(resp.data);
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
