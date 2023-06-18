export type Field = {
  id: string;
  text: string;
  coords: {
    polygons: FieldPolygon[];
    holes: FieldHole[];
  };
};

export type FieldWithoutCoords = Omit<Field, "coords">;

export type FieldPolygon = [number, number][];
export type FieldHole = [number, number][];

export type FieldAction = "add" | "edit" | "display" | "none";

export type FieldId = Field["id"];
