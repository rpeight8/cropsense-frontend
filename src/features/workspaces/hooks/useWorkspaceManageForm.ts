import { useToast } from "@/components/ui/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useDeleteWorkspace, useUpdateWorkspace } from "../services";
import { on } from "events";

export const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Workspace name must be at least 1 characters.",
  }),
});

type UseWorkspaceManageFormProps = {
  workspace: z.infer<typeof FormSchema>;
  onDeleteSuccess?: () => void;
  onDeleteError?: () => void;
  onUpdateSuccess?: () => void;
  onUpdateError?: () => void;
};

const useWorkspaceManageForm = ({
  workspace,
  onDeleteError,
  onDeleteSuccess,
  onUpdateError,
  onUpdateSuccess,
}: UseWorkspaceManageFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: workspace,
    resolver: zodResolver(FormSchema),
  });

  const { isLoading: isUpdateLoading, ...updateWorkspaceMutation } =
    useUpdateWorkspace(onUpdateSuccess, onUpdateError);

  const { isLoading: isDeleteLoading, ...deleteWorkspaceMutation } =
    useDeleteWorkspace(onDeleteSuccess, onDeleteError);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    (workspace: z.infer<typeof FormSchema>) => {
      updateWorkspaceMutation.mutate({ workspace, workspaceId: workspace.id });
    },
    [updateWorkspaceMutation]
  );

  const onFormDelete = useCallback(() => {
    deleteWorkspaceMutation.mutate(workspace.id);
  }, [deleteWorkspaceMutation, workspace.id]);

  return {
    form,
    onSubmit: onFormSubmit,
    onDelete: onFormDelete,
    onErrors: onFormValidationErrors,
    isLoading: isUpdateLoading || isDeleteLoading,
  };
};

export default useWorkspaceManageForm;
