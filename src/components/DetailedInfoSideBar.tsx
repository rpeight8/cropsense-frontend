import { ComponentPropsWithoutRef } from "react";

const DetailedInfoSideBar = ({ ...props }: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className="sideBar" {...props}>
      Detailed Info
    </div>
  );
};

export default DetailedInfoSideBar;
