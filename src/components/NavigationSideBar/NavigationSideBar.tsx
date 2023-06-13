import { ComponentPropsWithoutRef } from "react";
import "./NavigationSideBar.scss";

const SideBar = ({
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className="sideBar" {...props}>
      Sidebar
    </div>
  );
};

export default SideBar;
