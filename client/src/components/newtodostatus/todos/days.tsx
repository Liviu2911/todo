function Days() {
  const arr = [];
  for (let i = 1; i <= 31; i++) {
    arr.push(i);
  }
  return (
    <div className="flex flex-col absolute top-10 rounded max-h-48 overflow-y-scroll bg-stone-800 w-10 z-20">
      {arr.map((day) => (
        <button type="button" className="hover:bg-sky-500 t3 text-white">
          {day}
        </button>
      ))}
    </div>
  );
}

export default Days;
