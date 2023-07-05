import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { Crops } from "./types";

type CropsState = {
  crops: Crops;
};

const initialState: CropsState = {
  crops: [],
};

export const cropsSlice = createSlice({
  name: "crops",
  initialState: initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Crops>) => {
      state.crops = payload;
    },
  },
});

export const { set } = cropsSlice.actions;

export const selectCrops = (state: RootState) => state.crops.crops;
export default cropsSlice.reducer;
