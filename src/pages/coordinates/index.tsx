import { Outlet } from "react-router-dom";
import NavigationList from "@/components/NavigationList/NavigationList";
import { cn } from "@/lib/utils";
import Toaster from "@/components/ui/Toast/Toaster";
import { memo } from "react";

const Coordinates = memo(() => {
  const navigationItems = [
    {
      text: "Fields",
      link: `fields`,
    },
    {
      text: "Sensors",
      link: `sensors`,
    },
  ];

  return (
    <>
      <div className={cn("flex bg-primary h-full gap-1")}>
        <aside
          className={cn(
            "text-white basis-[200px] font-medium text-lg bg-primary"
          )}
        >
          <nav className="h-full">
            <NavigationList items={navigationItems} />
          </nav>
        </aside>
        <main
          className={cn("flex w-full h-full text-white overflow-hidden", {})}
        >
          <Outlet />
          <Toaster />
        </main>
      </div>
    </>
  );
});

export default Coordinates;
