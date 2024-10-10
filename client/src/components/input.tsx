import { Input as DefInput } from "./ui/input";

interface Props {
  name: string;
  defaulValue?: string;
}

function Input({ name, defaulValue }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="capitalize">
        name
      </label>
      <DefInput
        defaultValue={defaulValue}
        name={name}
        noring="true"
        className="w-64"
      />
    </div>
  );
}

export default Input;
