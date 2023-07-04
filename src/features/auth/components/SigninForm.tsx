import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import useSigninForm from "../hooks/useSigninForm";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type SigninFormProps = ComponentPropsWithoutRef<"form">;

const SigninForm = ({ className }: SigninFormProps) => {
  const { form, onFormSubmit, onFormError } = useSigninForm();

  return (
    <div className="h-full relative">
      <Form {...form}>
        <form
          className={cn("w-full h-full flex flex-col", className)}
          onSubmit={form.handleSubmit(onFormSubmit, onFormError)}
        >
          <div className="mb-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <Button type="submit" variant="secondary" className="bg-accent-2">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SigninForm;
