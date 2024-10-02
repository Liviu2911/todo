import { Input } from "../ui/input";

interface Props {
  name: "email" | "password" | "username" | "repassword";
}

function FormInput({ name }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="capitalize text-white">
        {name}
      </label>
      <Input
        type={name.includes("password") ? "password" : "text"}
        name={name}
        className="w-72"
      />
    </div>
  );
}

export default FormInput;
