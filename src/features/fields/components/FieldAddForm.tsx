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
import { ComponentPropsWithoutRef, memo, useEffect } from "react";
import CropSelect from "@/features/crops/components/CropSelect";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import { useAppDispatch } from "@/store";
import { resetAddField } from "@/features/forms/formsSlice";

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAddField());
  }, [dispatch]);

  return (
    <div className="h-full relative">
      <Form {...form}>
        <form
          className={cn("w-full h-full flex flex-col", className)}
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
        >
          <div className="mb-auto">
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
            <FormField
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop</FormLabel>
                  <FormControl>
                    <CropSelect
                      displayNone={true}
                      onCropSelect={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Crop to be assigned to the field
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
    </div>
  );
};
export default FieldAddForm;
