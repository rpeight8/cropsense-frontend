import { useToast } from "@/components/ui/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useDeleteSeason, useUpdateSeason } from "../services";
import { on } from "events";
import { Season } from "../types";

export const FormSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  name: z.string().min(1, {
    message: "Workspace name must be at least 1 characters.",
  }),
});

type UseWorkspaceManageFormProps = {
  season: Season;
  onDeleteSuccess?: () => void;
  onDeleteError?: () => void;
  onUpdateSuccess?: () => void;
  onUpdateError?: () => void;
};

const useSeasonManageForm = ({
  season,
  onDeleteError,
  onDeleteSuccess,
  onUpdateError,
  onUpdateSuccess,
}: UseWorkspaceManageFormProps) => {
  const preparedSeason = {
    ...season,
    startDate: new Date(season.startDate),
    endDate: new Date(season.endDate),
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: preparedSeason,
    resolver: zodResolver(FormSchema),
  });

  const { isLoading: isUpdateLoading, ...updateSeasonMutation } =
    useUpdateSeason(season.workspaceId, onUpdateSuccess, onUpdateError);

  const { isLoading: isDeleteLoading, ...deleteSeasonMutation } =
    useDeleteSeason(season.workspaceId, onDeleteSuccess, onDeleteError);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    (season: z.infer<typeof FormSchema>) => {
      updateSeasonMutation.mutate({
        season: season,
        seasonId: season.id,
      });
    },
    [updateSeasonMutation]
  );

  const onFormDelete = useCallback(() => {
    deleteSeasonMutation.mutate(season.id);
  }, [season.id, deleteSeasonMutation]);

  return {
    form,
    onSubmit: onFormSubmit,
    onDelete: onFormDelete,
    onErrors: onFormValidationErrors,
    isLoading: isUpdateLoading || isDeleteLoading,
  };
};

export default useSeasonManageForm;
