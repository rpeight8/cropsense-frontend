import { setU } from "@/features/auth/hooks/useAuth";
import { UserSchema } from "@/schemas/user";
import { useAppDispatch } from "@/store";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useVerify = () => {
  return useQuery<User, Error>(
    ["verify"],
    async (): Promise<User> => {
      try {
        const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/verify`);
        if (!res.ok) throw new Error("Network response was not ok.");
        const data = await res.json();
        const user = UserSchema.parse(data);
        return user;
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
