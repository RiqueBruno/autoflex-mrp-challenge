import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import type {
  IRawMaterialResponse,
  IRawMaterialRequest,
} from "../../types/IRawMaterial";

interface InitState {
  rawMaterial: IRawMaterialResponse[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitState = {
  rawMaterial: [],
  status: "idle",
  error: null,
};

// THUNKS
// -------------------------------------------------------------------------
export const fetchRawMaterials = createAsyncThunk(
  "rawMaterial/fetchAll",
  async () => {
    return await api.rawMaterials.getAll();
  },
);

export const createRawMaterial = createAsyncThunk(
  "rawMaterial/create",
  async (data: IRawMaterialRequest) => {
    return await api.rawMaterials.create(data);
  },
);

export const updateRawMaterial = createAsyncThunk(
  "rawMaterial/update",
  async ({ id, data }: { id: number; data: IRawMaterialRequest }) => {
    return await api.rawMaterials.update(id, data);
  },
);

export const deleteRawMaterial = createAsyncThunk(
  "rawMaterial/delete",
  async (id: number) => {
    await api.rawMaterials.delete(id);
    return id;
  },
);

// SLICE
// -------------------------------------------------------------------------
export const rawMaterialSlice = createSlice({
  name: "rawMaterial",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rawMaterial = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch raw materials.";
      })
      .addCase(createRawMaterial.fulfilled, (state, action) => {
        state.rawMaterial.push(action.payload);
      })
      .addCase(updateRawMaterial.fulfilled, (state, action) => {
        const index = state.rawMaterial.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.rawMaterial[index] = action.payload;
        }
      })
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.rawMaterial = state.rawMaterial.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export const rawMaterialReducer = rawMaterialSlice.reducer;
