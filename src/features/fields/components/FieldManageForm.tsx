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
import useFieldManageForm from "@/features/fields/hooks/useFieldManageForm";
import { ComponentPropsWithoutRef } from "react";
import CropSelect from "@/features/crops/components/CropSelect";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import CropDatePicker from "@/features/crops/components/CropDatePicker";
import { Field } from "../types";
import List from "@/components/ui/List";
import CropRotationsList from "@/features/crops/components/CropRotationsList";

type FieldManageFormProps = ComponentPropsWithoutRef<"form"> & {
  field: Field;
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

  const cropRotations = form.getValues("cropRotations");

  return (
    <>
      <h4 className="font-semibold">Manage Field '{field.name}'</h4>
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

              <h3 className="text-lg font-medium">Crop Rotations</h3>

              <CropRotationsList cropRotations={cropRotations} form={form} />
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
    </>
  );
};

export default FieldManageForm;
