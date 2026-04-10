import { useState } from "react";
import type { IProductMaterialResponse } from "../../types/IProductMaterial";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { ChevronDown } from "lucide-react";

interface FormProps {
  onSubmit: (data: IProductMaterialResponse) => void;
  rawMaterialsList: IProductMaterialResponse[];
  initialData?: IProductMaterialResponse;
  onClose: (open: boolean) => void;
}

export const FormCreateMaterialRecipe = (props: FormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<IProductMaterialResponse>(
    props.initialData || {
      id: 0,
      productId: 0,
      rawMaterialId: 0,
      quantityNeeded: 0,
      rawMaterialName: "",
      productName: "",
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  const uniqueMaterials = props.rawMaterialsList.filter(
    (material, index, self) =>
      index ===
      self.findIndex((m) => m.rawMaterialName === material.rawMaterialName),
  );

  const selectedMaterial = uniqueMaterials.find(
    (m) => m.rawMaterialId === formData.rawMaterialId,
  );

  const hasMaterialSelected = formData.rawMaterialId !== 0;
  const isQuantityValid = formData.quantityNeeded > 0;
  const isFormValid = hasMaterialSelected && isQuantityValid;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative flex flex-col gap-1 mb-4">
        <label className="text-sm font-medium text-text-main">Material</label>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 border border-border-light rounded bg-surface-bg text-text-main text-left flex justify-between items-center focus:ring-2 focus:ring-brand-darkBlue outline-none cursor-pointer"
        >
          <span className="truncate">
            {selectedMaterial
              ? selectedMaterial.rawMaterialName
              : "Selecione um material..."}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {!hasMaterialSelected && (
          <p className="text-sm text-red-500 mt-1">Please select a material.</p>
        )}

        {isOpen && (
          <ul
            className="absolute top-[70px] z-50 w-full bg-surface-bg border border-border-light rounded-md shadow-lg max-h-48 overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {uniqueMaterials.map((material, index) => (
              <li
                key={`${material.rawMaterialId}-${index}`}
                className="p-2.5 hover:bg-brand-darkBlue hover:text-white cursor-pointer transition-colors text-sm border-b border-border-light last:border-0"
                onClick={() => {
                  setFormData({
                    ...formData,
                    rawMaterialId: material.rawMaterialId,
                  });
                  setIsOpen(false);
                }}
              >
                {material.rawMaterialName}
              </li>
            ))}

            {uniqueMaterials.length === 0 && (
              <li className="p-3 text-center text-text-muted text-sm">
                Nenhum material disponível
              </li>
            )}
          </ul>
        )}
      </div>
      <div>
        <Input
          label="Quantity"
          value={
            formData.quantityNeeded ? formData.quantityNeeded.toString() : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              quantityNeeded: parseFloat(e.target.value) || 0,
            })
          }
        />
        {!isQuantityValid && (
          <p className="text-sm text-red-500 mt-1">
            Quantity must be greater than zero.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          type="submit"
          disabled={!isFormValid}
          className="cursor-pointer"
        >
          Save
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => props.onClose(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
