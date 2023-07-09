import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { ComponentPropsWithoutRef } from "react";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import useWorkspaceAddForm from "../hooks/useWorkspaceAddForm";

type FieldEditFormProps = ComponentPropsWithoutRef<"form"> & {
  wrapperClassName?: string;
};

const WorkspaceAddForm = ({
  className,
  wrapperClassName,
  ...props
}: FieldEditFormProps) => {
  const { form, onErrors, onSubmit, isLoading } = useWorkspaceAddForm();

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
          <div className="flex justify-end">
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

export default WorkspaceAddForm;
