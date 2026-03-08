import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialReducer } from "./features/rawMaterial/rawMaterial-slice";
import { productReducer } from "./features/produtc/product-slice";
import { productMaterialReducer } from "./features/productMaterial/product-material-slice";

export const store = configureStore({
  reducer: {
    rawMaterial: rawMaterialReducer,
    product: productReducer,
    productMaterial: productMaterialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
