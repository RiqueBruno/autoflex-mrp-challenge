import { useEffect, useState } from "react";
import { VerticalChart } from "../components/chart/VerticalChart";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { ProductTable } from "../components/tables/ProductTable";
import {
  createProduct,
  fetchProducts,
} from "../features/produtc/product-slice";
import { FormProduct } from "../components/form/FormProduct";
import type { IProductRequest } from "../types/IProduct";
import { BaseModal } from "../components/ui/BaseModal";
import Swal from "sweetalert2";

export const Products = () => {
  const [openForm, setOpenForm] = useState(false);
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

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

  const saveProductHandler = (data: IProductRequest) => {
    try {
      dispatch(createProduct(data))
        .unwrap()
        .then((result) => {
          Swal.fire({
            title: "Success!",
            text: `Product "${result.name}" has been created successfully!`,
            icon: "success",
            confirmButtonColor: "#22c55e",
          });
        });
      setOpenForm(false);
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong while saving the product. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };
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
          <button
            onClick={() => setOpenForm(true)}
            className="bg-brand-darkBlue text-text-inverted px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Product
          </button>
        </header>
        <ProductTable products={product} />
        {openForm && (
          <BaseModal title="Add New Product" onClose={() => setOpenForm(false)}>
            <FormProduct onSubmit={saveProductHandler} onClose={setOpenForm} />
          </BaseModal>
        )}
      </section>
    </div>
  );
};
