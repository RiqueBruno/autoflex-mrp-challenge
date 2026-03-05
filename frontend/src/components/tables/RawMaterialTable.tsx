import type { IRawMaterialResponse } from "../../types/IRawMaterial";
import { Edit, Trash2 } from "lucide-react";

export const RawMaterialTable = ({
  rawMaterials,
}: {
  rawMaterials: IRawMaterialResponse[];
}) => {
  return (
    <div className="bg-surface-card border border-border-light rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead className="bg-surface-bg border-b border-border-light text-text-main text-sm uppercase">
          <tr>
            <th className="py-3 px-6 font-semibold">ID</th>
            <th className="py-3 px-6 font-semibold">Name</th>
            <th className="py-3 px-6 font-semibold">Quantity</th>
            <th className="py-3 px-6 font-semibold text-center">Options</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border-light text-text-main">
          {rawMaterials.map((material) => (
            <tr
              key={material.id}
              className="hover:bg-surface-bg/50 transition-colors"
            >
              <td className="py-3 px-6 text-text-muted">#{material.id}</td>
              <td className="py-3 px-6 font-medium">{material.name}</td>
              <td className="py-3 px-6">{material.amount} un.</td>
              <td className="py-3 px-6 flex justify-center gap-3">
                <button
                  className="text-brand-darkBlue hover:text-blue-800 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="text-status-danger hover:text-red-800 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {rawMaterials.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-text-muted">
                No raw materials found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
