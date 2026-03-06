import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import type { IProductResponse, IProductRequest } from "../../types/IProduct";

interface InitState {
  product: IProductResponse[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitState = {
  product: [],
  status: "idle",
  error: null,
};

// THUNKS
// -------------------------------------------------------------------------
export const fetchProducts: any = createAsyncThunk(
  "product/fetchAll",
  async () => {
    return await api.products.getAll();
  },
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (data: IProductRequest) => {
    return await api.products.create(data);
  },
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }: { id: number; data: IProductRequest }) => {
    return await api.products.update(id, data);
  },
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: number) => {
    await api.products.delete(id);
    return id;
  },
);

// SLICE
// -------------------------------------------------------------------------
export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.product.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.product[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export const productReducer = productSlice.reducer;
