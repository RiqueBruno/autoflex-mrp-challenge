import { useEffect, useState } from "react";
import { VerticalChart } from "../components/chart/VerticalChart";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { ProductTable } from "../components/tables/ProductTable";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../features/produtc/product-slice";
import { FormProduct } from "../components/form/FormProduct";
import type { IProductRequest, IProductResponse } from "../types/IProduct";
import { BaseModal } from "../components/ui/BaseModal";
import Swal from "sweetalert2";
import { ProductRecipeModal } from "../components/views/ProductRecipeModal";
import {
  createProductMaterial,
  deleteProductMaterial,
  fetchByProductId,
  fetchProductsMaterials,
  updateProductMaterial,
} from "../features/productMaterial/product-material-slice";
import type { IProductMaterialResponse } from "../types/IProductMaterial";
import { FormMaterialRecipe } from "../components/form/FormMaterialRecipe";
import { FormCreateMaterialRecipe } from "../components/form/FormCreateMaterialRecipe";

export const Products = () => {
  const [openForm, setOpenForm] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [recipeEditFormOpen, setRecipeEditFormOpen] = useState(false);
  const [actualProduct, setActualProduct] = useState<IProductResponse>({
    id: 0,
    name: "",
    value: 0,
  });
  const [actualRecipeItem, setActualRecipeItem] =
    useState<IProductMaterialResponse>({
      id: 0,
      productId: 0,
      rawMaterialId: 0,
      quantityNeeded: 0,
      rawMaterialName: "",
      productName: "",
    });
  const [actutalRecipe, setActualRecipe] = useState<IProductMaterialResponse[]>(
    [],
  );
  const { product } = useAppSelector((state) => state.product);
  const { productMaterial, productMaterialList } = useAppSelector(
    (state) => state.productMaterial,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchMaterials() {
      try {
        await dispatch(fetchProducts());
        await dispatch(fetchProductsMaterials());
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }

    fetchMaterials();
  }, [dispatch]);

  const saveProductHandler = async (data: IProductRequest) => {
    try {
      await dispatch(createProduct(data))
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

  const updateProductHandler = async (data: IProductRequest) => {
    try {
      await dispatch(updateProduct({ id: actualProduct.id, data }))
        .unwrap()
        .then((result) => {
          Swal.fire({
            title: "Success!",
            text: `Product "${result.name}" has been updated successfully!`,
            icon: "success",
            confirmButtonColor: "#22c55e",
          });
        });
      setOpenForm(false);
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong while updating the product. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const editProductHandler = (product: IProductResponse) => {
    setActualProduct(product);
    setOpenForm(true);
  };

  const deleteProductHandler = (product: IProductResponse) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Do you really want to delete the product <strong>"${product.name}"</strong>? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(product.id));
        Swal.fire({
          title: "Deleted!",
          text: `Product "${product.name}" has been deleted.`,
          icon: "success",
          confirmButtonColor: "#22c55e",
        });
      }
    });
  };

  const saveRecipeHandler = async (item: IProductMaterialResponse) => {
    try {
      const data = {
        productId: item.productId,
        rawMaterialId: item.rawMaterialId,
        quantityNeeded: item.quantityNeeded,
      };

      await dispatch(createProductMaterial(data))
        .unwrap()
        .then((result) => {
          Swal.fire({
            title: "Success!",
            text: `Item to "${result.productName}" recipe has been create successfully!`,
            icon: "success",
            confirmButtonColor: "#22c55e",
          });
        });
      setRecipeEditFormOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong while create the item. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const updateRecipeHandler = async (data: IProductMaterialResponse) => {
    try {
      const newData = {
        productId: data.productId,
        rawMaterialId: data.rawMaterialId,
        quantityNeeded: data.quantityNeeded,
      };
      await dispatch(updateProductMaterial({ id: data.id, data: newData }));
      Swal.fire({
        title: "Success!",
        text: `Item "${data.rawMaterialName}" has been updated successfully!`,
        icon: "success",
        confirmButtonColor: "#22c55e",
      });
      setRecipeEditFormOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong while updating the item. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleEditRecipeClick = (item: IProductMaterialResponse) => {
    setActualRecipeItem(item);
    setRecipeEditFormOpen(true);
  };

  const deleteRecipeHandler = (item: IProductMaterialResponse) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Do you really want to delete the item <strong>"${item.rawMaterialName}"</strong>? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductMaterial(item.id));
        Swal.fire({
          title: "Deleted!",
          text: `Item "${item.rawMaterialName}" has been deleted.`,
          icon: "success",
          confirmButtonColor: "#22c55e",
        });
      }
    });
  };

  const recipeClickHandler = (product: IProductResponse) => {
    dispatch(fetchByProductId(product.id));
    setActualRecipe(productMaterial);
    setActualProduct(product);
    setRecipeOpen(true);
  };

  const handleOpenCreateRecipeClick = () => {
    setActualRecipeItem({
      id: 0,
      productId: actualProduct.id,
      rawMaterialId: 0,
      quantityNeeded: 0,
      rawMaterialName: "",
      productName: "",
    });
    setRecipeEditFormOpen(true);
  };

  const newProductForm = () => {
    setActualProduct({
      id: 0,
      name: "",
      value: 0,
    });
    setOpenForm(true);
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
            onClick={newProductForm}
            className="bg-brand-darkBlue text-text-inverted px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Product
          </button>
        </header>
        <ProductTable
          products={product}
          onEdit={editProductHandler}
          onDelete={deleteProductHandler}
          onRecipeClick={recipeClickHandler}
        />
        {openForm && (
          <BaseModal title="Add New Product" onClose={() => setOpenForm(false)}>
            <FormProduct onSubmit={saveProductHandler} onClose={setOpenForm} />
          </BaseModal>
        )}
        {openForm && actualProduct.id !== 0 && (
          <BaseModal title="Edit Product" onClose={() => setOpenForm(false)}>
            <FormProduct
              onSubmit={updateProductHandler}
              initialData={actualProduct}
              onClose={setOpenForm}
            />
          </BaseModal>
        )}
        {recipeOpen && (
          <BaseModal
            title={`Recipe for ${actualProduct.name}`}
            onClose={() => setRecipeOpen(false)}
          >
            <ProductRecipeModal
              initialData={actualProduct}
              recipe={productMaterial}
              onEdit={handleEditRecipeClick}
              onDelete={deleteRecipeHandler}
              onClose={() => setRecipeOpen(false)}
              addRecipe={handleOpenCreateRecipeClick}
            />
          </BaseModal>
        )}

        {recipeEditFormOpen && actualRecipeItem.id !== 0 && (
          <BaseModal
            title="Edit Recipe Item"
            onClose={() => setRecipeEditFormOpen(false)}
          >
            <FormMaterialRecipe
              onSubmit={updateRecipeHandler}
              initialData={actualRecipeItem}
              onClose={() => setRecipeEditFormOpen(false)}
            />
          </BaseModal>
        )}

        {recipeEditFormOpen && actualRecipeItem.id === 0 && (
          <BaseModal
            title="Create new Recipe Item"
            onClose={() => setRecipeEditFormOpen(false)}
          >
            <FormCreateMaterialRecipe
              rawMaterialsList={productMaterialList}
              onSubmit={saveRecipeHandler}
              initialData={actualRecipeItem}
              onClose={() => setRecipeEditFormOpen(false)}
            />
          </BaseModal>
        )}
      </section>
    </div>
  );
};
