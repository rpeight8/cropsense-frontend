import SubSideBar from "@/components/SubSideBar";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";

export const Fields = () => {
  useEffect(() => {
    // 🤡
    try {
      const map = L.map("mapContainer").setView([51.505, -0.09], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
      }).addTo(map);
    } catch (e) {
      console.log(e);
    }
  }, []);
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
      <div id="mapContainer" className="flex-1 h-full" />
    </>
  );
};
