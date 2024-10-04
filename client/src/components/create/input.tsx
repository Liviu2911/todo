import { Input } from "../ui/input";

interface Props {
  name: string;
}

function CreateInput({ name }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="capitalize">
        name
      </label>
      <Input name={name} noring="true" className="w-64" />
    </div>
  );
}

export default CreateInput;
