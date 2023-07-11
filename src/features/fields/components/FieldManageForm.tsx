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
import useFieldManageForm, {
  FormSchema,
} from "@/features/fields/hooks/useFieldManageForm";
import { ComponentPropsWithoutRef } from "react";
import CropSelect from "@/features/crops/components/CropSelect";
import SpinnerLoader from "@/components/ui/SpinnerLoader";

type FieldManageFormProps = ComponentPropsWithoutRef<"form"> & {
  field: z.infer<typeof FormSchema>;
  onUpdateSuccess?: () => void;
  onUpdateError?: () => void;
  onDeleteSuccess?: () => void;
  onDeleteError?: () => void;
  wrapperClassName?: string;
};

const FieldManageForm = ({
  field,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
  className,
  wrapperClassName,
  ...props
}: FieldManageFormProps) => {
  const { form, onErrors, onSubmit, onCancel, onDelete, isLoading } =
    useFieldManageForm({
      field,
      onUpdateSuccess,
      onUpdateError,
      onDeleteSuccess,
      onDeleteError,
    });

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
          <div className="flex gap-x-2">
            <Button
              type="button"
              variant="destructive"
              onClick={(e) => {
                onDelete();
              }}
            >
              {" "}
              Delete
            </Button>
            <Button
              className="ml-auto"
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

export default FieldManageForm;
