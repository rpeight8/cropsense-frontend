import * as L from "leaflet";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "leaflet-plugins/layer/tile/Yandex.js";
import { cn } from "@/lib/utils";
import { FieldAction } from "@/types";

type MapProps = ComponentPropsWithoutRef<"div"> & {
  initialPosition?: [number, number];
  state: FieldAction;
};

const Map = ({
  initialPosition = [52.434, 30.9754] as [number, number],
  className,
  ...props
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  console.log("map");
  const initMap = useCallback(() => {
    if (map) return;
    if (!ref.current) return;
    if (ref.current.childElementCount > 0) return;
    console.log("usecallback map");
    const lMap = L.map(ref.current, {
      center: initialPosition,
      zoom: 10,
      zoomAnimation: true,
    });
    setMap(lMap);
    // @ts-ignore
    L.yandex("hybrid").addTo(lMap);
    lMap.locate({ setView: true, maxZoom: 14 });
  }, []);

  useEffect(() => {
    console.log("useeffect map");
    console.log(map);
    try {
      initMap();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div id="mapContainer" className={cn(className)} {...props} ref={ref}></div>
  );
};

export default Map;
