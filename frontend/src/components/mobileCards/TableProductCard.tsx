import { Edit, Trash2 } from "lucide-react";
import type { IProductResponse } from "../../types/IProduct";

interface TableCardProps {
  product: IProductResponse;
  onEdit: (product: IProductResponse) => void;
  onDelete: (product: IProductResponse) => void;
  onRecipeClick: (product: IProductResponse) => void;
}

export const TableProductCard = ({
  product,
  onEdit,
  onDelete,
  onRecipeClick,
}: TableCardProps) => {
  return (
    <article
      className={`${product.id % 2 === 0 ? "bg-surface-card" : "bg-surface-bg"} border border-border-light rounded-lg shadow-sm p-4`}
    >
      <div className="font-semibold">#{product.id}</div>
      <div className="relative p-4" onClick={() => onRecipeClick(product)}>
        <h3 className="text-lg font-bold text-text-main">{product.name}</h3>
        <p className="text-text-main">$ {product.value.toFixed(2)}</p>
      </div>
      <div className="mt-2 flex justify-end gap-3 space-x-4 w-full">
        <button
          className="text-brand-darkBlue hover:text-black transition-colors cursor-pointer"
          title="Edit"
          onClick={() => onEdit(product)}
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          className="text-status-danger hover:text-red-800 transition-colors cursor-pointer"
          title="Delete"
          onClick={() => onDelete(product)}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
