function Years() {
  const arr = [];
  for (let i = 2024; i <= 2030; i++) {
    arr.push(i);
  }
  return (
    <div className="flex flex-col absolute top-10 rounded max-h-48 overflow-y-scroll bg-stone-800 w-20 z-20 gap-2">
      {arr.map((year) => (
        <button type="button" className="hover:bg-sky-500 t3 text-white">
          {year}
        </button>
      ))}
    </div>
  );
}

export default Years;
