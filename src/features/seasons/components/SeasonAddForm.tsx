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
import { ComponentPropsWithoutRef, useEffect } from "react";
import SpinnerLoader from "@/components/ui/SpinnerLoader";
import useSeasonAddForm from "../hooks/useSeasonAddForm";
import SeasonDatePicker from "./SeasonDatePicker";

type FieldEditFormProps = ComponentPropsWithoutRef<"form"> & {
  workspaceId: string;
  wrapperClassName?: string;
  onAdd?: () => void;
};

const WorkspaceAddForm = ({
  className,
  wrapperClassName,
  onAdd,
  workspaceId,
  ...props
}: FieldEditFormProps) => {
  const { form, onErrors, onSubmit, isLoading, isSuccess } =
    useSeasonAddForm(workspaceId);

  // Should it be moved to somewhere else?
  useEffect(() => {
    if (isSuccess) {
      onAdd?.();
    }
  }, [isSuccess, onAdd]);

  return (
    <div className={cn("h-full w-full relative", wrapperClassName)}>
      {isLoading && <SpinnerLoader />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
          className={cn("w-full h-full flex flex-col", className)}
          {...props}
        >
          <div className="mb-8 flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Season" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-5">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <SeasonDatePicker />
                      {/* <Input placeholder="Start Date" {...field} /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <SeasonDatePicker />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
