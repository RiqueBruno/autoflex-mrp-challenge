import { useState } from "react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import type { IRawMaterialRequest } from "../../types/IRawMaterial";

interface FormProps {
  onSubmit: (data: IRawMaterialRequest) => void;
  initialData?: IRawMaterialRequest;
  onClose: (open: boolean) => void;
}

export const FormRawMaterial = (props: FormProps) => {
  const [formData, setFormData] = useState<IRawMaterialRequest>(
    props.initialData || { name: "", amount: 0 },
  );

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  const haveName = formData.name.length > 0;
  const haveAmount = formData.amount > 0;
  const isFormValid = haveName && haveAmount;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {!haveName && <p className="text-red-500 text-sm">Name is required.</p>}
      </div>
      <div>
        <Input
          label="Amount"
          value={formData.amount ? formData.amount.toString() : ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: parseFloat(e.target.value) || 0,
            })
          }
        />
        {!haveAmount && (
          <p className="text-red-500 text-sm">Amount must be greater than 0.</p>
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
          className="cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
