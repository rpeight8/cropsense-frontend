import { NDVIsSchema } from "./schemas";
import { useAppDispatch } from "@/store";
import { NDVI, NDVIByFieldId } from "./types";
import { useQuery } from "@tanstack/react-query";
import { set } from "./ndviSlice";
import { useToast } from "@/components/ui/Toast/useToast";
import axios from "axios";
import { FieldId } from "../fields/types";

export const useNDVI = (fieldId: FieldId = "") => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  return useQuery<NDVI[], Error>(
    ["ndvi", fieldId],
    async (): Promise<NDVI[]> => {
      if (!fieldId) return [];
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/ndvi/${fieldId}`,
          {
            withCredentials: true,
          }
        );

        const parsedNDVIs = await NDVIsSchema.parseAsync(resp.data);
        dispatch(
          set(
            parsedNDVIs.reduce((acc, ndvi) => {
              if (!acc[ndvi.fieldId]) {
                acc[ndvi.fieldId] = [];
              }
              acc[ndvi.fieldId].push(ndvi);
              return acc;
            }, {} as NDVIByFieldId)
          )
        );
        return parsedNDVIs;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching ndvi."
          );
        } else {
          throw new Error("Error fetching ndvi.");
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
