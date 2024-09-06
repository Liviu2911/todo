import SidebarUp from "./sidebarup";

interface Props {
  active: string;
}

function Sidebar({ active }: Props) {
  return (
    <>
      <div className="w-48 bg-blue-500 h-[94vh] mt-[3vh] rounded-lg flex flex-col items-center py-4 border border-sky-200 sticky">
        <SidebarUp active={active} />
      </div>
    </>
  );
}

export default Sidebar;
