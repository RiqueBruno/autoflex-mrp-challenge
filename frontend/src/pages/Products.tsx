import { useEffect } from "react";
import { VerticalChart } from "../components/chart/VerticalChart";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/useAppSelector";
import { ProductTable } from "../components/tables/ProductTable";
import { fetchProducts } from "../features/produtc/product-slice";

export const Products = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMaterials() {
      try {
        dispatch(fetchProducts());
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }

    fetchMaterials();
  }, [dispatch]);
  console.log(product);

  const sortedMaterials = [...product].sort((a, b) => b.value - a.value);
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-bold text-text-title">Products</h1>
        <p className="text-text-muted mt-1">
          Manage the inventory and products of the factory.
        </p>
      </header>
      <section aria-labelledby="dash-title">
        <h2 id="dash-title" className="sr-only">
          Stock Summary
        </h2>
        <div className="bg-surface-card border border-border-light rounded-lg shadow-sm p-6 w-full lg:w-1/2 h-72">
          <h3 className="text-sm font-semibold text-text-main mb-4 uppercase tracking-wider">
            Top 5 Products by Value
          </h3>
          <VerticalChart
            data={[]}
            type="product"
            dataP={sortedMaterials.slice(0, 5)}
          />
        </div>
      </section>

      <section aria-labelledby="table-title">
        <header className="flex justify-between items-center flex-col md:flex-row mb-4">
          <h2
            id="table-title"
            className="text-xl font-semibold text-text-title"
          >
            Product List
          </h2>
          <button className="bg-brand-darkBlue text-text-inverted px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> New Product
          </button>
        </header>
        <ProductTable products={product} />
      </section>
    </div>
  );
};
