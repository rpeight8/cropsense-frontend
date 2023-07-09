import { useToast } from "@/components/ui/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useDeleteSeason, useUpdateSeason } from "../services";

export const FormSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  name: z.string().min(1, {
    message: "Workspace name must be at least 1 characters.",
  }),
});

const useSeasonManageForm = (season: z.infer<typeof FormSchema>) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: season,
    resolver: zodResolver(FormSchema),
  });

  const {
    isLoading: isUpdating,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
    data: updatedSeason,
    ...seasonSave
  } = useUpdateSeason(season.id);

  const {
    isLoading: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    data: deletedSeason,
    ...seasonDelete
  } = useDeleteSeason(season.workspaceId);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        variant: "default",
        title: "Success",
        description: "Season was updated.",
      });
    }
  }, [isUpdateSuccess, toast]);

  useEffect(() => {
    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: updateError?.message,
      });
    }
  }, [updateError?.message, isUpdateError, toast]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        variant: "default",
        title: "Success",
        description: "Season was deleted.",
      });
    }
  }, [isDeleteSuccess, toast]);

  useEffect(() => {
    if (isDeleteError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: deleteError?.message,
      });
    }
  }, [deleteError?.message, isDeleteError, toast]);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    (season: z.infer<typeof FormSchema>) => {
      const preparedSeason = {
        ...season,
        startDate: season.startDate.toISOString(),
        endDate: season.endDate.toISOString(),
      };
      seasonSave.mutate({
        season: preparedSeason,
        seasonId: preparedSeason.id,
      });
    },
    [seasonSave]
  );

  const onFormDelete = useCallback(() => {
    seasonDelete.mutate(season.id);
  }, [season.id, seasonDelete]);

  return {
    form,
    onSubmit: onFormSubmit,
    onDelete: onFormDelete,
    onErrors: onFormValidationErrors,
    updatedWorkspace: updatedSeason,
    deletedWorkspace: deletedSeason,
    isLoading: isUpdating || isDeleting,
    isSuccess: isUpdateSuccess || isDeleteSuccess,
    isError: isUpdateError || isDeleteError,
    error: updateError || deleteError,
  };
};

export default useSeasonManageForm;
