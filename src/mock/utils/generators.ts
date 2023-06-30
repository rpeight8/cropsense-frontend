import { faker } from "@faker-js/faker";
import { FieldPolygon } from "@/types";

export const randomFloat = (min: number, max: number) => {
  return faker.number.float({ min: min, max: max });
};

export const generatePolygon = (
  minLat: number,
  maxLat: number,
  minLng: number,
  maxLng: number
): FieldPolygon => {
  const generatedLat = faker.location.latitude({ min: minLat, max: maxLat });
  const generatedLng = faker.location.longitude({ min: minLng, max: maxLng });
  return [
    [generatedLat, generatedLng],
    [generatedLat, generatedLng + randomFloat(0.01, 0.02)],
    [
      generatedLat + randomFloat(0.001, 0.01),
      generatedLng + randomFloat(0.001, 0.01),
    ],
    [generatedLat + randomFloat(0.001, 0.01), generatedLng],
    [generatedLat, generatedLng],
  ];
};
