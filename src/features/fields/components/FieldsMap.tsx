import {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useCallback,
  useMemo,
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
import { ImageOverlay } from "react-leaflet/ImageOverlay";
import { Field, FieldCoordinates, FieldId } from "../types";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {
  selectFields,
  selectHoveredFieldId,
  selectSelectedFieldId,
  setHoveredFieldId,
} from "@/features/fields/fieldsSlice";
import {
  setAddFieldGeometry,
  setEditFieldGeometry,
} from "@/features/forms/formsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectCenter, selectZoom } from "@/features/map/mapSlice";
import { useNavigate } from "react-router-dom";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import {
  selectNDVIByFieldId,
  selectSelectedNDVIId,
} from "@/features/ndvi/ndviSlice";
import { cn } from "@/lib/utils";

type EditControlProps = ElementProps<typeof EditControl>;

export type { Map, LeafletPolygon as Polygon };
export type OnEditVertexHandler = NonNullable<EditControlProps["onEdited"]>;
export type OnCreatedHandler = NonNullable<EditControlProps["onCreated"]>;

type MapProps = Omit<ComponentPropsWithoutRef<"div">, "onDragEnd"> & {
  initialPosition?: [number, number];
  initialZoom: number;
  onFieldClick?: (fieldId: FieldId) => void;
  onDragEnd?: (map: Map) => void;
  onZoomEnd?: (map: Map) => void;
  onFieldMouseOver?: (fieldId: FieldId) => void;
  onFieldMouseOut?: () => void;
};

const LEAFLET_DRAW_POLYGON_BUTTON_CLASS_SELECTOR = ".leaflet-draw-draw-polygon";
const LEAFLET_EDIT_POLYGON_BUTTON_CLASS_SELECTOR = ".leaflet-draw-edit-edit";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const triggerPolygonDraw = () => {
  const drawPolygonButton = document.querySelector(
    LEAFLET_DRAW_POLYGON_BUTTON_CLASS_SELECTOR
  ) as HTMLAnchorElement;
  if (drawPolygonButton) {
    drawPolygonButton.click();
  }
};

const triggerPolygonEdit = () => {
  const editPolygonButton = document?.querySelector(
    LEAFLET_EDIT_POLYGON_BUTTON_CLASS_SELECTOR
  ) as HTMLAnchorElement;
  if (editPolygonButton) {
    editPolygonButton.click();
  }
};

const getCoodinatesFromPolygon = (
  polygon: LeafletPolygon
): FieldCoordinates => {
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
  coordinates[0].push(coordinates[0][0]);

  return coordinates;
};

const FieldsMap = ({ className, ...props }: MapProps) => {
  const MapRef = useRef<Map>(null);
  const HoveredPolygonRef = useRef<LeafletPolygon>(null);
  const SelectedPolygonRef = useRef<LeafletPolygon>(null);
  const { action } = useURLParametersParser();

  const mapCenter = useAppSelector(selectCenter);
  const mapZoom = useAppSelector(selectZoom);

  const dispatch = useAppDispatch();

  const fields = useAppSelector(selectFields);
  const selectedFieldId = useAppSelector(selectSelectedFieldId);
  const hoveredFieldId = useAppSelector(selectHoveredFieldId);
  const selectedField = fields.find((field) => field.id === selectedFieldId);

  const NDVIs = useAppSelector((state) =>
    selectNDVIByFieldId(state, selectedFieldId || "")
  );

  const selectedNDVIId = useAppSelector(selectSelectedNDVIId);

  const navigate = useNavigate();

  const onMapCoordinatesChange = useCallback(
    (map: Map) => {
      const center = map.getCenter();
      const lat = Number(center.lat.toFixed(5));
      const lng = Number(center.lng.toFixed(5));
      const url = [`/${lat},${lng},${map.getZoom()}/fields`];
      if (selectedFieldId) url.push(`${selectedFieldId}`);
      if (action) url.push(`${action}`);
      navigate(url.join("/"), {
        replace: true,
      });
    },
    [action, navigate, selectedFieldId]
  );

  const onModifyFinish: OnCreatedHandler | OnEditVertexHandler = useCallback(
    (e) => {
      const polygon = "poly" in e ? e.poly : e.layer;

      const coordinates = getCoodinatesFromPolygon(polygon);

      dispatch(
        setAddFieldGeometry({
          type: "Polygon",
          coordinates,
        })
      );
    },
    [dispatch]
  );

  const selectedNDVI = useMemo(() => {
    if (NDVIs && NDVIs.length > 0 && selectedNDVIId) {
      return NDVIs.find((ndvi) => ndvi.id === selectedNDVIId);
    }
  }, [NDVIs, selectedNDVIId]);

  // Zooms to selected field
  useEffect(() => {
    const Map = MapRef.current;
    const Polygon = HoveredPolygonRef.current || SelectedPolygonRef.current;
    let timer: NodeJS.Timeout | null = null;
    if (Map && Polygon && selectedFieldId) {
      Map.flyToBounds(Polygon.getBounds(), { duration: 0.5, maxZoom: 14 });
      // :clown:
      // Hack to fix incorectly displayed map tiles after flyToBounds
      timer = setTimeout(() => {
        Map.invalidateSize();
      }, 100);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
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

  // Triggers polygon editing on "edit" action
  useEffect(() => {
    const timer = setTimeout(() => {
      if (action === "edit") {
        triggerPolygonEdit();

        // Hack to trigger correct polygon editing in case if some polygon previously was edited
        // It moves "field points" from previous edited field to the new one
        const cancelLink = document.querySelector(
          `.leaflet-draw-actions a[title="Cancel editing, discards all changes"]`
        ) as HTMLAnchorElement | undefined;

        if (cancelLink) {
          cancelLink?.click();
          triggerPolygonEdit();
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [action]);

  // Handles map events
  // TODO: Remove map exposing to the handlers
  const EventHandler = () => {
    const map = useMapEvents({
      dragend: () => {
        onMapCoordinatesChange(map);
      },
      zoomend: () => {
        onMapCoordinatesChange(map);
      },
    });
    return null;
  };

  return (
    <MapContainer
      className={className}
      zoom={mapZoom}
      center={mapCenter}
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
          const isSelected = selectedFieldId === field.id;
          const isHovered = hoveredFieldId === field.id;
          const isSelectedOrHoveredField =
            isSelected || hoveredFieldId === field.id;
          return (
            <Polygon
              key={field.id}
              positions={[field.geometry.coordinates[0]]}
              ref={
                isHovered
                  ? HoveredPolygonRef
                  : isSelected
                  ? SelectedPolygonRef
                  : undefined
              }
              pathOptions={{
                color: "white",
                weight: isSelectedOrHoveredField ? 3 : 1.5,
                fillColor:
                  selectedNDVI && isSelected ? undefined : field?.crop?.color,
                opacity: isSelected && action === "edit" ? 0.5 : 1,
                fillOpacity: parseFloat(
                  cn("", {
                    "0.3": isSelected && action === "edit",
                    "0": (isSelected && selectedNDVI) || !field?.crop?.color,
                    "0.6": true,
                  })
                ),
              }}
              eventHandlers={{
                click: () => {
                  if (action === "edit") return;
                  navigate(`${field.id}/display`);
                },
                mouseover: () => {
                  dispatch(setHoveredFieldId(field.id));
                },
                mouseout: () => {
                  dispatch(setHoveredFieldId(undefined));
                },
              }}
            />
          );
        })}
      </LayerGroup>
      <LayerGroup>
        {action !== "edit" &&
          action !== "add" &&
          selectedNDVI &&
          selectedField?.geometry.coordinates[0] && (
            <ImageOverlay
              bounds={selectedField?.geometry.coordinates[0]}
              url={selectedNDVI.pictureURL}
            />
          )}
      </LayerGroup>
      {(action === "add" || action === "edit") && (
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
            // onEditVertex={onFieldEdit}
            onEditVertex={(e) => {
              if (action === "edit") {
                const polygon = "poly" in e ? e.poly : e.layer;
                const coordinates = getCoodinatesFromPolygon(polygon);
                dispatch(
                  // Nothing else except Polygon is supported
                  setEditFieldGeometry({
                    type: "Polygon",
                    coordinates: [...coordinates],
                  })
                );
              } else {
                onModifyFinish(e);
              }
            }}
            onCreated={(e) => {
              if (action === "add") {
                onModifyFinish(e);
                const editButton = document?.querySelector(
                  LEAFLET_EDIT_POLYGON_BUTTON_CLASS_SELECTOR
                ) as HTMLAnchorElement;
                editButton?.click();
              }
            }}
          />
          {action === "edit" && selectedField && (
            <Polygon
              positions={selectedField.geometry.coordinates[0]}
              pathOptions={{
                color: "blue",
                weight: 3,
                opacity: 0.6,
                fillOpacity: 0,
              }}
            />
          )}
        </FeatureGroup>
      )}
    </MapContainer>
  );
};

export default FieldsMap;
