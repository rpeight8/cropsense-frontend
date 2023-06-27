import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { FieldId, NDVI, NDVIByFieldId, NDVIs } from "@/types";

type NDVIState = {
  ndvi: NDVIByFieldId;
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
export const selectNDVIByFieldId = createSelector(
  [(state) => state.ndvi.ndvi, (_: RootState, fieldId: FieldId) => fieldId],
  (ndvi, fieldId): NDVIs => ndvi[fieldId]
);
export default ndviSlice.reducer;
