import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

import { Field } from "../../types";

const FieldModel: ModelDefinition<Field> = Model.extend({});

export const models = {
  field: FieldModel,
};
