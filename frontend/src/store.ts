import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialReducer } from "./features/rawMaterial/rawMaterial-slice";

export const store = configureStore({
  reducer: {
    rawMaterial: rawMaterialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
