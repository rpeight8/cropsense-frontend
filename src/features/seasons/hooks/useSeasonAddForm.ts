import { useToast } from "@/components/ui/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSeason } from "../services";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Workspace name must be at least 1 characters.",
  }),
  startDate: z.date(),
  endDate: z.date(),
});

const useSeasonAddForm = (workspaceId: string) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    resolver: zodResolver(FormSchema),
  });

  const {
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
    data: createdSeason,
    ...seasonSave
  } = useCreateSeason(workspaceId);

  useEffect(() => {
    if (isCreateSuccess) {
      toast({
        variant: "default",
        title: "Success",
        description: "Season was created.",
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
      const preparedSeason = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };
      seasonSave.mutate(preparedSeason);
    },
    [seasonSave]
  );

  return {
    form,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
    createdSeason,
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  };
};

export default useSeasonAddForm;
