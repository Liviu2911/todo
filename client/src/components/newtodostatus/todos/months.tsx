function Months() {
  const arr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="flex flex-col absolute top-10 rounded max-h-48 overflow-y-scroll bg-stone-800 w-20 z-20 gap-2">
      {arr.map((month) => (
        <button type="button" className="hover:bg-sky-500 t3 text-white">
          {month}
        </button>
      ))}
    </div>
  );
}

export default Months;
