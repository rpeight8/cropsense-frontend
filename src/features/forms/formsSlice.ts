import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import {
  FieldCoordinates,
  FieldForCreate,
  FieldForUpdate,
  FieldGeometry,
} from "../fields/types";

type FieldForCreationGeometry = Pick<FieldForCreate, "geometry">;
type FieldForUpdateGeometry = Pick<FieldForUpdate, "geometry">;

type FormsState = {
  addField: FieldForCreationGeometry;
  editField: FieldForUpdateGeometry;
};

const initialAddFieldState: FieldForCreationGeometry = {
  geometry: {
    type: "Polygon",
    coordinates: [[], []],
  },
};

const initialEditFieldState: FieldForUpdateGeometry = {
  geometry: {
    type: "Polygon",
    coordinates: [[], []],
  },
};

const initialState: FormsState = {
  addField: initialAddFieldState,
  editField: initialEditFieldState,
};

export const formsSlice = createSlice({
  name: "forms",
  initialState: initialState,
  reducers: {
    setAddField: (state, { payload }: PayloadAction<FieldForCreate>) => {
      state.addField = payload;
    },
    setAddFieldGeometry: (state, { payload }: PayloadAction<FieldGeometry>) => {
      state.addField.geometry = payload;
    },
    setAddFieldCoordinates: (
      state,
      { payload }: PayloadAction<FieldCoordinates>
    ) => {
      state.addField.geometry.coordinates = payload;
    },

    setEditField: (state, { payload }: PayloadAction<FieldForUpdate>) => {
      state.editField = payload;
    },

    setEditFieldGeometry: (
      state,
      { payload }: PayloadAction<FieldGeometry>
    ) => {
      state.editField.geometry = payload;
    },

    resetAddField: (state) => {
      state.addField = initialAddFieldState;
    },

    resetEditField: (state) => {
      state.editField = initialEditFieldState;
    },
  },
});

export const {
  setAddField,
  setEditField,
  setAddFieldGeometry,
  setEditFieldGeometry,
  resetAddField,
  resetEditField,
} = formsSlice.actions;
export const selectForms = (state: RootState) => state.forms;
export const selectAddField = (state: RootState) => state.forms.addField;
export const selectAddFieldGeometry = (state: RootState) =>
  state.forms.addField.geometry;
export const selectEditField = (state: RootState) => state.forms.editField;
export const selectEditFieldGeometry = (state: RootState) =>
  state.forms.editField.geometry;

export default formsSlice.reducer;
