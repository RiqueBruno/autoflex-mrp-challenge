import { Edit, Trash2 } from "lucide-react";
import type { IRawMaterialResponse } from "../../types/IRawMaterial";

interface RawMaterialTableProps {
  rawMaterials: IRawMaterialResponse;
  onEdit: (material: IRawMaterialResponse) => void;
  onDelete: (material: IRawMaterialResponse) => void;
}

export const TableRawMaterialCard = ({
  rawMaterials,
  onEdit,
  onDelete,
}: RawMaterialTableProps) => {
  return (
    <article
      className={`${rawMaterials.id % 2 === 0 ? "bg-surface-card" : "bg-surface-bg"} border border-border-light rounded-lg shadow-sm p-4`}
    >
      <div className="font-semibold">#{rawMaterials.id}</div>
      <div className="relative p-4">
        <h3 className="text-lg font-bold text-text-main">
          {rawMaterials.name}
        </h3>
        <p className="text-text-main">{rawMaterials.amount} unit(s)</p>
      </div>
      <div className="mt-2 flex justify-end gap-3 space-x-4 w-full">
        <button
          className="text-brand-darkBlue hover:text-black transition-colors cursor-pointer"
          title="Edit"
          onClick={() => onEdit(rawMaterials)}
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          className="text-status-danger hover:text-red-800 transition-colors cursor-pointer"
          title="Delete"
          onClick={() => onDelete(rawMaterials)}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
