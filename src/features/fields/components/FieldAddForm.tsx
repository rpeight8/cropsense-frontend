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
import CropRotationsList from "@/features/crops/components/CropRotationsList";

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

          <CropRotationsList cropRotations={cropRotations} form={form} />

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
