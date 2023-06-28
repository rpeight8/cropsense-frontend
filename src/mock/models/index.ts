import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

import { Field } from "../../types";
import { NDVI } from "../../types";
import { Crop } from "../../types";

const FieldModel: ModelDefinition<Field> = Model.extend({});
const NDVIModel: ModelDefinition<NDVI> = Model.extend({});
const CropModel: ModelDefinition<Crop> = Model.extend({});

export const models = {
  field: FieldModel,
  ndvi: NDVIModel,
  crop: CropModel,
};
