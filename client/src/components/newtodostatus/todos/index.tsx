import Button from "@/components/button";
import Calendar from "./calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function NewTodos() {
  const [show, setShow] = useState({
    day: false,
    month: false,
    year: false,
  });
  const changeShow = (value: "day" | "month" | "year" | "none") => {
    const newShow = { day: false, month: false, year: false };
    if (value === "none") {
      setShow(newShow);
      return;
    }
    newShow[value] = true;
    setShow(newShow);
  };
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <Input
          name="name"
          className="bg-stone-800 border-none text-white w-72"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="body">Details</label>
        <Textarea className="bg-stone-800 text-white" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="expires">Expires</label>
        <div className="flex flex-row gap-2 justify-center relative">
          <Calendar
            active={show.day}
            changeActive={changeShow}
            text="day"
            onCLick={() => {}}
          />
          <Calendar
            active={show.month}
            changeActive={changeShow}
            text="month"
            onCLick={() => {}}
          />
          <Calendar
            active={show.year}
            changeActive={changeShow}
            text="year"
            onCLick={() => {}}
          />
        </div>
      </div>

      <Button type="submit" classname="hover:text-sky-500 t3">
        Create
      </Button>
    </form>
  );
}

export default NewTodos;
