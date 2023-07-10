import { useToast } from "@/components/ui/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { endOfYear, startOfDay } from "date-fns";
import { z } from "zod";
import { useCreateSeason } from "../services";

export const FormSchema = z
  .object({
    name: z.string().min(1, {
      message: "Workspace name must be at least 1 characters.",
    }),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date must be less than or equal to end date.",
    path: ["startDate"],
  });

const useSeasonAddForm = (workspaceId: string) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      startDate: startOfDay(new Date()),
      endDate: endOfYear(new Date()),
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
      };
      // return;
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
