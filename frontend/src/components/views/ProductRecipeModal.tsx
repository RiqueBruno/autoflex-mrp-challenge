import { X } from "lucide-react";
import type { IProductResponse } from "../../types/IProduct";
import type { IProductMaterialResponse } from "../../types/IProductMaterial";

interface ProductRecipeModalProps {
  initialData: IProductResponse;
  recipe: IProductMaterialResponse[];
  onClose: () => void;
}

export const ProductRecipeModal = ({
  initialData,
  recipe,
  onClose,
}: ProductRecipeModalProps) => {
  return (
    <section className="relative">
      <button
        onClick={onClose}
        className="absolute cursor-pointer right-0 -top-12 p-2 text-text-muted hover:text-text-main transition-colors"
      >
        <X />
      </button>
      <h3>Product Details</h3>
      <div>
        <div>
          <span>Image</span>
        </div>
        <div>
          <p>
            <strong>Name:</strong> {initialData.name}
          </p>
          <p>
            <strong>Price:</strong> ${initialData.value.toFixed(2)}
          </p>
        </div>
      </div>
      <div>
        <h4>Recipe</h4>
        <div>
          <button>Add Recipe Item</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipe.map((item) => (
                <tr key={item.id}>
                  <td>{item.rawMaterialName}</td>
                  <td>{item.quantityNeeded}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
              {recipe.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-text-muted">
                    No materials in this recipe.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
