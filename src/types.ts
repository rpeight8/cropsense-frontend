export type Field = {
  id: string;
  text: string;
};

export type FieldAction = "add" | "edit" | "display" | "none";

export type FieldId = Field["id"];
