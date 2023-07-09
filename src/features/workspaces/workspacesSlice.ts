import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { Workspaces } from "./types";

type WorkspacesState = {
  workspaces: Workspaces;
  selectedWorkspaceId: string | null;
};

const initialState: WorkspacesState = {
  workspaces: [],
  selectedWorkspaceId: null,
};

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: initialState,
  reducers: {
    setWorkspaces: (state, { payload }: PayloadAction<Workspaces>) => {
      state.workspaces = payload;
    },
    setSelectedWorkspaceId: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.selectedWorkspaceId = payload;
    },
  },
});

export const { setWorkspaces, setSelectedWorkspaceId } =
  workspacesSlice.actions;

export const selectWorkspaces = (state: RootState) =>
  state.workspaces.workspaces;
export const selectSelectedWorkspaceId = (state: RootState) =>
  state.workspaces.selectedWorkspaceId;

export default workspacesSlice.reducer;
