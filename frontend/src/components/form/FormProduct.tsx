import { useState } from "react";
import type { IProductRequest } from "../../types/IProduct";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

interface FormProps {
  onSubmit: (data: IProductRequest) => void;
  initialData?: IProductRequest;
  onClose: (open: boolean) => void;
}

export const FormProduct = (props: FormProps) => {
  const [formData, setFormData] = useState<IProductRequest>(
    props.initialData || { name: "", value: 0 },
  );

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(formData);
  };
  const haveName = formData.name.length > 0;
  const haveValue = formData.value > 0;
  const isFormValid = haveName && haveValue;

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
          label="Value"
          value={formData.value ? formData.value.toString() : ""}
          onChange={(e) =>
            setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
          }
        />
        {!haveValue && (
          <p className="text-red-500 text-sm">Value must be greater than 0.</p>
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
