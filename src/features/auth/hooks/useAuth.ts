import { useAppDispatch, useAppSelector } from "@/store";
import { selectUser, setUser } from "../authSlice";
import { useCallback, useState } from "react";
import { signIn, verify, signUp } from "../services";
import { Credentials } from "../types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const signInWithCredentials = useCallback(
    async (credentials: Credentials) => {
      setIsLoading(true);
      try {
        const user = await signIn(credentials);
        dispatch(setUser(user));
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error("Error signing in");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const signUpWithCredentials = useCallback(
    async (credentials: Credentials) => {
      setIsLoading(true);
      try {
        await signUp(credentials);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error("Error signing up");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const verifyAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await verify();
      dispatch(setUser(user));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Error verifying user");
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return {
    user,
    verifyAuth,
    signInWithCredentials,
    signUpWithCredentials,
    isLoading,
  };
};
