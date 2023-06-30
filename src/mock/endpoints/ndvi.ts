import { Response, Server } from "miragejs";

import { AppSchema } from "../types";

export function routesForNDVI(server: Server) {
  server.get(`/ndvi`, (schema: AppSchema) => {
    const NDVI = schema.all("ndvi");
    return new Response(200, {}, NDVI);
  });

  server.get(`/ndvi/:fieldId`, (schema: AppSchema, request) => {
    const NDVI =
      schema.where("ndvi", { fieldId: request.params.fieldId }) || [];
    return new Response(200, {}, NDVI);
  });
}
