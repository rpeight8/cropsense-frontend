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
import { ComponentPropsWithoutRef, useEffect } from "react";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import useWorkspaceManageForm, {
  FormSchema,
} from "../hooks/useWorkspaceManageForm";

type FieldEditFormProps = ComponentPropsWithoutRef<"form"> & {
  workspace: z.infer<typeof FormSchema>;
  onDelete?: () => void;
  onSave?: () => void;
  wrapperClassName?: string;
};

const WorkspaceManageForm = ({
  workspace,
  className,
  onDelete: handleDelete,
  onSave: handleSave,
  wrapperClassName,
  ...props
}: FieldEditFormProps) => {
  const { form, onErrors, onSubmit, isLoading, onDelete, isSuccess } =
    useWorkspaceManageForm(workspace);

  // Should it be moved to somewhere else?
  useEffect(() => {
    if (isSuccess) {
      handleSave?.();
    }
  }, [isSuccess, handleSave]);

  useEffect(() => {
    if (isSuccess) {
      handleDelete?.();
    }
  }, [handleDelete, isSuccess]);

  return (
    <div className={cn("h-full w-full relative", wrapperClassName)}>
      {isLoading && <SpinnerLoader />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
          className={cn("w-full h-full flex flex-col p-1", className)}
          {...props}
        >
          <div className="mb-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Workspace" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <Button
              className="mr-auto"
              type="button"
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              Delete
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

export default WorkspaceManageForm;
