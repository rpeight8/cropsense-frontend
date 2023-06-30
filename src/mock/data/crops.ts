import { Crop } from "@/types";

const getCrops = (): Crop[] => {
  return [
    {
      id: "1",
      name: "Пшеница",
      color: "green",
    },
    {
      id: "2",
      name: "Ячмень",
      color: "yellow",
    },
  ];
};

export { getCrops };
