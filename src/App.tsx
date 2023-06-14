import { useState } from "react";
import NavigationSideBar from "./components/NavigationList";
import DetailedInfoSideBar from "./components/DetailedInfoSideBar";
import { cn } from "./lib/utils";

function App() {
  return (
    <div className={cn("flex bg-slate-800 h-full gap-1")}>
      <aside className={cn("text-white basis-[300px] border border-amber-400")}>
        <NavigationSideBar />
      </aside>
      <main
        className={cn(
          "flex w-full h-full text-white border border-cyan-300",
          {}
        )}
      >
        Main
      </main>
      ;
    </div>
  );
}

export default App;
