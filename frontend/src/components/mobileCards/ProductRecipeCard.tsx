import { Edit, Trash2 } from "lucide-react";
import type { IProductMaterialResponse } from "../../types/IProductMaterial";

interface TableCardProps {
  product: IProductMaterialResponse;
  onEdit: (product: IProductMaterialResponse) => void;
  onDelete: (product: IProductMaterialResponse) => void;
}

export const TableProductCard = ({
  product,
  onEdit,
  onDelete,
}: TableCardProps) => {
  return (
    <article
      className={`${product.id % 2 === 0 ? "bg-surface-card" : "bg-surface-bg"} border border-border-light rounded-lg shadow-sm p-2`}
    >
      <div className="relative p-2">
        <h3 className="text-lg font-bold text-text-main">
          {product.rawMaterialName}
        </h3>
        <p className="text-text-main">Quantity: {product.quantityNeeded}</p>
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
