import SubSideBar from "@/components/SubSideBar";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export const Fields = () => {
  const position: [number, number] = [51.505, -0.09];
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
      {/* <div id="map" className="w-[600px] h-[400px]"></div> */}
      <div className="flex-1">
        <MapContainer
          className="h-full"
          center={position}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </>
  );
};
