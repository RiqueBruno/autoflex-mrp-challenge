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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <Input
          label="Value"
          value={formData.value ? formData.value.toString() : ""}
          onChange={(e) =>
            setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="primary" type="submit">
          Salvar
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => props.onClose(false)}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
