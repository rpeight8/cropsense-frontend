import {createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

type SeasonsState = {
  selectedSeasonId: string | null;
};

const initialState: SeasonsState = {
  selectedSeasonId: null,
};

export const seasonsSlice = createSlice({
  name: "seasons",
  initialState: initialState,
  reducers: {
    setSelectedSeasonId: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedSeasonId = payload;
    },
  },
});

export const { setSelectedSeasonId } = seasonsSlice.actions;

export const selectSelectedSeasonId = (state: RootState) =>
  state.seasons.selectedSeasonId;

export default seasonsSlice.reducer;
