import { useContext, useState } from "react";
import CreateInput from "../input";
import { Data, Path } from "@/routes/__root";
import { Button } from "../ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import Select from "../select";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(15, { message: "Name can't be longer than 15 characters" }),
  project: z
    .string()
    .refine((pr) => pr !== "Project", { message: "Invalid project" }),
});

function Status() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { userId, projects } = useContext(Data);
  const path = useContext(Path);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString();
    const project = data.get("project")?.toString();

    const { error: schemaError } = schema.safeParse({ name, project });
    setError(schemaError?.errors[0].message || "");

    const res = await fetch("http://localhost:3000/api/v1/todo/statuses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, projectid: project, userid: userId }),
    });
    const json = await res.json();

    if (!json.success) {
      console.log(json.error);
      return;
    }

    navigate({
      to: "/project",
      search: (prev) => ({ ...prev, create: undefined }),
    });
  };
  return (
    <form
      onSubmit={submit}
      className="flex flex-col items-center gap-2 relative"
    >
      <CreateInput name="name" />

      <div className="flex flex-col gap-2">
        <label htmlFor="project">Project</label>
        <Select name="project" data={projects} />
      </div>

      {error && (
        <h1 className="text-rose-500 max-w-64 text-sm absolute bottom-[90px]">
          {error}
        </h1>
      )}

      <Button type="submit" className="mt-4">
        Create
      </Button>
      <Link to={path} search={(prev) => ({ ...prev, create: undefined })}>
        <Button type="button" variant="link" className="hover:text-rose-500">
          Close
        </Button>
      </Link>
    </form>
  );
}

export default Status;
