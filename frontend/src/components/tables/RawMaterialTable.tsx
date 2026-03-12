import type { IRawMaterialResponse } from "../../types/IRawMaterial";
import { Edit, Table, Trash2 } from "lucide-react";
import { TableRawMaterialCard } from "../mobileCards/TableRawMaterialCard";

interface RawMaterialTableProps {
  rawMaterials: IRawMaterialResponse[];
  onEdit: (material: IRawMaterialResponse) => void;
  onDelete: (material: IRawMaterialResponse) => void;
}

export const RawMaterialTable = ({
  rawMaterials,
  onEdit,
  onDelete,
}: RawMaterialTableProps) => {
  return (
    <div className="bg-surface-card border border-border-light rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full hidden md:table text-left border-collapse whitespace-nowrap">
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
              <td className="py-3 px-6">{material.amount} unit(s)</td>
              <td className="py-3 px-6 flex justify-center gap-3">
                <button
                  className="text-brand-darkBlue hover:text-blue-800 transition-colors"
                  title="Edit"
                  onClick={() => onEdit(material)}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="text-status-danger hover:text-red-800 transition-colors"
                  title="Delete"
                  onClick={() => onDelete(material)}
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
      <section className="p-4 md:hidden">
        <h2 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
          <Table className="w-5 h-5" />
          Raw Materials
        </h2>
        {rawMaterials.map((material) => (
          <div key={material.id} className="mb-4">
            <TableRawMaterialCard
              rawMaterials={material}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
        {rawMaterials.length === 0 && (
          <div className="py-8 text-center text-text-muted">
            No raw materials found.
          </div>
        )}
      </section>
    </div>
  );
};
