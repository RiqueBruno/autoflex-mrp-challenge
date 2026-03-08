import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  IProductMaterialRequest,
  IProductMaterialResponse,
} from "../../types/IProductMaterial";
import { api } from "../../services/api";

interface InitialState {
  productMaterial: IProductMaterialResponse[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  productMaterial: [],
  status: "idle",
  error: null,
};

// THUNKS
// -------------------------------------------------------------------------
export const fetchProductsMaterials = createAsyncThunk(
  "productsMaterial/getAll",
  async () => {
    return await api.productMaterials.getAll();
  },
);

export const fetchByProductId = createAsyncThunk(
  "productsMaterial/getRecipeByProductId",
  async (id: number) => {
    return await api.productMaterials.getRecipeByProductId(id);
  },
);

export const createProductMaterial = createAsyncThunk(
  "productsMaterial/create",
  async (data: IProductMaterialRequest) => {
    return await api.productMaterials.create(data);
  },
);

export const updateProductMaterial = createAsyncThunk(
  "productsMaterial/update",
  async ({ id, data }: { id: number; data: IProductMaterialRequest }) => {
    return await api.productMaterials.update(id, data);
  },
);
export const deleteProductMaterial = createAsyncThunk(
  "productsMaterial/delete",
  async (id: number) => {
    await api.productMaterials.delete(id);
    return id;
  },
);

// SLICE
// -------------------------------------------------------------------------
export const productMaterialSlice = createSlice({
  name: "productMaterial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsMaterials.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productMaterial = action.payload;
      })
      .addCase(fetchProductsMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch product materials.";
      })
      .addCase(fetchByProductId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productMaterial = action.payload;
      })
      .addCase(createProductMaterial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productMaterial.push(action.payload);
      })
      .addCase(updateProductMaterial.fulfilled, (state, action) => {
        const index = state.productMaterial.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.productMaterial[index] = action.payload;
        }
      })
      .addCase(deleteProductMaterial.fulfilled, (state, action) => {
        state.productMaterial = state.productMaterial.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export const productMaterialReducer = productMaterialSlice.reducer;
