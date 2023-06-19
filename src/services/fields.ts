import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Field, FieldForCreation } from "@/types";
import { FieldSchema, FieldsSchema } from "@/schemas";

import { useAppDispatch } from "@/store";
import { set } from "@/features/fields/fieldsSlice";

export const useFields = () => {
  const dispatch = useAppDispatch();

  return useQuery<Field[], Error>(["fields"], async (): Promise<Field[]> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/fields`);
      if (!res.ok) throw new Error("Network response was not ok.");
      const { fields: data } = await res.json();
      FieldsSchema.parse(data);
      dispatch(set(data));
      return data;
    } catch (error: unknown) {
      console.log(error);
      throw new Error("Error fetching fields.");
    }
  });
};

export const useMutateNewField = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Field, Error, FieldForCreation>({
    onSuccess: () => {
      queryClient.invalidateQueries(["fields"]);
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
        const { field: data } = await res.json();
        FieldSchema.parse(data);
        return data;
      } catch (error: unknown) {
        console.log(error);
        throw new Error("Error creating field.");
      }
    },
  });

  return mutation;
};
