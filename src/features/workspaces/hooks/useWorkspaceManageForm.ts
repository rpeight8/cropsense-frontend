import { useToast } from "@/components/ui/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useDeleteWorkspace, useUpdateWorkspace } from "../services";

export const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Workspace name must be at least 1 characters.",
  }),
});

const useWorkspaceManageForm = (workspace: z.infer<typeof FormSchema>) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: workspace,
    resolver: zodResolver(FormSchema),
  });

  const {
    isLoading: isUpdating,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
    data: updatedWorkspace,
    ...workspaceSave
  } = useUpdateWorkspace(workspace.id);

  const {
    isLoading: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    data: deletedWorkspace,
    ...workspaceDelete
  } = useDeleteWorkspace(workspace.id);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        variant: "default",
        title: "Success",
        description: "Workspace was updated.",
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
        description: "Workspace was deleted.",
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
    (data: z.infer<typeof FormSchema>) => {
      workspaceSave.mutate(data);
    },
    [workspaceSave]
  );

  const onFormDelete = useCallback(() => {
    workspaceDelete.mutate();
  }, [workspaceDelete]);

  return {
    form,
    onSubmit: onFormSubmit,
    onDelete: onFormDelete,
    onErrors: onFormValidationErrors,
    updatedWorkspace: updatedWorkspace,
    deletedWorkspace: deletedWorkspace,
    isLoading: isUpdating || isDeleting,
    isSuccess: isUpdateSuccess || isDeleteSuccess,
    isError: isUpdateError || isDeleteError,
    error: updateError || deleteError,
  };
};

export default useWorkspaceManageForm;
