import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { Seasons } from "./types";

type WorkspacesState = {
  seasons: Seasons;
  selectedSeasonId: string | null;
};

const initialState: WorkspacesState = {
  seasons: [],
  selectedSeasonId: null,
};

export const seasonsSlice = createSlice({
  name: "seasons",
  initialState: initialState,
  reducers: {
    setSeasons: (state, { payload }: PayloadAction<Seasons>) => {
      state.seasons = payload;
    },
    setSelectedSeasonId: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedSeasonId = payload;
    },
  },
});

export const { setSeasons, setSelectedSeasonId } = seasonsSlice.actions;

export const selectSeasons = (state: RootState) => state.seasons.seasons;
export const selectSelectedSeasonId = (state: RootState) =>
  state.seasons.selectedSeasonId;

export default seasonsSlice.reducer;
