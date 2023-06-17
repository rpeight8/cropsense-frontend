import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

const FormSchema = z.object({
  fieldname: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
});

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const FieldAddForm = ({ className, ...props }: FormProps) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full h-full flex flex-col", className)}
        {...props}
      >
        <div className="mb-auto">
          <FormField
            control={form.control}
            name="fieldname"
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

export default FieldAddForm;
