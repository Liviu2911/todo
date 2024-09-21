import Button from "@/components/button";
import { Input } from "@/components/ui/input";

function NewStatues() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <Input
          name="name"
          className="bg-stone-800 text-white border-none w-72"
        />
      </div>
      <Button type="submit" classname="hover:text-sky-500 t3">
        Create
      </Button>
    </form>
  );
}

export default NewStatues;
