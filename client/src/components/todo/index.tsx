import { Path, SearchParamsContext } from "@/routes/__root";
import { Todo as Type } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import Modal from "../modal";
import { Button } from "../ui/button";

interface Props {
  todo: Type;
  ref: React.MutableRefObject<null>;
}

function Todo({ todo, ref }: Props) {
  const navigate = useNavigate();
  const { todo: id } = useContext(SearchParamsContext);
  const path = useContext(Path);
  return (
    <Modal
      show={id ? true : false}
      close={() =>
        navigate({ to: path, search: (prev) => ({ ...prev, todo: undefined }) })
      }
    >
      <div className="flex flex-col gap-4 p-2" ref={ref}>
        <div className="flex flex-row gap-10 items-center justify-between">
          <h1 className="opacity-80 text-lg">{todo.name}</h1>
          <h1 className="text-rose-500 text-sm">
            {todo.expires
              .split("T")
              .join(" ")
              .split("-")
              .join("/")
              .slice(0, todo.expires.length - 8)}
          </h1>
        </div>
        <p>{todo.body}</p>
        <Button
          onClick={() =>
            navigate({
              to: path,
              search: (prev) => ({ ...prev, todo: undefined }),
            })
          }
          className="hover:text-rose-500 text-center"
          variant={"link"}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default Todo;
