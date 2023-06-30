import { useNavigate } from "react-router-dom";

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
import { useFieldAddForm } from "@/hooks/useFieldAddForm";
import { ComponentPropsWithoutRef, useEffect } from "react";
import CropSelect from "@/features/crops/components/CropSelect";
import { useCrops } from "@/services/crops";
import Spinner from "@/components/ui/Spinner";
import SpinnerLoader from "@/components/ui/SpinnerLoader";

type FieldsAddFormProps = ComponentPropsWithoutRef<"form">;

const FieldAddForm = ({ className, ...props }: FieldsAddFormProps) => {
  const {
    form,
    isError,
    isLoading,
    isSuccess,
    error,
    onSubmit,
    onCancel,
    onErrors,
  } = useFieldAddForm();

  const {
    isLoading: isLoadingCrops,
    isFetching: isFetchingCrops,
    isError: isErrorCrops,
    isSuccess: isSuccessCrops,
    error: errorCrops,
    data: crops,
  } = useCrops();

  return (
    <div className="h-full relative">
      <Form {...form}>
        <form
          className={cn("w-full h-full flex flex-col", className)}
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
          {...props}
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
                      isLoading={isLoadingCrops || isFetchingCrops}
                      onValueChange={field.onChange}
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
              className="mr-auto bg-ternary/"
              type="button"
              variant="default"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="secondary" className="bg-accent-2">
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
