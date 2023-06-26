import { NDVISchema } from "@/schemas";
import { useAppDispatch } from "@/store";
import { FieldId, NDVI } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { set } from "@/features/ndvi/ndviSlice";

export const useNDVI = (fieldId: FieldId) => {
  const dispatch = useAppDispatch();

  return useQuery<NDVI[], Error>(
    ["fields"],
    async (): Promise<NDVI[]> => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/ndvi/${fieldId}`
        );
        if (!res.ok) throw new Error("Network response was not ok.");
        const { ndvi: data } = await res.json();
        NDVISchema.parse(data);
        dispatch(set(data));
        return data;
      } catch (error: unknown) {
        console.log(error);
        throw new Error("Error fetching ndvi.");
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
