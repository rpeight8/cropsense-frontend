import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";
import { SignUpFormSchema } from "../schemas";
import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const useSignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithCredentials } = useAuth();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpFormSchema),
  });

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof SignUpFormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    async (credentials: z.infer<typeof SignUpFormSchema>) => {
      try {
        setIsLoading(true);
        await signUpWithCredentials(credentials);
        navigate("/signin");
      } catch (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Error",
          description: err instanceof Error ? err.message : "Error signing up",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, signUpWithCredentials, toast]
  );

  return {
    form,
    onFormSubmit,
    onFormError: onFormValidationErrors,
    isLoading,
  };
};

export default useSignupForm;
