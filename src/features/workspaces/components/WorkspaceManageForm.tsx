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
import { ComponentPropsWithoutRef } from "react";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import useWorkspaceManageForm, {
  FormSchema,
} from "../hooks/useWorkspaceManageForm";

type FieldEditFormProps = ComponentPropsWithoutRef<"form"> & {
  workspace: z.infer<typeof FormSchema>;
  wrapperClassName?: string;
};

const WorkspaceManageForm = ({
  workspace,
  className,
  wrapperClassName,
  ...props
}: FieldEditFormProps) => {
  const { form, onErrors, onSubmit, onDelete, isLoading } =
    useWorkspaceManageForm(workspace);

  return (
    <div className={cn("h-full w-full relative", wrapperClassName)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
          className={cn("w-full h-full flex flex-col", className)}
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
              onClick={onDelete}
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
