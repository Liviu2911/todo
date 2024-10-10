import { FormEvent, useContext } from "react";
import Modal from "../modal";
import { Data, SearchParamsContext } from "@/routes/__root";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const schema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters long" })
  .max(15, { message: "Name can't be longer than 15 characters" });

function EditProject() {
  const navigate = useNavigate();
  const { id, error } = useContext(SearchParamsContext);
  const { projects, userId } = useContext(Data);
  const project = projects.filter((item) => item.id === id)[0];

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name: string = formData.get("name")?.toString() || "";
    const { error } = schema.safeParse(name);
    if (error) {
      navigate({
        to: "/project",
        search: (prev) => ({
          ...prev,
          error: error.errors[0].message,
        }),
      });
      return;
    }

    const res = await fetch("http://localhost:3000/api/v1/todo/projects", {
      method: "PUT",
      body: JSON.stringify({ name, userid: userId, id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json.success) {
      navigate({
        to: "/project",
        search: (prev) => ({ id: prev.id }),
      });
      return;
    }

    navigate({
      to: "/project",
      search: (prev) => ({
        id: prev.id,
        edit: prev.edit,
        error: json.error,
      }),
    });
  };

  return (
    <Modal>
      <form
        onSubmit={submit}
        className="p-8 flex flex-col gap-4 items-center rounded-lg bg-white"
      >
        <h1 className="text-lg">
          Edit project: <span className="text-rose-500">{project.name}</span>
        </h1>
        <Input noring="true" name="name" defaultValue={project.name} />
        {error && (
          <h1 className="text-rose-500 text-sm max-w-40 text-center">
            {error}
          </h1>
        )}
        <div className="flex flex-col items-center">
          <Button type="submit" className="px-8">
            Save
          </Button>
          <Link to="/project" search={(prev) => ({ ...prev, edit: undefined })}>
            <Button variant={"link"} className="hover:text-rose-500">
              Close
            </Button>
          </Link>
        </div>
      </form>
    </Modal>
  );
}

export default EditProject;
