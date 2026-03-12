import { Edit, Trash2, X } from "lucide-react";
import type { IProductResponse } from "../../types/IProduct";
import type { IProductMaterialResponse } from "../../types/IProductMaterial";
import noImage from "../../assets/noProductImage.webp";
import { TableProductCard } from "../mobileCards/ProductRecipeCard";

interface ProductRecipeModalProps {
  initialData: IProductResponse;
  recipe: IProductMaterialResponse[];
  onEdit: (item: IProductMaterialResponse) => void;
  onDelete: (item: IProductMaterialResponse) => void;
  addRecipe: () => void;
  onClose: () => void;
}

export const ProductRecipeModal = ({
  initialData,
  recipe,
  onClose,
  onEdit,
  addRecipe,
  onDelete,
}: ProductRecipeModalProps) => {
  return (
    <section className="relative flex flex-col md:flex-row gap-6 w-full max-w-4xl max-h-[90vh] bg-surface-card border border-border-light rounded-lg shadow-sm p-6 overflow-y-auto md:overflow-hidden">
      <button
        onClick={onClose}
        className="absolute cursor-pointer right-0 top-0 md:top-0 p-2 text-text-muted hover:text-white transition-colors"
      >
        <X />
      </button>

      <div className="flex md:flex-col gap-4 w-full md:w-1/3 shrink-0">
        <div className="flex flex-col h-48 w-1/2 md:w-full items-center justify-center bg-surface-bg border border-border-light rounded-lg p-2">
          <img
            src={noImage}
            alt={initialData.name}
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        </div>
        <div className="flex flex-col w-1/2 md:w-full gap-2">
          <p>
            <strong>ID:</strong> {initialData.id}
          </p>
          <p>
            <strong>Name:</strong> {initialData.name}
          </p>
          <p>
            <strong>Price:</strong> R$ {initialData.value.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col flex-1 w-full max-h-60 md:max-h-96 pt-4 overflow-hidden">
        <div className="flex justify-between items-center mb-3 shrink-0">
          <h4 className="font-semibold text-lg text-text-main">Recipe</h4>
          <button
            onClick={addRecipe}
            className="bg-brand-darkBlue text-white px-3 py-1.5 rounded text-sm hover:bg-blue-800 transition-colors cursor-pointer"
          >
            Add Recipe Item
          </button>
        </div>

        <div
          className="bg-surface-card border border-border-light rounded-sm shadow-sm overflow-auto max-h-full
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-400
            [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <table className="w-full hidden md:table text-left border-collapse whitespace-nowrap">
            <thead className="bg-surface-bg border-b border-border-light text-text-main text-sm uppercase sticky top-0 z-10">
              <tr>
                <th className="py-2 px-3 font-semibold">Material</th>
                <th className="py-2 px-3 font-semibold text-center">
                  Quantity
                </th>
                <th className="py-2 px-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-light text-text-main">
              {recipe.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-surface-bg/50 transition-colors"
                >
                  <td className="md:py-3 md:px-4 p-2 font-medium">
                    {item.rawMaterialName}
                  </td>
                  <td className="md:py-3 md:px-4 p-2 text-center">
                    {item.quantityNeeded}
                  </td>
                  <td className="md:py-3 md:px-4 p-2">
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-brand-darkBlue hover:text-blue-800 transition-colors cursor-pointer"
                        title="Edit"
                        onClick={() => onEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-status-danger hover:text-red-800 transition-colors cursor-pointer"
                        title="Delete"
                        onClick={() => onDelete(item)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {recipe.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-text-muted">
                    No materials in this recipe.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <section className="p-4 md:hidden">
            {recipe.map((item) => (
              <div key={item.id} className="mb-4">
                <TableProductCard
                  product={item}
                  onEdit={() => onEdit(item)}
                  onDelete={() => onDelete(item)}
                />
              </div>
            ))}
            {recipe.length === 0 && (
              <p className="py-6 text-center text-text-muted">
                No materials in this recipe.
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};
