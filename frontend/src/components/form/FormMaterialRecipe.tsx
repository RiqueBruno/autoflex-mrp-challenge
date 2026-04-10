import { useState } from "react";
import type { IProductMaterialResponse } from "../../types/IProductMaterial";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

interface FormProps {
  onSubmit: (data: IProductMaterialResponse) => void;
  initialData?: IProductMaterialResponse;
  onClose: (open: boolean) => void;
}

export const FormMaterialRecipe = (props: FormProps) => {
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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Name"
          value={formData.rawMaterialName}
          onChange={(e) =>
            setFormData({ ...formData, rawMaterialName: e.target.value })
          }
          disabled={true}
        />
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
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="primary" type="submit">
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
