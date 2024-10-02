import { FormEvent, useContext } from "react";
import Modal from "../modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Data } from "@/routes/__root";
import { useNavigate } from "@tanstack/react-router";

function Newproject() {
  const { userId } = useContext(Data);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("title");

    const res = await fetch("http://localhost:3000/api/v1/todo/projects", {
      method: "POST",
      body: JSON.stringify({ userid: userId, name }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (json.success) {
      navigate({
        to: path,
        search: (prev) => ({
          id: prev.id,
        }),
      });
      return;
    }
  };
  return (
    <Modal>
      <form
        onSubmit={submit}
        className="p-8 rounded-lg bg-white flex flex-col items-center gap-4"
      >
        <Input name="title" placeholder="project name..." noring="true" />
        <Button type="submit" className="px-8">
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default Newproject;
