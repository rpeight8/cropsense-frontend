import { createServer } from "miragejs";
import { faker } from "@faker-js/faker";

import { endpoints } from "./endpoints";
import { models } from "./models";
import { factories } from "./factories";

export function startMirage() {
  const server = createServer({
    timing: 2000,
    models,
    factories,
    seeds(server) {
      server.createList("field", faker.number.int({ min: 5, max: 8 }));
    },
  });
  // logging
  server.logging = true;

  // external URLs
  server.post(
    `${import.meta.env.VITE_SOME_KEY}/:any`,
    () =>
      new Promise((_res: any) => {
        console.log("external call handler");
      })
  );

  server.urlPrefix = import.meta.env.VITE_API_URL ?? "";
  for (const namespace of Object.keys(endpoints)) {
    endpoints[namespace](server);
  }

  server.namespace = "";
  server.passthrough();
  // console.log({server})
  console.log({ dump: server.db.dump() });
}
