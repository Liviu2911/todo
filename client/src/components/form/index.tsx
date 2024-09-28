interface Props {
  children: React.ReactNode;
}

function Form({ children }: Props) {
  return (
    <div className="flex justify-center w-full">
      <form className="flex flex-col gap-4 items-center max-w-max mt-10">
        {children}
      </form>
    </div>
  );
}

export default Form;
