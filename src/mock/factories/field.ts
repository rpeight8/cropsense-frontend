import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import { Field } from "../../types";
export const fieldFactory = Factory.extend<Field>({
  id() {
    return faker.string.uuid();
  },
  text() {
    return `${faker.company.buzzAdjective()} Field`;
  },
});
