import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import fieldsReducer from "@/features/fields/fieldsSlice";
import mapReducer from "@/features/map/mapSlice";
import ndviReducer from "@/features/ndvi/ndviSlice";
import cropsReducer from "@/features/crops/cropsSlice";
import formsReducer from "@/features/forms/formsSlice";
import authReducer from "@/features/auth/authSlice";
import workspacesReducer from "@/features/workspaces/workspacesSlice";
import seasonsReducer from "@/features/seasons/seasonsSlice";

const store = configureStore({
  reducer: {
    fields: fieldsReducer,
    map: mapReducer,
    ndvi: ndviReducer,
    crops: cropsReducer,
    forms: formsReducer,
    auth: authReducer,
    workspaces: workspacesReducer,
    seasons: seasonsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
