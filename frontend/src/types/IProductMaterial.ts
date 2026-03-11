export interface IProductMaterialResponse {
  id: number;
  productId: number;
  productName: string;
  materialId: number;
  rawMaterialName: string;
  quantityNeeded: number;
}

export interface IProductMaterialRequest {
  productId: number;
  materialId: number;
  quantityNeeded: number;
}
