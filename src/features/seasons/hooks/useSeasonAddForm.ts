import { useToast } from "@/components/ui/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { endOfYear, startOfDay } from "date-fns";
import { z } from "zod";
import { useCreateSeason } from "../services";
import { on } from "events";

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

const useSeasonAddForm = (
  workspaceId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      startDate: startOfDay(new Date()),
      endDate: endOfYear(new Date()),
    },
    resolver: zodResolver(FormSchema),
  });

  const { isLoading, ...saveSeasonMutation } = useCreateSeason(
    workspaceId,
    onSuccess,
    onError
  );

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    (season: z.infer<typeof FormSchema>) => {
      saveSeasonMutation.mutate(season);
    },
    [saveSeasonMutation]
  );

  return {
    form,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
    isLoading,
  };
};

export default useSeasonAddForm;
