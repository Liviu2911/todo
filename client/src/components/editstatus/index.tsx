import { FormEvent, useContext } from "react";
import { Data, SearchParamsContext } from "@/routes/__root";
import { Button } from "../ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../modal";
import Input from "../input";
import Select from "../select";

function EditStatus() {
  const navigate = useNavigate();
  const data = useContext(Data);
  const { editstatus, id } = useContext(SearchParamsContext);
  const { projects, userId: userid } = useContext(Data);
  const currentStatus = data.projects
    .filter((project) => project.id === id)[0]
    .statuses.filter((status) => status.id === editstatus)[0];

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString() || "";
    const projectid = form.get("project")?.toString() || "";
    const res = await fetch("http://localhost:3000/api/v1/todo/statuses", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        projectid,
        userid: data.userId,
        id: editstatus,
      }),
    });

    const json = await res.json();
    if (!json.success) {
      navigate({
        to: "/project",
        search: (prev) => ({ ...prev, error: json.error }),
      });
      return;
    }
    navigate({
      to: "/project",
      search: (prev) => ({ ...prev, editstatus: undefined, error: undefined }),
    });
  };

  const deleteStatus = async () => {
    const res = await fetch("http://localhost:3000/api/v1/todo/statuses", {
      method: "DELETE",
      body: JSON.stringify({ userid, id: editstatus }),
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
      search: (prev) => ({ ...prev, editstatus: undefined }),
    });
  };

  return (
    <Modal>
      <form
        onSubmit={submit}
        className="p-8 bg-white rounded-lg flex flex-col items-center gap-8"
      >
        <h1 className="flex items-center gap-2">
          Edit status:{" "}
          <span className="text-rose-500 font-semibold">
            {currentStatus.name}
          </span>
          <button
            onClick={deleteStatus}
            type="button"
            className="hover:text-rose-500 transition-all"
          >
            <FaRegTrashAlt />
          </button>
        </h1>
        <Input
          name="name"
          defaulValue={
            projects
              .find((item) => item.id === id)
              ?.statuses.find((item) => item.id === editstatus)?.name
          }
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="project">Project</label>
          <Select name="project" data={projects} />
        </div>
        <div className="flex flex-col items-center">
          <Button type="submit" className="px-8">
            Save
          </Button>
          <Link
            to="/project"
            search={(prev) => ({ ...prev, editstatus: undefined })}
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

export default EditStatus;
