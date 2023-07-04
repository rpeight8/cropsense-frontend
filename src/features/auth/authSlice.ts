import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { User } from "@/types";

type AuthState = {
  user?: User;
};

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<AuthState>) => {
      return payload;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
});

export const { set, setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
