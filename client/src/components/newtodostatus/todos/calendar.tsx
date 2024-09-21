import { IoMdArrowDropdown } from "react-icons/io";
import Days from "./days";
import Months from "./months";
import Years from "./years";

interface Props {
  text: "day" | "month" | "year";
  onCLick: () => void;
  active: boolean;
  changeActive: (value: "day" | "month" | "year" | "none") => void;
}

function Calendar({ text, active, changeActive }: Props) {
  return (
    <div className="relative flex justify-center">
      <button
        type="button"
        onClick={() => changeActive(!active ? text : "none")}
        className="px-4 py-1 bg-stone-800 rounded text-white flex flex-row items-center hover:bg-sky-500 t3 capitalize max-h-10 "
      >
        {text}
        <IoMdArrowDropdown />
      </button>
      {active && text === "day" ? <Days /> : <></>}
      {active && text === "month" ? <Months /> : <></>}
      {active && text === "year" ? <Years /> : <></>}
    </div>
  );
}

export default Calendar;
