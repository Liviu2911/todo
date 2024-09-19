import * as React from "react";

interface Props {
  children: React.ReactNode;
  type?: "submit";
  classname?: string;
  onClick?: () => void;
}

function Button({ children, type, classname, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      className={`text-lg px-5 py-1 rounded hover:opacity-85 t3 ${classname}`}
    >
      {children}
    </button>
  );
}

export default Button;
