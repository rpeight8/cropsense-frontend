import { set } from "@/features/crops/cropsSlice";
import { CropsSchema } from "./schemas";
import { useAppDispatch } from "@/store";
import { Crops } from "./types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCrops = () => {
  const dispatch = useAppDispatch();

  return useQuery<Crops, Error>(
    ["crops"],
    async (): Promise<Crops> => {
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}/crops`, {
          withCredentials: true,
        });

        const crops = await CropsSchema.parseAsync(resp.data);
        dispatch(set(crops));
        return crops;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching crops."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error fetching crops.");
        }
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      refetchIntervalInBackground: false,
    }
  );
};
