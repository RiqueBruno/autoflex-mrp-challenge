import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import type { IProductResponse, IProductRequest } from "../../types/IProduct";

interface InitState {
  product: IProductResponse[];
  productsByPage: IProductResponse[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalElements: number;
}

const initialState: InitState = {
  product: [],
  productsByPage: [],
  status: "idle",
  error: null,
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
};

// THUNKS
// -------------------------------------------------------------------------
export const fetchProducts = createAsyncThunk("product/fetchAll", async () => {
  return await api.products.getAll();
});

export const fetchProductsByPage = createAsyncThunk(
  "product/fetchByPage",
  async ({ page, size }: { page: number; size: number }) => {
    return await api.products.getAllByPage(page, size);
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
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products.";
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
      })
      .addCase(fetchProductsByPage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsByPage = action.payload.content as IProductResponse[];

        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchProductsByPage.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch paginated products.";
      });
  },
});

export const productReducer = productSlice.reducer;
