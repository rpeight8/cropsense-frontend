import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
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
import { FormSchema, useFieldEditForm } from "@/hooks/useFieldEditForm";
import { ComponentPropsWithoutRef } from "react";
import {
  selectFields,
  selectSelectedFieldId,
} from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";
import CropSelect from "@/features/crops/components/CropSelect";
import { useCrops } from "@/services/crops";

type FieldEditFormProps = ComponentPropsWithoutRef<"form"> & {
  field: z.infer<typeof FormSchema>;
};

const FieldEditForm = ({ field, className, ...props }: FieldEditFormProps) => {
  const navigate = useNavigate();
  const { form, onErrors, onSubmit } = useFieldEditForm(field);

  const {
    isLoading: isLoadingCrops,
    isFetching: isFetchingCrops,
    isError: isErrorCrops,
    isSuccess: isSuccessCrops,
    error: errorCrops,
    data: crops,
  } = useCrops();

  return (
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
                  <Input placeholder="field name" {...field} />
                </FormControl>
                <FormDescription>Field information</FormDescription>
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
                    initialCropId={form.getValues("crop")}
                    displayNone={true}
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
  );
};

export default FieldEditForm;
