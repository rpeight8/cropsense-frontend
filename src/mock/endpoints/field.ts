import { Response, Server } from "miragejs";
import { AppSchema } from "../types";

export function routesForFields(server: Server) {
  server.get(`/fields`, (schema: AppSchema, request) => {
    const fields = schema.all("field");
    return new Response(200, {}, fields);
    // return seconds % 17 === 0
    //   ? new Response(401, {}, { error: true })
    //   : new Response(200, {}, fields);
  });
}
