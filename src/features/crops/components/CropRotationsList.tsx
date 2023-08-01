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
import { Button } from "@/components/ui/Button";
import { FieldValues, useForm } from "react-hook-form";

type CropRotationsListProps = {
  cropRotations: CropRotations;
  form: ReturnType<typeof useForm<CropRotations>>;
};

const CropRotationsList = ({ form, cropRotations }: CropRotationsListProps) => {
  return (
    <List className="divide-y space-y-8">
      {/* TODO: Autofocus on new crop rotation */}
      {cropRotations.map((cropRotation, index) => {
        return (
          <li key={cropRotation._key}>
            <FormField
              control={form.control}
              name={`${index}.cropId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop {index + 1}</FormLabel>
                  <FormControl>
                    <CropSelect
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
              <FormField
                control={form.control}
                name={`${index}.cropPlantingDate`}
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
                name={`${index}.cropHarvestDate`}
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
          </li>
        );
      })}
    </List>
  );
};

export default CropRotationsList;
