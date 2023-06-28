import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { FieldId, NDVI, NDVIByFieldId, NDVIs } from "@/types";

type NDVIState = {
  ndvi: NDVIByFieldId;
  selectedNDVIId: string | undefined;
};

const initialState: NDVIState = {
  ndvi: {},
  selectedNDVIId: undefined,
};

export const ndviSlice = createSlice({
  name: "ndvi",
  initialState: initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<NDVIByFieldId>) => {
      state.ndvi = payload;
    },
    setSelectedNDVIId: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      state.selectedNDVIId = payload;
    },
  },
});

export const { set, setSelectedNDVIId } = ndviSlice.actions;

export const selectNDVI = (state: RootState) => state.ndvi;
export const selectNDVIByFieldId = createSelector(
  [(state) => state.ndvi.ndvi, (_: RootState, fieldId: FieldId) => fieldId],
  (ndvi, fieldId): NDVIs => ndvi[fieldId]
);
export const selectSelectedNDVIId = (state: RootState) =>
  state.ndvi.selectedNDVIId;
export default ndviSlice.reducer;
