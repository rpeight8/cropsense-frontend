import List from "@/components/ui/List";
import { CropRotation, CropRotations } from "../types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import CropSelect from "./CropSelect";
import CropDatePicker from "./CropDatePicker";
import { UseFormReturn, useForm } from "react-hook-form";
import { AddFormType, ManageFormType } from "@/features/fields/types";
import { v1 as uuidv1 } from "uuid";
import { Button } from "@/components/ui/Button";

type CropRotationsListProps = {
  cropRotations: CropRotations;
  form: UseFormReturn<ManageFormType, any, undefined>;
  // | UseFormReturn<AddFormType, any, undefined>;
  // | ReturnType<typeof useForm<ManageFormType>>;
};

const CropRotationsList = ({ form, cropRotations }: CropRotationsListProps) => {
  return (
    <>
      <List className="divide-y space-y-8">
        {/* TODO: Autofocus on new crop rotation */}
        {cropRotations.map((cropRotation, index) => {
          return (
            <li key={cropRotation._key}>
              <FormField
                control={form.control}
                name={`cropRotations.${index}.cropId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop {index + 1}</FormLabel>
                    <FormControl>
                      <CropSelect
                        initialCropId={cropRotation.cropId || undefined}
                        displayNone={true}
                        onCropSelect={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Crop to be assigned to this field
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <div className="flex flex-wrap gap-5">
                  <FormField
                    control={form.control}
                    name={`cropRotations.${index}.cropPlantingDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plant Date</FormLabel>
                        <FormControl>
                          <CropDatePicker
                            disabled={!cropRotation.cropId}
                            onButtonBlur={field.onBlur}
                            onButtonChange={field.onChange}
                            date={field.value || undefined}
                            buttonRef={field.ref}
                          />
                        </FormControl>
                        <FormDescription>
                          Planting Date of selected crop
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`cropRotations.${index}.cropHarvestDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harvest Date</FormLabel>
                        <FormControl>
                          <CropDatePicker
                            disabled={!cropRotation.cropId}
                            onButtonBlur={field.onBlur}
                            onButtonChange={field.onChange}
                            date={field.value || undefined}
                            buttonRef={field.ref}
                          />
                        </FormControl>
                        <FormDescription>
                          Harvest Date of selected crop
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  disabled={cropRotations.length >= 3}
                  type="button"
                  onClick={() => {
                    if (cropRotations.length >= 3) return;
                    form.setValue(
                      "cropRotations",
                      [...cropRotations.filter((_, i) => i !== index)],
                      { shouldValidate: false }
                    );
                  }}
                >
                  {" "}
                  Remove Rotation{" "}
                </Button>
              </div>
            </li>
          );
        })}
      </List>
      <Button
        variant="outline"
        disabled={cropRotations.length >= 3}
        type="button"
        onClick={() => {
          if (cropRotations.length >= 3) return;
          form.setValue(
            "cropRotations",
            [
              ...cropRotations,
              {
                _key: uuidv1(),
                cropId: null,
                cropPlantingDate: null,
                cropHarvestDate: null,
              },
            ],
            { shouldValidate: false }
          );
        }}
      >
        Add Crop Rotation
      </Button>
    </>
  );
};

export default CropRotationsList;
