import { useState } from "react";
import Modal from "../modal";
import SelectTodoStatus from "./todostatus";
import { createContext } from "react";
import Todo from "./todo";
import Status from "./status";

export const CreateFunctions = createContext<{
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  divClass: string;
}>({
  active: "",
  setActive: () => {},
  select: "",
  setSelect: () => {},
  divClass: "",
});

function Create() {
  const [active, setActive] = useState("todo");
  const [select, setSelect] = useState("");
  const divClass = "flex flex-col gap-2";

  return (
    <CreateFunctions.Provider
      value={{ active, setActive, select, setSelect, divClass }}
    >
      <Modal>
        <div className="p-8 bg-white rounded-lg flex flex-col gap-8 items-center">
          <SelectTodoStatus />
          {active === "todo" && <Todo />}
          {active === "status" && <Status />}
        </div>
      </Modal>
    </CreateFunctions.Provider>
  );
}

export default Create;
