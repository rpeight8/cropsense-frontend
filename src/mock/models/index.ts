import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

import { Field } from "../../types";
import { NDVI } from "../../types";

const FieldModel: ModelDefinition<Field> = Model.extend({});
const NDVIModel: ModelDefinition<NDVI> = Model.extend({});

export const models = {
  field: FieldModel,
  ndvi: NDVIModel,
};
