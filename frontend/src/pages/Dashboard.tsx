import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { fetchProducts } from "../features/produtc/product-slice";
import { fetchRawMaterials } from "../features/rawMaterial/rawMaterial-slice";
import { fetchProductsMaterials } from "../features/productMaterial/product-material-slice";
import type { IProductResponse } from "../types/IProduct";
import { VerticalChart } from "../components/chart/VerticalChart";

export const Dashboard = () => {
  const { product } = useAppSelector((state) => state.product);
  const { rawMaterial } = useAppSelector((state) => state.rawMaterial);
  const { productMaterialList } = useAppSelector((s) => s.productMaterial);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchDatas() {
      try {
        await dispatch(fetchProducts());
        await dispatch(fetchRawMaterials());
        await dispatch(fetchProductsMaterials());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchDatas();
  }, [dispatch]);

  const mostUsedRawMaterial = useMemo(() => {
    if (!productMaterialList || productMaterialList.length === 0) {
      return { name: "Not found", count: 0 };
    }

    const counts = productMaterialList.reduce(
      (acc, item) => {
        const name = item.rawMaterialName;
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    let maxName = "";
    let maxCount = 0;

    for (const [name, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxName = name;
      }
    }

    return { name: maxName, count: maxCount };
  }, [productMaterialList]);

  const mostValuableProduct = useMemo(() => {
    if (!product || product.length === 0) {
      return { id: 0, name: "Nenhum", value: 0 } as IProductResponse;
    }
    const result = product.reduce((final, actual) => {
      return actual.value > final.value ? actual : final;
    });
    return result;
  }, [product]);

  const productsQuantity = product.length;
  const rawMaterialQuantity = rawMaterial.length;

  const topFiveProducts = [...product].sort((a, b) => b.value - a.value);
  const topFiveRawMaterial = [...rawMaterial].sort(
    (a, b) => b.amount - a.amount,
  );
  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="dash-title">
        <h2 id="dash-title" className="sr-only">
          Stock Summary
        </h2>
        <div className="grid pb-4 mb-2 grid-cols-2 md:grid-cols-4 gap-2 bg-surface-card border border-border-light rounded-lg shadow-sm p-6 w-full">
          <div className="bg-surface-card border border-border-light rounded-lg shadow-sm p-6 flex flex-col gap-2 justify-between min-h-40">
            <h3 className="text-xs md:text-sm text-center pb-2 font-semibold text-text-muted uppercase tracking-wider">
              Total Products
            </h3>

            <p className="text-lg text-brand-darkBlue font-semibold md:text-4xl text-center self-center">
              {productsQuantity}
            </p>
            <p> </p>
          </div>

          <div className="bg-surface-card border border-border-light rounded-lg shadow-sm p-6 flex flex-col justify-between gap-2 min-h-40">
            <h3 className="text-xs md:text-sm text-center pb-2 font-semibold text-text-muted uppercase tracking-wider">
              Raw Materials
            </h3>

            <p className="text-lg text-brand-darkBlue font-semibold md:text-4xl text-center self-center">
              {rawMaterialQuantity}
            </p>
            <p> </p>
          </div>

          <div className="bg-surface-card min-h-40 border col-span-2 md:col-span-1 border-border-light rounded-lg justify-between shadow-sm p-6 flex flex-col gap-2">
            <h3 className="text-xs md:text-sm text-center pb-2 font-semibold text-text-muted uppercase tracking-wider">
              Top Product
            </h3>

            <p className="text-base md:text-2xl font-bold text-text-title truncate md:text-wrap">
              {mostValuableProduct.name}
            </p>

            <p className="text-sm text-brand-darkBlue font-medium">
              $ {mostValuableProduct.value.toFixed(2)}
            </p>
          </div>

          <div className="bg-surface-card min-h-40 border col-span-2 md:col-span-1 border-border-light rounded-lg shadow-sm p-6 flex flex-col justify-between gap-2">
            <h3 className="text-xs md:text-sm text-center pb-2 font-semibold text-text-muted uppercase tracking-wider">
              Top Material
            </h3>

            <p className="text-base md:text-2xl font-bold text-text-title truncate md:text-wrap">
              {mostUsedRawMaterial.name}
            </p>

            <p className="text-sm text-brand-darkBlue font-medium">
              Used in {mostUsedRawMaterial.count} products.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-surface-card border border-border-light rounded-lg shadow-sm p-6 w-full h-72">
            <h3 className="text-sm font-semibold text-text-main mb-4 uppercase tracking-wider">
              Top 5 Products by Value
            </h3>
            <VerticalChart
              data={[]}
              type="product"
              dataP={topFiveProducts.slice(0, 5)}
            />
          </div>
          <div className="bg-surface-card border border-border-light rounded-lg shadow-sm p-6 w-full h-72">
            <h3 className="text-sm font-semibold text-text-main mb-4 uppercase tracking-wider">
              Top 5 Raw Material by quantity
            </h3>
            <VerticalChart
              data={topFiveRawMaterial.slice(0, 5)}
              type="rawMaterial"
              dataP={[]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
