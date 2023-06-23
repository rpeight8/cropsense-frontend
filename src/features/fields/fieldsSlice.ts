import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { Field, FieldGeometry, FieldId } from "@/types";

type FieldsState = {
  hoveredFieldId: FieldId | undefined;
  selectedFieldId: FieldId | undefined;
  newLocalFieldGeometry: FieldGeometry | undefined;
  fields: Field[];
};

const initialState: FieldsState = {
  fields: [],
  newLocalFieldGeometry: undefined,
  selectedFieldId: undefined,
  hoveredFieldId: undefined,
};

export const fieldsSlice = createSlice({
  name: "fields",
  initialState: initialState,
  reducers: {
    remove: (state, { payload }: PayloadAction<FieldId>) => {
      state.fields = state.fields.filter((field) => field.id !== payload);
    },
    add: (state, { payload }: PayloadAction<Field>) => {
      state.fields.push(payload);
    },
    set: (state, { payload }: PayloadAction<Field[]>) => {
      state.fields = payload;
    },
    setHoveredFieldId: (
      state,
      { payload }: PayloadAction<FieldId | undefined>
    ) => {
      state.hoveredFieldId = payload;
    },
    selectFieldId: (state, { payload }: PayloadAction<FieldId | undefined>) => {
      state.selectedFieldId = payload;
    },
    setNewLocalFieldGeometry: (
      state,
      { payload }: PayloadAction<FieldGeometry | undefined>
    ) => {
      state.newLocalFieldGeometry = payload;
    },
  },
});

export const {
  remove,
  add,
  set,
  setHoveredFieldId,
  selectFieldId,
  setNewLocalFieldGeometry,
} = fieldsSlice.actions;

export const selectFields = (state: RootState) => state.fields.fields;
export const selectHoveredFieldId = (state: RootState) =>
  state.fields.hoveredFieldId;
export const selectSelectedFieldId = (state: RootState) =>
  state.fields.selectedFieldId;

export const selectNewLocalFieldGeometry = (state: RootState) =>
  state.fields.newLocalFieldGeometry;

export default fieldsSlice.reducer;
