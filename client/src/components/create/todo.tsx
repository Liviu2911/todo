import { FormEvent, useContext, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CreateInput from "../input";
import { CreateFunctions } from ".";
import { Data, Path } from "@/routes/__root";
import { z } from "zod";
import { Button } from "../ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import Select from "../select";

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(15, { message: "Name can't be longer than 15 characters" }),
    expires: z
      .string()
      .refine((exp) => exp.length > 0, { message: "Invalid date" }),
    project: z.string(),
    status: z.string(),
    body: z.string(),
  })
  .refine(
    ({ project, status }) => project !== "Project" && status !== "Status",
    { message: "Invalid project or status" }
  );

function Todo() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [projectid, setProjectid] = useState("");
  const { userId: userid, projects } = useContext(Data);
  const path = useContext(Path);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString();
    const body = data.get("body")?.toString();
    const expires = data.get("expires")?.toString();
    const project = data.get("project")?.toString();
    const status = data.get("status")?.toString();

    const { error: schemaError } = schema.safeParse({
      name,
      body,
      expires,
      project,
      status,
    });

    setError(schemaError?.errors[0].message || "");

    const res = await fetch("http://localhost:3000/api/v1/todo/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        body,
        expires: expires?.split("T").join(" "),
        projectid: project,
        statusid: status,
        userid,
      }),
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

  const { divClass } = useContext(CreateFunctions);
  return (
    <form
      className="flex flex-col items-center gap-2 relative"
      onSubmit={submit}
    >
      <CreateInput name="name" />
      <div className={divClass}>
        <label htmlFor="body">Body</label>
        <Textarea name="body" className="w-64" />
      </div>

      <div className={divClass}>
        <label htmlFor="expires">Expires</label>
        <Input
          type="datetime-local"
          noring="true"
          name="expires"
          className="w-64"
        />
      </div>
      <div className={divClass}>
        <label htmlFor="project">Project</label>
        <Select name="project" data={projects} setProjectid={setProjectid} />
      </div>
      <div className={divClass}>
        <label htmlFor="status">Status</label>
        <Select
          name="status"
          data={
            projectid !== ""
              ? projects.filter((item) => item.id === projectid)[0].statuses
              : []
          }
        />
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

export default Todo;
