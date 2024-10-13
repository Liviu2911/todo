import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { Data, Path, SearchParamsContext } from "@/routes/__root";
import { Project, Todo } from "@/types";
import { Input as DateInput } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Modal from "../modal";
import Select from "../select";
import Input from "../input";

const findTodo = (projects: Project[], id: string) => {
  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].statuses.length; j++) {
      const todos = projects[i].statuses[j].todos;
      for (let k = 0; k < todos.length; k++) {
        if (todos[k].id === id) return todos[k];
      }
    }
  }

  return null;
};

function EditTodo() {
  const navigate = useNavigate();
  const [projectid, setProjectid] = useState("");
  const path = useContext(Path);
  const { edittodo } = useContext(SearchParamsContext);
  const { projects, userId: userid } = useContext(Data);
  const todo: Todo | null = findTodo(projects, edittodo || "");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString() || "";
    const body = form.get("body")?.toString() || "";
    const expires = form.get("expires")?.toString() || "";
    const statusid = form.get("status")?.toString() || "";

    const res = await fetch("http://localhost:3000/api/v1/todo/todos", {
      method: "PUT",
      body: JSON.stringify({
        name,
        body,
        expires,
        statusid,
        userid,
        id: edittodo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (!json.success) {
      console.log(json.error);
      return;
    }

    navigate({
      to: path,
      search: (prev) => ({ ...prev, edittodo: undefined }),
    });
  };

  return (
    <Modal
      show={edittodo ? true : false}
      close={() =>
        navigate({
          to: path,
          search: (prev) => ({ ...prev, edittodo: undefined }),
        })
      }
    >
      <form
        onSubmit={submit}
        className="rounded-lg bg-white p-8 flex flex-col gap-8 items-center"
      >
        <h1>
          Edit todo:{" "}
          <span className="text-rose-500 font-semibold">{todo?.name}</span>
        </h1>
        <Input name="name" defaulValue={todo?.name} />

        <div className="flex flex-col gap-2">
          <label htmlFor="body">Body</label>
          <Textarea name="body" className="w-64" defaultValue={todo?.body} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="expires">Expires</label>
          <DateInput
            type="datetime-local"
            name="expires"
            className="w-64"
            noring="true"
          />
        </div>

        <Select name="project" data={projects} setProjectid={setProjectid} />
        <Select
          name="status"
          data={projects.find((item) => item.id === projectid)?.statuses || []}
        />

        <div className="flex flex-col gap-2 items-center">
          <Button type="submit">Save</Button>
          <Link to={path} search={(prev) => ({ ...prev, edittodo: undefined })}>
            <Button
              type={"button"}
              variant={"link"}
              className="hover:text-rose-500"
            >
              Close
            </Button>
          </Link>
        </div>
      </form>
    </Modal>
  );
}

export default EditTodo;
