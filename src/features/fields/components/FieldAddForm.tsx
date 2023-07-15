import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useFieldAddForm } from "@/features/fields/hooks/useFieldAddForm";
import { ComponentPropsWithoutRef } from "react";
import CropSelect from "@/features/crops/components/CropSelect";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import CropDatePicker from "../../crops/components/CropDatePicker";
import { v1 as uuidv1 } from "uuid";
import { List } from "@/components/ui/List";

type FieldsAddFormProps = ComponentPropsWithoutRef<"form"> & {
  addToSeasonsId: string;
  onSuccess?: () => void;
  onError?: () => void;
};

const FieldAddForm = ({
  className,
  addToSeasonsId,
  onSuccess,
  onError,
}: FieldsAddFormProps) => {
  const { form, isLoading, onSubmit, onCancel, onErrors } = useFieldAddForm(
    addToSeasonsId,
    onSuccess,
    onError
  );
  const cropRotations = form.getValues("cropRotations");
  return (
    <>
      <Form {...form}>
        <form
          className={cn(
            "w-full h-full grid grid-cols-1 grid-rows-[min-content_min-content_1fr_min-content] gap-4",
            className
          )}
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
        >
          <div>
            <h3 className="text-lg font-medium">Field information</h3>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Field Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Field-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          <h3 className="text-lg font-medium">Crop Rotations</h3>

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
                </li>
              );
            })}
          </List>

          <Button
            variant="outline"
            disabled={cropRotations.length >= 3}
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
          <div className="flex">
            <Button
              className="mr-auto"
              type="button"
              variant="secondary"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      {isLoading && <SpinnerLoader />}
    </>
  );
};
export default FieldAddForm;
