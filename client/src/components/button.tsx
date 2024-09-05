import * as React from "react";

interface Props {
  children: React.ReactNode;
  type?: "submit";
  classname?: string;
}

function Button({ children, type, classname }: Props) {
  return (
    <button
      type={type ? type : "button"}
      className={`text-lg px-5 py-1 rounded hover:opacity-85 t3 ${classname}`}
    >
      {children}
    </button>
  );
}

export default Button;
