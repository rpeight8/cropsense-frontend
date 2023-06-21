import {
  ComponentPropsWithoutRef,
  useEffect,
  memo,
  useRef,
  useCallback,
} from "react";
import {
  MapContainer,
  Polygon,
  LayerGroup,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import type { Map, Polygon as LeafletPolygon } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { FieldAction, Field, FieldCoordinates, FieldId } from "@/types";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

type EditControlProps = ElementProps<typeof EditControl>;

export type { Map, LeafletPolygon as Polygon };
export type OnEditVertexHandler = NonNullable<EditControlProps["onEdited"]>;
export type OnCreatedHandler = NonNullable<EditControlProps["onCreated"]>;

type MapProps = Omit<ComponentPropsWithoutRef<"div">, "onDragEnd"> & {
  initialPosition?: [number, number];
  action?: FieldAction;
  selectedFieldId?: FieldId;
  handleNewField?: (coordinates: FieldCoordinates) => void;
  initialZoom: number;
  onFieldClick?: (fieldId: FieldId) => void;
  onDragEnd?: (map: Map) => void;
  onZoomEnd?: (map: Map) => void;
  onFieldMouseOver?: (fieldId: FieldId) => void;
  onFieldMouseOut?: () => void;
  fields: Field[];
};

const LEAFLET_DRAW_POLYGON_BUTTON_CLASS_SELECTOR = ".leaflet-draw-draw-polygon";
const LEAFLET_EDIT_POLYGON_BUTTON_CLASS_SELECTOR = ".leaflet-draw-edit-edit";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const triggerPolygonDraw = () => {
  const drawPolygonButton = document.querySelector(
    LEAFLET_DRAW_POLYGON_BUTTON_CLASS_SELECTOR
  );
  if (drawPolygonButton) {
    (drawPolygonButton as HTMLAnchorElement).click();
  }
};

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
    fields,
    ...props
  }: MapProps) => {
    const MapRef = useRef<Map>(null);
    const TargetPolygonRef = useRef<LeafletPolygon>(null);

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

    const onModifyFinish: OnCreatedHandler | OnEditVertexHandler = useCallback(
      (e) => {
        const polygon = "poly" in e ? e.poly : e.layer;
        const lLatLng = polygon.getLatLngs()[0] as {
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
      },
      [handleNewField]
    );

    // Handles map events
    // TODO: Remove map exposing to the handlers
    const EventHandler = () => {
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

    return (
      <MapContainer
        className={className}
        zoom={initialZoom}
        center={initialPosition}
        ref={MapRef}
        {...props}
      >
        <EventHandler />
        <ReactLeafletGoogleLayer
          apiKey={GOOGLE_API_KEY}
          type="hybrid"
        ></ReactLeafletGoogleLayer>
        <LayerGroup>
          {fields.map((field: Field) => {
            const isSelectedField = selectedFieldId === field.id;
            return (
              <Polygon
                key={field.id}
                positions={[field.coordinates[0]]}
                ref={isSelectedField ? TargetPolygonRef : null}
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
                  mouseover: () => {
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
              onEditVertex={(e) => {
                onModifyFinish(e);
              }}
              onCreated={(e) => {
                onModifyFinish(e);
                const editButton = document?.querySelector(
                  LEAFLET_EDIT_POLYGON_BUTTON_CLASS_SELECTOR
                ) as HTMLAnchorElement;
                editButton?.click();
              }}
            />
          </FeatureGroup>
        )}
      </MapContainer>
    );
  }
);

export default FieldsMap;
