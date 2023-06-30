import { Response, Server } from "miragejs";

import { AppSchema } from "../types";

export function routesForFields(server: Server) {
  server.get(`/fields`, (schema: AppSchema) => {
    const fields = schema.all("field");
    // fields.models[0].id = "KEKID";
    return new Response(200, {}, fields);
    // return seconds % 17 === 0
    //   ? new Response(401, {}, { error: true })
    //   : new Response(200, {}, fields);
  });

  server.post(`/fields`, (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    if (attrs.crop) {
      const crop = schema.find("crop", attrs.crop);
      if (!crop) {
        return new Response(404, {}, { error: true });
      }
      attrs.crop = crop.attrs;
    } else {
      attrs.crop = undefined;
    }
    const field = schema.create("field", attrs);
    return new Response(200, {}, field);
  });

  server.put(`/fields/:id`, (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    console.log(attrs);
    const id = request.params.id;
    const field = schema.find("field", id);

    if (attrs.crop) {
      const crop = schema.find("crop", attrs.crop);
      if (!crop) {
        return new Response(404, {}, { error: true });
      }
      attrs.crop = crop.attrs;
    } else {
      attrs.crop = undefined;
    }

    if (!field) {
      return new Response(404, {}, { error: true });
    }
    field.update(attrs);
    return new Response(200, {}, field);
  });
}
