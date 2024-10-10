import { useContext } from "react";
import { SelectData } from "./index";

interface Props {
  id: string;
  name: string;
}

function Option({ id, name }: Props) {
  const { setValue, setShow, setProjectid } = useContext(SelectData);
  return (
    <button
      type="button"
      onClick={() => {
        setValue({ name, id });
        setShow(false);
        if (setProjectid) {
          setProjectid(id);
        }
      }}
      className="pl-8 py-1 w-full text-left hover:bg-stone-200 rounded text-black"
    >
      {name}
    </button>
  );
}

export default Option;
