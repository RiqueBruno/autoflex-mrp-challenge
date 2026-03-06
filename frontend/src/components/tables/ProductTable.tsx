import type { IProductResponse } from "../../types/IProduct";
import { Edit, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: IProductResponse[];
  onEdit: (product: IProductResponse) => void;
  onDelete: (product: IProductResponse) => void;
}

export const ProductTable = ({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  return (
    <div className="bg-surface-card border border-border-light rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead className="bg-surface-bg border-b border-border-light text-text-main text-sm uppercase">
          <tr>
            <th className="py-3 px-6 font-semibold">ID</th>
            <th className="py-3 px-6 font-semibold">Name</th>
            <th className="py-3 px-6 font-semibold">Value</th>
            <th className="py-3 px-6 font-semibold text-center">Options</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border-light text-text-main">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-surface-bg/50 transition-colors"
            >
              <td className="py-3 px-6 text-text-muted">#{product.id}</td>
              <td className="py-3 px-6 font-medium">{product.name}</td>
              <td className="py-3 px-6">$ {product.value.toFixed(2)}</td>
              <td className="py-3 px-6 flex justify-center gap-3">
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
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-text-muted">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
