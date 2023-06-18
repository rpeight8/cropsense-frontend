export type Field = {
  id: string;
  name: string;
  coordinates: FieldCoordinates;
  color?: string;
};

export type FieldWithoutCoords = Omit<Field, "coordinates">;

export type FieldCoordinates = [FieldPolygon, FieldHole];
export type FieldPolygon = [number, number][];
export type FieldHole = [number, number][];

export type FieldAction = "add" | "edit" | "display" | "none";

export type FieldId = Field["id"];
