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

const useWorkspaceAddForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const {
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
    data: createdWorkspace,
    ...workspaceSave
  } = useCreateWorkspace();

  useEffect(() => {
    if (isCreateSuccess) {
      toast({
        variant: "default",
        title: "Success",
        description: "Workspace was created.",
      });
    }
  }, [isCreateSuccess, toast]);

  useEffect(() => {
    if (isCreateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: createError?.message,
      });
    }
  }, [toast, isCreateError, createError?.message]);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      workspaceSave.mutate(data);
    },
    [workspaceSave]
  );

  return {
    form,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
    createdWorkspace,
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  };
};

export default useWorkspaceAddForm;
