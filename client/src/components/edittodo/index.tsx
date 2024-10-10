import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { Data, SearchParamsContext } from "@/routes/__root";
import { Status, Todo } from "@/types";
import { Input as DateInput } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Modal from "../modal";
import Select from "../select";
import Input from "../input";

const findTodo = (statuses: Status[], id: string) => {
  for (let i = 0; i < statuses.length; i++) {
    for (let j = 0; j < statuses[i].todos.length; j++) {
      if (statuses[i].todos[j].id === id) return statuses[i].todos[j];
    }
  }

  return null;
};

function EditTodo() {
  const navigate = useNavigate();
  const [projectid, setProjectid] = useState("");
  const { edittodo, id } = useContext(SearchParamsContext);
  const { projects, userId: userid } = useContext(Data);
  const todo: Todo | null = findTodo(
    projects.find((item) => item.id === id)?.statuses || [],
    edittodo || ""
  );

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
      to: "/project",
      search: (prev) => ({ ...prev, edittodo: undefined }),
    });
  };

  return (
    <Modal>
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
          <Link
            to="/project"
            search={(prev) => ({ ...prev, edittodo: undefined })}
          >
            <Button variant={"link"} className="hover:text-rose-500">
              Close
            </Button>
          </Link>
        </div>
      </form>
    </Modal>
  );
}

export default EditTodo;
