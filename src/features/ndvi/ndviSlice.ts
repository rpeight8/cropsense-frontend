import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { FieldId, NDVI } from "@/types";

type NDVIByFieldId = {
  [key: FieldId]: NDVI;
};
type NDVIState = {
  ndvi: {
    [key: string]: NDVI;
  };
};

const initialState: NDVIState = {
  ndvi: {},
};

export const ndviSlice = createSlice({
  name: "ndvi",
  initialState: initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<NDVIByFieldId>) => {
      state.ndvi = payload;
    },
  },
});

export const { set } = ndviSlice.actions;

export const selectNDVI = (state: RootState) => state.ndvi;
export const selectNDVIByFieldId = (state: RootState, fieldId: FieldId) =>
  state.ndvi.ndvi[fieldId];

export default ndviSlice.reducer;
