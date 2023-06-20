import { ComponentPropsWithoutRef, useEffect, memo } from "react";
import {
  MapContainer,
  Polygon,
  LayerGroup,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { cn } from "@/lib/utils";
import { FieldAction, Field, FieldCoordinates } from "@/types";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useAppSelector } from "@/store";
import { selectFields } from "@/features/fields/fieldsSlice";

type MapProps = Omit<ComponentPropsWithoutRef<"div">, "onDragEnd"> & {
  initialPosition?: [number, number];
  action?: FieldAction;
  handleNewField?: (coordinates: FieldCoordinates) => void;
  initialZoom: number;
  onDragEnd?: (map: any) => void;
  onZoomEnd?: (map: any) => void;
};

const triggerPolygonDraw = () => {
  const drawPolygonButton = document.querySelector(
    ".leaflet-draw-draw-polygon"
  );
  if (drawPolygonButton) {
    (drawPolygonButton as HTMLAnchorElement).click();
  }
};

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const FieldsMap = memo(
  ({
    initialPosition = [52.434, 30.9754] as [number, number],
    handleNewField,
    initialZoom,
    className,
    action,
    onZoomEnd,
    onDragEnd,
    ...props
  }: MapProps) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        if (action === "add") {
          triggerPolygonDraw();
        }
      }, 0);
      return () => clearTimeout(timer);
    }, [action]);

    const MyComponent = () => {
      const map = useMapEvents({
        click: (e) => {
          console.log(e);
        },
        dragend: (e) => {
          onDragEnd?.(map);
        },
        zoomend: (e) => {
          onZoomEnd?.(map);
        },
      });
      return null;
    };

    const fields = useAppSelector(selectFields);
    return (
      <MapContainer
        className={cn("", className)}
        zoom={initialZoom}
        center={initialPosition}
        {...props}
      >
        <MyComponent />
        <ReactLeafletGoogleLayer
          eventHandlers={{
            click: (e) => {
              console.log(e);
            },
            dragend: (e) => {
              console.log(e);
            },
          }}
          apiKey={GOOGLE_API_KEY}
          type="hybrid"
        ></ReactLeafletGoogleLayer>
        <LayerGroup
          eventHandlers={{
            click: (e) => {
              console.log(e);
            },
            dragend: (e) => {
              console.log(e);
            },
          }}
        >
          {fields.map((field: Field) => {
            return (
              <Polygon
                key={field.id}
                positions={[field.coordinates[0]]}
                pathOptions={{ color: field.color }}
                eventHandlers={{
                  click: () => {
                    console.log(field);
                  },
                }}
              />
            );
          })}
        </LayerGroup>
        {action === "add" && (
          <FeatureGroup>
            <EditControl
              position="topright"
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,

                polygon: {
                  showLength: true,
                },
              }}
              onCreated={(e) => {
                const coordinates = e.layer.toGeoJSON().geometry.coordinates;
                // Add holes
                if (coordinates.length === 1) {
                  coordinates.push([]);
                }
                handleNewField?.(coordinates);
              }}
            />
          </FeatureGroup>
        )}
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
  }
);

export type MapFromEvents = ReturnType<typeof useMapEvents>;
export default FieldsMap;
