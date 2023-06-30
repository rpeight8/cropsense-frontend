import { NDVIsSchema } from "@/schemas/ndvi";
import { useAppDispatch } from "@/store";
import { FieldId, NDVI, NDVIByFieldId } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { set } from "@/features/ndvi/ndviSlice";
import { useToast } from "@/components/ui/Toast/useToast";

export const useNDVI = (fieldId: FieldId = "") => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  return useQuery<NDVI[], Error>(
    ["ndvi", fieldId],
    async (): Promise<NDVI[]> => {
      if (!fieldId) return [];
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/ndvi/${fieldId}`
        );
        if (!res.ok) throw new Error("Network response was not ok.");
        const { ndvis } = await res.json();
        const parsedNDVIs = NDVIsSchema.parse(ndvis);

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
        return ndvis;
      } catch (error: unknown) {
        console.log(error);
        toast({
          title: "Error fetching ndvi.",
          description: "Please try again later.",
          variant: "destructive",
        });
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
