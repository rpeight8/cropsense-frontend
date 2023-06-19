import { Outlet } from "react-router-dom";

import { cn } from "./lib/utils";

import { Toaster } from "@/components/ui/Toast/Toaster";
import NavigationList from "@/components/NavigationList/NavigationList";

function App() {
  return (
    <>
      <div className={cn("flex bg-primary h-full gap-1")}>
        <aside
          className={cn(
            "text-white basis-[200px] font-medium text-lg bg-primary"
          )}
        >
          <nav className="h-full">
            <NavigationList />
          </nav>
        </aside>
        <main className={cn("flex w-full h-full text-white", {})}>
          <Outlet />
          <Toaster />
        </main>
      </div>
    </>
  );
}

export default App;
