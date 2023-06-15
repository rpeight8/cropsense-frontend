import { createServer, Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import { v4 as uuidv4 } from "uuid";

type Field = {
  id: string;
  text: string;
};

type Schema = {
  field: {
    create: (field: Field) => Field;
    all: () => Field[];
  };
};

export default function () {
  createServer({
    models: {
      field: Model,
    },

    seeds(server) {
      server.create("field", { id: uuidv4(), text: "Field 1" });
      server.create("field", { id: uuidv4(), text: "Field 2" });
      server.create("field", { id: uuidv4(), text: "Field 2" });
    },

    routes() {
      this.get("/api/fields", (schema) => {
        return schema.field.all();
      });

      this.post("/api/fields", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = uuidv4();
        return schema.field.create(attrs);
      });
    },
  });
}
