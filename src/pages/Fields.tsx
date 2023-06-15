import SubSideBar from "@/components/SubSideBar";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import "leaflet-plugins/layer/tile/Yandex.js";

export const Fields = () => {
  const position: [number, number] = [52.434, 30.9754];

  useEffect(() => {
    // 🤡
    try {
      const map = L.map("mapContainer", {
        center: position,
        zoom: 10,
        zoomAnimation: true,
      });
      L.yandex("hybrid").addTo(map);
      map.locate({ setView: true, maxZoom: 14 });
      map.on("click", (e) => {
        console.log(e.latlng);
      });
      var polygon = L.polygon([
        [52.509, 30.974],
        [52.503, 30.8],
        [52.2, 30.5],
      ]).addTo(map);
      console.log(map);
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
      <div id="mapContainer" className="flex-1">
        {/* <MapContainer
          className="h-full"
          center={position}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer> */}
      </div>
    </>
  );
};
