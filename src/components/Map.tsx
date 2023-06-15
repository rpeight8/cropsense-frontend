import * as L from "leaflet";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import "leaflet-plugins/layer/tile/Yandex.js";
import { cn } from "@/lib/utils";

type MapProps = ComponentPropsWithoutRef<"div"> & {
  initialPosition?: [number, number];
};

const Map = ({
  initialPosition = [52.434, 30.9754] as [number, number],
  className,
  ...props
}: MapProps) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition);

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
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <div id="mapContainer" className={cn(className)} {...props}></div>;
};

export default Map;
