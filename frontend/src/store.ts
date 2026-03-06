import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialReducer } from "./features/rawMaterial/rawMaterial-slice";
import { productReducer } from "./features/produtc/product-slice";

export const store = configureStore({
  reducer: {
    rawMaterial: rawMaterialReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
