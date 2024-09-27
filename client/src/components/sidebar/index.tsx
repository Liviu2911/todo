import NewProject from "./newproject";
import Projects from "./projects";
import DashboardAndSettings from "./up";

function Sidebar() {
  return (
    <div className="p-8 h-[90vh] bg-stone-800 rounded-lg border border-stone-300 max-w-48 flex flex-col relative">
      <DashboardAndSettings />
      <Projects />
      <NewProject />
    </div>
  );
}

export default Sidebar;
