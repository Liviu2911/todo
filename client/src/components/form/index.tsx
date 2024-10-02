interface Props {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Form({ children, onSubmit }: Props) {
  return (
    <div className="flex justify-center w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 items-center max-w-max mt-10"
      >
        {children}
      </form>
    </div>
  );
}

export default Form;
