import { UserSchema } from "./schemas";
import { Credentials } from "./types";
import axios from "axios";

export const signIn = async (credentials: Credentials) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_AUTH_URL}/signin`,
      credentials,
      {
        withCredentials: true,
      }
    );

    const user = UserSchema.parse(resp.data);
    return user;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error logging in");
    } else {
      throw new Error("Error logging in");
    }
  }
};

export const signUp = async (credentials: Credentials) => {
  try {
    await axios.post(`${import.meta.env.VITE_AUTH_URL}/signup`, credentials, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error creating user");
    } else {
      throw new Error("Error creating user");
    }
  }
};

export const signOut = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_AUTH_URL}/signout`, null, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error logging out");
    } else {
      throw new Error("Error logging out");
    }
  }
};

export const verify = async () => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_AUTH_URL}/verify`,
      null,
      {
        withCredentials: true,
      }
    );

    const user = UserSchema.parse(resp.data);
    return user;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error verifying user");
    } else {
      throw new Error("Error verifying user");
    }
  }
};
