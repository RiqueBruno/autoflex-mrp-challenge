import type {
  IRawMaterialRequest,
  IRawMaterialResponse,
} from "../types/IRawMaterial";
import type { IProductRequest, IProductResponse } from "../types/IProduct";
import type {
  IProductMaterialRequest,
  IProductMaterialResponse,
} from "../types/IProductMaterial";
import type { IProductionResponse } from "../types/IProduction";
import type { IProductPage } from "../types/IProductPage";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const rawMaterials = {
  getAll: async (): Promise<IRawMaterialResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/raw-material`);
    if (!response.ok) throw new Error("Raw materials not found");
    return response.json();
  },

  getById: async (id: number): Promise<IRawMaterialResponse> => {
    const response = await fetch(`${API_BASE_URL}/raw-material/${id}`);
    if (!response.ok) throw new Error("Raw material not found");
    return response.json();
  },

  create: async (data: IRawMaterialRequest): Promise<IRawMaterialResponse> => {
    const response = await fetch(`${API_BASE_URL}/raw-material`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error registering raw material.");
    return response.json();
  },

  update: async (
    id: number,
    data: IRawMaterialRequest,
  ): Promise<IRawMaterialResponse> => {
    const response = await fetch(`${API_BASE_URL}/raw-material/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error updating raw material.");
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/raw-material/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error deleting raw material.");
    return;
  },
};

const products = {
  getAll: async (): Promise<IProductResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Products not found");
    return response.json();
  },
  getAllByPage: async (
    page: number = 0,
    size: number = 10,
  ): Promise<IProductPage> => {
    const response = await fetch(
      `${API_BASE_URL}/products?page=${page}&size=${size}`,
    );
    if (!response.ok) throw new Error("Products not found");
    return response.json();
  },

  getById: async (id: number): Promise<IProductResponse> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Product not found");
    return response.json();
  },

  create: async (data: IProductRequest): Promise<IProductResponse> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error registering product.");
    return response.json();
  },

  update: async (
    id: number,
    data: IProductRequest,
  ): Promise<IProductResponse> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error updating product.");
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error deleting product.");
    return;
  },
};

const productMaterials = {
  getAll: async (): Promise<IProductMaterialResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/products-material`);
    if (!response.ok) throw new Error("Error fetching product materials.");
    return response.json();
  },

  getRecipeByProductId: async (
    productId: number,
  ): Promise<IProductMaterialResponse[]> => {
    const response = await fetch(
      `${API_BASE_URL}/products-material/product/${productId}`,
    );
    if (!response.ok) throw new Error("Error fetching product recipe.");
    return response.json();
  },

  create: async (
    data: IProductMaterialRequest,
  ): Promise<IProductMaterialResponse> => {
    const response = await fetch(`${API_BASE_URL}/products-material`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error adding ingredient to recipe.");
    return response.json();
  },

  update: async (
    id: number,
    data: IProductMaterialRequest,
  ): Promise<IProductMaterialResponse> => {
    const response = await fetch(`${API_BASE_URL}/products-material/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error updating ingredient in recipe.");
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products-material/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error deleting ingredient from recipe.");
    return;
  },
};

const productions = {
  getSuggestions: async (): Promise<IProductionResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/productions/suggestions`);
    if (!response.ok) throw new Error("Error fetching production suggestions.");
    return response.json();
  },
};

export const api = {
  rawMaterials: rawMaterials,
  products: products,
  productMaterials: productMaterials,
  productions: productions,
};
