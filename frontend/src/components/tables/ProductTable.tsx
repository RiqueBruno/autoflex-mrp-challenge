import type { IProductResponse } from "../../types/IProduct";
import { Edit, Table, Trash2 } from "lucide-react";
import { TableProductCard } from "../mobileCards/TableProductCard";

interface ProductTableProps {
  products: IProductResponse[];
  onEdit: (product: IProductResponse) => void;
  onDelete: (product: IProductResponse) => void;
  onRecipeClick: (product: IProductResponse) => void;
}

export const ProductTable = ({
  products,
  onEdit,
  onDelete,
  onRecipeClick,
}: ProductTableProps) => {
  return (
    <div className="bg-surface-card border border-border-light rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">
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
              <td
                className="relative py-3 px-6 font-medium cursor-pointer
                  text-brand-darkBlue hover:underline"
                onClick={() => onRecipeClick(product)}
              >
                {product.name}
              </td>
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
      <section className="p-4 md:hidden">
        <h2 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
          <Table className="w-5 h-5" />
          Products
        </h2>
        {products.map((product) => (
          <div key={product.id} className="mb-4">
            <TableProductCard
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              onRecipeClick={onRecipeClick}
            />
          </div>
        ))}
        {products.length === 0 && (
          <p className="py-8 text-center text-text-muted">No products found.</p>
        )}
      </section>
    </div>
  );
};
