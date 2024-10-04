interface Props {
  children: React.ReactNode;
}

function Modal({ children }: Props) {
  return (
    <div className="absolute left-0 top-0 w-full h-[100vh] z-20 bg-black bg-opacity-30 flex items-center justify-center">
      {children}
    </div>
  );
}

export default Modal;
