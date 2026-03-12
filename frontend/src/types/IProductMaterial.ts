export interface IProductMaterialResponse {
  id: number;
  productId: number;
  productName: string;
  rawMaterialId: number;
  rawMaterialName: string;
  quantityNeeded: number;
}

export interface IProductMaterialRequest {
  productId: number;
  rawMaterialId: number;
  quantityNeeded: number;
}
