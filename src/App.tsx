import { Outlet } from "react-router-dom";
import NavigationList from "./components/NavigationList/NavigationList";
import { cn } from "./lib/utils";

function App() {
  return (
    <div className={cn("flex bg-slate-800 h-full gap-1")}>
      <aside
        className={cn(
          "text-white basis-[200px] border border-amber-400 font-medium text-lg bg-slate-900"
        )}
      >
        <nav className="h-full">
          <NavigationList />
        </nav>
      </aside>
      <main
        className={cn(
          "flex w-full h-full text-white border border-cyan-300",
          {}
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
