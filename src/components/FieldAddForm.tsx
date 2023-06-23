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

type FieldsAddFormProps = ComponentPropsWithoutRef<"form">;

const FieldAddForm = ({ className, ...props }: FieldsAddFormProps) => {
  const navigate = useNavigate();
  const {
    form,
    isError,
    isLoading,
    isSuccess,
    error,
    onSubmit,
    onCancel,
    newField,
    onErrors,
  } = useFieldAddForm();

  return (
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
  );
};

export default FieldAddForm;
