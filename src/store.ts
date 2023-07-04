import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import fieldsReducer from "@/features/fields/fieldsSlice";
import mapReducer from "@/features/map/mapSlice";
import ndviReducer from "@/features/ndvi/ndviSlice";
import cropsReducer from "@/features/crops/cropsSlice";
import formsReducer from "@/features/forms/formsSlice";

const store = configureStore({
  reducer: {
    fields: fieldsReducer,
    map: mapReducer,
    ndvi: ndviReducer,
    crops: cropsReducer,
    forms: formsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
