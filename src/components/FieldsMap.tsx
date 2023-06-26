import {
  ComponentPropsWithoutRef,
  useEffect,
  memo,
  useRef,
  useCallback,
  useState,
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
import { Field, FieldCoordinates, FieldGeometry, FieldId } from "@/types";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {
  selectEditLocalFieldGeometry,
  selectFields,
  selectHoveredFieldId,
  selectSelectedFieldId,
  setEditLocalFieldGeometry,
  setHoveredFieldId,
  setNewLocalFieldGeometry,
} from "@/features/fields/fieldsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectCenter,
  selectZoom,
  setCenter,
  setZoom,
} from "@/features/map/mapSlice";
import { useNavigate } from "react-router-dom";
import useURLParametersParser from "@/hooks/useURLParametersParser";

type EditControlProps = ElementProps<typeof EditControl>;

export type { Map, LeafletPolygon as Polygon };
export type OnEditVertexHandler = NonNullable<EditControlProps["onEdited"]>;
export type OnCreatedHandler = NonNullable<EditControlProps["onCreated"]>;

type MapProps = Omit<ComponentPropsWithoutRef<"div">, "onDragEnd"> & {
  initialPosition?: [number, number];
  handleNewField?: (coordinates: FieldCoordinates) => void;
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

const FieldsMap = memo(({ className, ...props }: MapProps) => {
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
        setNewLocalFieldGeometry({
          type: "Polygon",
          coordinates,
        })
      );
    },
    [dispatch]
  );

  // Zooms to selected field
  useEffect(() => {
    const Map = MapRef.current;
    const Polygon = HoveredPolygonRef.current;
    if (Map && Polygon && selectedFieldId) {
      Map.invalidateSize();
      Map.flyToBounds(Polygon.getBounds(), { duration: 0.5, maxZoom: 14 });
    }
  }, [selectedFieldId]);

  useEffect(() => {
    const Map = MapRef.current;
    SelectedPolygonRef.current?.getBounds();
    // console.log(Map);

    // var imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
    // imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
  }, [SelectedPolygonRef.current]);

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
                color: isSelectedOrHoveredField ? "white" : field.color,
                weight: isSelectedOrHoveredField ? 3 : 1,
                fillColor: field.color,
                opacity: isSelected && action === "edit" ? 0.3 : 0.6,
                fillOpacity: isSelected && action === "edit" ? 0.3 : 0.6,
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
        {selectedField?.id === "1" &&
          selectedField?.geometry.coordinates[0] && (
            <ImageOverlay
              bounds={selectedField?.geometry.coordinates[0]}
              url="https://platform-api.onesoil.ai/en/v2/fields-users-seasons-ndvi/64b88415-c2f5-4f24-95f3-650b4e7e4f4d/rgb.png"
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
                  setEditLocalFieldGeometry({
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
});

export default FieldsMap;
