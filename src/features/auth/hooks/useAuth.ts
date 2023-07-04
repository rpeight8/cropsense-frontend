import { useAppDispatch, useAppSelector } from "@/store";
import { selectUser, setUser } from "../authSlice";
import { useCallback, useState } from "react";
import { UserSchema } from "@/schemas/user";
import { useVerify as useVerifyQuery } from "@/services/auth";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);

  const useVerify = async () => {
    setIsLoading(true);
    const { data: user } = await useVerifyQuery();
    if (user) {
      dispatch(setUser(user));
    }
    setIsLoading(false);
  };

  const signIn = useCallback(async () => {}, []);

  const signOut = useCallback(async () => {}, []);

  return {
    user,
    useVerify,
    isLoading,
    signIn,
    signOut,
  };
};
