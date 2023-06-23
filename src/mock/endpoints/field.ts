import { Response, Server } from "miragejs";

import { AppSchema } from "../types";

export function routesForFields(server: Server) {
  server.get(`/fields`, (schema: AppSchema) => {
    const fields = schema.all("field");
    fields.models[0].id = "KEKID";
    return new Response(200, {}, fields);
    // return seconds % 17 === 0
    //   ? new Response(401, {}, { error: true })
    //   : new Response(200, {}, fields);
  });

  server.post(`/fields`, (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const field = schema.create("field", attrs);
    return new Response(200, {}, field);
  });
}
