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
import { FormSchema } from "@/hooks/useFieldEditForm";

type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  onErrors: (errors: any) => void;
};

const FieldEditForm = ({
  className,
  onSubmit,
  onErrors,
  ...props
}: FormProps) => {
  const navigate = useNavigate();
  const form = useFormContext<z.infer<typeof FormSchema>>();

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
