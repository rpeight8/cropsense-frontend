import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";
import { SigninFormSchema } from "../schemas";
import { useCallback } from "react";

const useSigninForm = () => {
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: zodResolver(SigninFormSchema),
  });

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof SigninFormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback((data: z.infer<typeof SigninFormSchema>) => {
    try {
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return {
    form,
    onFormSubmit,
    onFormError: onFormValidationErrors,
  };
};

export default useSigninForm;
