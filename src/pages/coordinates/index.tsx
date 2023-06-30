import { Outlet, useParams } from "react-router-dom";
import Map from "@/features/fields/components/FieldsMap";
import { FieldAction } from "@/types";
import NavigationList from "@/components/NavigationList/NavigationList";
import { cn } from "@/lib/utils";
import Toaster from "@/components/ui/Toast/Toaster";

const Coordinates = () => {
  const { coordinates } = useParams() as {
    coordinates: string;
    action: FieldAction;
  };

  const navigationItems = [
    {
      text: "Fields",
      link: `/${coordinates}/fields`,
    },
    {
      text: "Sensors",
      link: `/${coordinates}/sensors`,
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
};

export default Coordinates;
