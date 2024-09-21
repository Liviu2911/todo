import ModalBackground from "../modal";
import Select from "./select";
import { useState } from "react";
import NewTodos from "./todos";
import NewStatues from "./statuses";

// !IMPORTANT NOTE - DON'T FORGET TO CHANGE SELECT COMPONENT FROM useState to SEARCH PARAMS

function NewTodoStatus() {
  const [active, setActive] = useState(false);

  const changeActive = (value: boolean) => setActive(value);

  return (
    <ModalBackground>
      <div className="bg-white rounded-lg px-10 py-10 flex flex-col items-center gap-4">
        <Select setActive={changeActive} active={active} />
        {!active ? <NewTodos /> : <NewStatues />}
      </div>
    </ModalBackground>
  );
}

export default NewTodoStatus;
