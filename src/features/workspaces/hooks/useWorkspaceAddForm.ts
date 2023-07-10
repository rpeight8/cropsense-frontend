import { useToast } from "@/components/ui/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateWorkspace } from "../services";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Workspace name must be at least 1 characters.",
  }),
});

const useWorkspaceAddForm = (onSuccess?: () => void, onError?: () => void) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const {
    isLoading: isCreating,
    error: createError,
    ...saveWorskpaceMutation
  } = useCreateWorkspace(onSuccess, onError);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      saveWorskpaceMutation.mutate(data);
    },
    [saveWorskpaceMutation]
  );

  return {
    form,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
    isLoading: isCreating,
    error: createError,
  };
};

export default useWorkspaceAddForm;
