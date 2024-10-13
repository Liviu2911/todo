import Dashboard from "../dashboard";
import NewProject from "./newproject";
import Projects from "./projects";

function Sidebar() {
  return (
    <div className="p-8 h-[90vh] w-48 bg-stone-800 rounded-lg border-[0.5px] border-stone-300 max-w-48 flex flex-col relative">
      <Dashboard />
      <Projects />
      <NewProject />
    </div>
  );
}

export default Sidebar;
