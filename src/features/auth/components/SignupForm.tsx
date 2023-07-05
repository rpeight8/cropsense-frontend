import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import useSignUpForm from "../hooks/useSignUpForm";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type SignUpFormProps = ComponentPropsWithoutRef<"form">;

const SignUpForm = ({ className }: SignUpFormProps) => {
  const { form, onFormSubmit, onFormError } = useSignUpForm();

  return (
    <div className="h-full relative text-white">
      <Form {...form}>
        <form
          className={cn("w-full h-full flex flex-col gap-y-5", className)}
          onSubmit={form.handleSubmit(onFormSubmit, onFormError)}
        >
          <div className="mb-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
            <Button
              type="submit"
              variant="secondary"
              className="bg-accent-2 flex-1"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
