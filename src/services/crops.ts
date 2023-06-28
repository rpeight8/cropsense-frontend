import { set } from "@/features/crops/cropsSlice";
import { CropsSchema } from "@/schemas/crop";
import { useAppDispatch } from "@/store";
import { Crops } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFields = () => {
  const dispatch = useAppDispatch();

  return useQuery<Crops, Error>(
    ["fields"],
    async (): Promise<Crops> => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/crops`);
        if (!res.ok) throw new Error("Network response was not ok.");
        const { crops: data } = await res.json();
        CropsSchema.parse(data);
        dispatch(set(data));
        return data;
      } catch (error: unknown) {
        console.log(error);
        throw new Error("Error fetching crops.");
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
