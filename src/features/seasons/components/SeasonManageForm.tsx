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
import SeasonDatePicker from "./SeasonDatePicker";
import { Season } from "../types";
import useSeasonManageForm from "../hooks/useSeasonManageForm";

type FieldEditFormProps = ComponentPropsWithoutRef<"form"> & {
  onUpdateSuccess: () => void;
  onUpdateError: () => void;
  onDeleteSuccess: () => void;
  onDeleteError: () => void;
  seasonToManage: Season;
  wrapperClassName?: string;
};

const SeasonManageForm = ({
  className,
  wrapperClassName,
  onUpdateSuccess,
  onUpdateError,
  onDeleteSuccess,
  onDeleteError,
  seasonToManage,
  ...props
}: FieldEditFormProps) => {
  const { form, onErrors, onSubmit, onDelete, isLoading } = useSeasonManageForm(
    {
      onUpdateSuccess,
      onUpdateError,
      onDeleteSuccess,
      onDeleteError,
      season: seasonToManage,
    }
  );

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
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <SeasonDatePicker
                          onButtonBlur={field.onBlur}
                          onButtonChange={field.onChange}
                          date={field.value}
                          buttonRef={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <SeasonDatePicker
                        onButtonBlur={field.onBlur}
                        onButtonChange={field.onChange}
                        date={field.value}
                        buttonRef={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between">
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

export default SeasonManageForm;
