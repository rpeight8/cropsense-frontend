import { ComponentPropsWithoutRef, useEffect, memo, useRef } from "react";
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
import { FieldAction, Field, FieldCoordinates, FieldId } from "@/types";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useAppSelector } from "@/store";
import { selectFields } from "@/features/fields/fieldsSlice";

type MapProps = Omit<ComponentPropsWithoutRef<"div">, "onDragEnd"> & {
  initialPosition?: [number, number];
  action?: FieldAction;
  selectedFieldId?: FieldId;
  handleNewField?: (coordinates: FieldCoordinates) => void;
  initialZoom: number;
  onFieldClick?: (fieldId: FieldId) => void;
  onDragEnd?: (map: any) => void;
  onZoomEnd?: (map: any) => void;
  onFieldMouseOver?: (fieldId: FieldId) => void;
  onFieldMouseOut?: () => void;
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
    selectedFieldId,
    onFieldClick,
    onZoomEnd,
    onDragEnd,
    onFieldMouseOver,
    onFieldMouseOut,
    ...props
  }: MapProps) => {
    const MapRef = useRef<MapFromEvents>(null);
    const TargetPolygonRef = useRef<any>(null);

    // Zooms to selected field
    useEffect(() => {
      const Map = MapRef.current;
      const Polygon = TargetPolygonRef.current;
      if (Map && Polygon && selectedFieldId) {
        Map.flyToBounds(Polygon.getBounds(), { duration: 1, maxZoom: 14 });
      }
    }, [selectedFieldId]);

    // Triggers polygon drawing on "add" action
    useEffect(() => {
      const timer = setTimeout(() => {
        if (action === "add") {
          triggerPolygonDraw();
        }
      }, 0);
      return () => clearTimeout(timer);
    }, [action]);

    // Handles map events
    const MyComponent = () => {
      const map = useMapEvents({
        dragend: () => {
          onDragEnd?.(map);
        },
        zoomend: () => {
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
        ref={MapRef}
        {...props}
      >
        <MyComponent />
        <ReactLeafletGoogleLayer
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
            const isSelectedField = selectedFieldId === field.id;
            return (
              <Polygon
                key={field.id}
                positions={[field.coordinates[0]]}
                ref={isSelectedField ? TargetPolygonRef : null}
                attribution="&copy; Google Maps"
                pathOptions={{
                  color: isSelectedField ? "white" : field.color,
                  weight: isSelectedField ? 3 : 1,
                  fillColor: field.color,
                  fillOpacity: 0.6,
                }}
                eventHandlers={{
                  click: () => {
                    onFieldClick?.(field.id);
                  },
                  mouseover: (e) => {
                    console.log(e);
                    onFieldMouseOver?.(field.id);
                  },
                  mouseout: () => {
                    onFieldMouseOut?.();
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
                const lLatLng = e.layer.getLatLngs()[0] as {
                  lat: number;
                  lng: number;
                }[];
                // Holes is not supported yet
                const coordinates = [
                  lLatLng.map((latLng) => {
                    return [latLng.lat, latLng.lng] as [number, number];
                  }),
                  [],
                ] as FieldCoordinates;

                // Add first point to the end of coordinates
                // to close the polygon
                coordinates[0].push([...coordinates[0][0]]);

                handleNewField?.(coordinates);
              }}
            />
          </FeatureGroup>
        )}
      </MapContainer>
    );
  }
);

export type MapFromEvents = ReturnType<typeof useMapEvents>;
export default FieldsMap;
