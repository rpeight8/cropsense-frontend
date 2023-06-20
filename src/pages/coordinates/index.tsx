import { Outlet, useParams } from "react-router-dom";
import Map from "@/components/FieldsMap";
import { FieldAction } from "@/types";
import NavigationList from "@/components/NavigationList/NavigationList";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Toast/Toaster";

const Coordinates = () => {
  const { coordinates = "52, 32", action = "none" } = useParams() as {
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

  const params = useParams();
  console.log("Coordinates:params", params);

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
        <main className={cn("flex w-full h-full text-white", {})}>
          <Outlet />
          <Toaster />
        </main>
      </div>
    </>
  );
};

export default Coordinates;
