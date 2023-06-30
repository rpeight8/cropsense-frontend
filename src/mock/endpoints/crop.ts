import { Response, Server } from "miragejs";

import { AppSchema } from "../types";

export function routesForCrops(server: Server) {
  server.get(`/crops`, (schema: AppSchema) => {
    const crops = schema.all("crop");
    return new Response(200, {}, crops);
  });

  server.get(`/crops/:cropId`, (schema: AppSchema, request) => {
    const crop = schema.where("crop", { id: request.params.cropId }) || [];
    return new Response(200, {}, crop);
  });
}
