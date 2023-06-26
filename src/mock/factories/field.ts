import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

import { generatePolygon } from "../utils/generators";

import { Field } from "../../types";

export const fieldFactory = Factory.extend<Field>({
  id() {
    return faker.string.uuid();
  },
  name() {
    return `${faker.company.buzzAdjective()} Field`;
  },
  geometry() {
    const multiplier = 0.2;
    const lat = 52.434;
    const minLat = lat - multiplier;
    const maxLat = lat + multiplier;

    const lng = 30.9754;
    const minLng = lng - multiplier;
    const maxLng = lng + multiplier;
    return {
      type: "Polygon",
      coordinates: [generatePolygon(minLat, maxLat, minLng, maxLng), []],
    };
  },
  color() {
    return faker.color.human();
  },
});
