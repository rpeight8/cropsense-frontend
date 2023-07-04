import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Field, FieldForCreation, FieldForUpdate, FieldId } from "@/types";
import { FieldSchema, FieldsSchema } from "@/schemas/field";

import { useAppDispatch } from "@/store";
import { set } from "@/features/fields/fieldsSlice";

export const useFields = () => {
  const dispatch = useAppDispatch();

  return useQuery<Field[], Error>(
    ["fields"],
    async (): Promise<Field[]> => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fields`);
        if (!res.ok) throw new Error("Network response was not ok.");
        const data = await res.json();
        FieldsSchema.parse(data);
        dispatch(set(data));
        return data;
      } catch (error: unknown) {
        console.log(error);
        throw new Error("Error fetching fields.");
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fields`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(field),
        });
        if (!res.ok) throw new Error("Network response was not ok.");
        const newField = FieldSchema.parse(await res.json());
        return newField;
      } catch (error: unknown) {
        console.log(error);
        throw new Error("Error creating field.");
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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/fields/${fieldId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(field),
          }
        );
        if (!res.ok) throw new Error("Network response was not ok.");
        const updatedField = FieldSchema.parse(await res.json());
        return updatedField;
      } catch (error: unknown) {
        console.log(error);
        throw new Error("Error updating field.");
      }
    },
  });

  return mutation;
};
