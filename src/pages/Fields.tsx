import SubSideBar from "@/components/SubSideBar";
import Map from "@/components/Map";

export const Fields = () => {
  return (
    <>
      <SubSideBar className="bg-slate-700 border border-purple-400">
        <ul>
          <li key="Field 1">Field 1</li>
          <li key="Field 2">Field 2</li>
          <li key="Field 3">Field 3</li>
          <li key="Field 4">Field 4</li>
        </ul>
      </SubSideBar>
      <Map className="flex-1" />
    </>
  );
};
