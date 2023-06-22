import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { Field, FieldId } from "@/types";

type FieldsState = {
  highlightedFieldId: FieldId | undefined;
  selectedFieldId: FieldId | undefined;
  fields: Field[];
};

const initialState: FieldsState = {
  fields: [],
  selectedFieldId: undefined,
  highlightedFieldId: undefined,
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
    hightlightField: (state, { payload }: PayloadAction<FieldId>) => {
      state.highlightedFieldId = payload;
    },
    selectField: (state, { payload }: PayloadAction<FieldId>) => {
      state.selectedFieldId = payload;
    },
  },
});

export const { remove, add, set, hightlightField, selectField } =
  fieldsSlice.actions;

export const selectFields = (state: RootState) => state.fields.fields;
export const selectHighlightedFieldId = (state: RootState) =>
  state.fields.highlightedFieldId;
export const selectSelectedFieldId = (state: RootState) =>
  state.fields.selectedFieldId;

export default fieldsSlice.reducer;
