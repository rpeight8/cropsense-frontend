import { ComponentPropsWithoutRef } from "react";
import { MapContainer, Polygon } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { cn } from "@/lib/utils";
import { FieldAction, Field } from "@/types";
import "leaflet/dist/leaflet.css";
import { useAppSelector } from "@/store";
import { selectFields } from "@/features/fields/fieldsSlice";

type MapProps = ComponentPropsWithoutRef<"div"> & {
  initialPosition?: [number, number];
  state: FieldAction;
};

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const Map = ({
  initialPosition = [52.434, 30.9754] as [number, number],
  className,
  ...props
}: MapProps) => {
  const fields = useAppSelector(selectFields);
  console.log(fields);
  return (
    <MapContainer
      className={cn("", className)}
      zoom={15}
      center={initialPosition}
      {...props}
    >
      <ReactLeafletGoogleLayer
        apiKey={GOOGLE_API_KEY}
        type={"satellite"}
      ></ReactLeafletGoogleLayer>
      {fields.map((field: Field) => {
        console.log(field.coords.holes);
        return (
          <Polygon
            key={field.id}
            positions={[field.coords.polygons]}
            pathOptions={{ color: "red" }}
            eventHandlers={{
              click: () => {
                console.log(field);
              },
            }}
          />
        );
      })}
      {/* <Polygon
        positions={[
          initialPosition,
          [initialPosition[0], initialPosition[1] + 0.1],
          [initialPosition[0] + 0.1, initialPosition[1] + 0.1],
          [initialPosition[0] + 0.1, initialPosition[1]],
        ]}
        pathOptions={{ color: "red" }}
      /> */}
    </MapContainer>
  );
};

export default Map;
