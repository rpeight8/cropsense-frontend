import { useNavigate } from "react-router-dom";
import * as z from "zod";

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
import {
  FormSchema,
  useFieldEditForm,
} from "@/features/fields/hooks/useFieldEditForm";
import { ComponentPropsWithoutRef } from "react";
import CropSelect from "@/features/crops/components/CropSelect";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import { useCrops } from "@/features/crops/services";

type FieldEditFormProps = ComponentPropsWithoutRef<"form"> & {
  field: z.infer<typeof FormSchema>;
  wrapperClassName?: string;
};

const FieldEditForm = ({
  field,
  className,
  wrapperClassName,
  ...props
}: FieldEditFormProps) => {
  const navigate = useNavigate();
  const { form, onErrors, onSubmit, isLoading } = useFieldEditForm(field);
  // const isLoading = true;
  const {
    isLoading: isLoadingCrops,
    isFetching: isFetchingCrops,
    isError: isErrorCrops,
    isSuccess: isSuccessCrops,
    error: errorCrops,
    data: crops,
  } = useCrops();

  return (
    <div className={cn("h-full w-full relative", wrapperClassName)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
          className={cn("w-full h-full flex flex-col", className)}
          {...props}
        >
          <div className="mb-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Field-1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
                      initialCropId={form.getValues("crop")?.id}
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
              className="mr-auto bg-ternary"
              type="button"
              variant="default"
              onClick={() => {
                form.reset();
                navigate(-1);
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

export default FieldEditForm;
