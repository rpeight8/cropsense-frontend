import { useQuery } from "@tanstack/react-query";
import { FieldWeather } from "./types";
import axios from "axios";
import { FieldWeatherApiSchema } from "./schemas";

export const useFieldWeather = (fieldId: string | null) => {
  return useQuery<FieldWeather, Error>(
    ["fields", fieldId, "weather-current"],
    async (): Promise<FieldWeather> => {
      try {
        return {
          temperature: 0,
          humidity: 0,
          windSpeed: 0,
          windDirection: 0,
          cloudCover: 0,
          cloudType: 0,
          precipitation: 0,
          date: new Date().toISOString(),
        };
        // const resp = await axios.get(
        //   `${import.meta.env.VITE_API_URL}/fields/${fieldId}/weather`,
        //   {
        //     withCredentials: true,
        //   }
        // );
        // const weather = await FieldWeatherApiSchema.parseAsync(resp.data);
        // return weather;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error fetching weather."
          );
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error fetching weather.");
        }
      }
    },
    {
      enabled: !!fieldId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 60 * 1000 * 15,
    }
  );
};
