import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { Coordinates, Zoom } from "@/types";

type MapState = {
  viewPort: {
    center: Coordinates;
    zoom: Zoom;
  };
};

const initialState: MapState = {
  viewPort: {
    center: [52, 32],
    zoom: 15,
  },
};

export const mapSlice = createSlice({
  name: "map",
  initialState: initialState,
  reducers: {
    setViewPort: (
      state,
      { payload }: PayloadAction<{ center: Coordinates; zoom: Zoom }>
    ) => {
      state.viewPort = payload;
    },

    setMapCoordinates: (
      state,
      { payload }: PayloadAction<{ center: Coordinates; zoom: Zoom }>
    ) => {
      state.viewPort.center = payload.center;
      state.viewPort.zoom = payload.zoom;
    },

    setCenter: (state, { payload }: PayloadAction<Coordinates>) => {
      state.viewPort.center = payload;
    },
    setZoom: (state, { payload }: PayloadAction<Zoom>) => {
      state.viewPort.zoom = payload;
    },
  },
});

export const { setViewPort, setCenter, setZoom, setMapCoordinates } =
  mapSlice.actions;

export const selectMap = (state: RootState) => state.map;
export const selectViewPort = (state: RootState) => state.map.viewPort;
export const selectCenter = (state: RootState) => state.map.viewPort.center;
export const selectZoom = (state: RootState) => state.map.viewPort.zoom;
export default mapSlice.reducer;
