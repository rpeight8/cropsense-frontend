import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { Field, FieldId } from "@/types";

type FieldsState = Field[];

const initialState: FieldsState = [];

export const fieldsSlice = createSlice({
  name: "fields",
  initialState: initialState,
  reducers: {
    remove: (state, { payload }: PayloadAction<FieldId>) => {
      return state.filter((field) => field.id !== payload);
    },
    add: (state, { payload }: PayloadAction<Field>) => {
      state.push(payload);
    },
    set: (_, { payload }: PayloadAction<Field[]>) => {
      return payload;
    },
  },
});

export const { remove, add, set } = fieldsSlice.actions;

export const selectFields = (state: RootState) => state.fields;

export default fieldsSlice.reducer;
