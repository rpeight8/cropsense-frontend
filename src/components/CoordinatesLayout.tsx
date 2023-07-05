import { Outlet } from "react-router-dom";
import NavigationList from "@/components/NavigationList/NavigationList";
import { cn } from "@/lib/utils";
import Toaster from "@/components/ui/Toast/Toaster";
import { memo } from "react";

const CoordinatesLayout = memo(() => {
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
      <div className={cn("flex h-full gap-1")}>
        <aside className={cn("basis-[200px] font-medium text-lg")}>
          <nav className="h-full">
            <NavigationList items={navigationItems} />
          </nav>
        </aside>
        <main className={cn("flex w-full h-full overflow-hidden", {})}>
          <Outlet />
          <Toaster />
        </main>
      </div>
    </>
  );
});

export default CoordinatesLayout;
