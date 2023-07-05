import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";
import { SignInFormSchema } from "../schemas";
import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const useSignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const fromLocation = location.state?.from || { pathname: "/" };

  const { signInWithCredentials } = useAuth();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInFormSchema),
  });

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof SignInFormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    async (credentials: z.infer<typeof SignInFormSchema>) => {
      try {
        setIsLoading(true);
        await signInWithCredentials(credentials);
        navigate(fromLocation);
      } catch (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Error",
          description: err instanceof Error ? err.message : "Error signing in",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, signInWithCredentials, toast]
  );

  return {
    form,
    onFormSubmit,
    onFormError: onFormValidationErrors,
    isLoading,
  };
};

export default useSignInForm;
