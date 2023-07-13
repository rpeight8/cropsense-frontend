import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FieldGeometrySchema } from "../schemas";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectEditFieldGeometry,
  setEditFieldGeometry,
} from "@/features/forms/formsSlice";
import { CropRotationSchema, CropSchema } from "@/features/crops/schemas";
import { useDeleteField, useUpdateField } from "../services";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  geometry: FieldGeometrySchema,
  seasonId: z.string(),
  crop: CropRotationSchema.nullable(),
  id: z.string(),
});

type UseFieldManageFormProps = {
  field: z.infer<typeof FormSchema>;
  onDeleteSuccess?: () => void;
  onDeleteError?: () => void;
  onUpdateSuccess?: () => void;
  onUpdateError?: () => void;
};

const useFieldManageForm = ({
  field,
  onDeleteError,
  onDeleteSuccess,
  onUpdateError,
  onUpdateSuccess,
}: UseFieldManageFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: field,
    resolver: zodResolver(FormSchema),
  });

  const dispatch = useAppDispatch();
  const editFieldGeometry = useAppSelector(selectEditFieldGeometry);

  useEffect(() => {
    dispatch(setEditFieldGeometry(field.geometry));
  }, [dispatch, field.geometry]);

  const { isLoading: isUpdateLoading, ...updateFieldMutation } = useUpdateField(
    field.seasonId,
    onUpdateSuccess,
    onUpdateError
  );

  const { isLoading: isDeleteLoading, ...deleteFieldMutation } = useDeleteField(
    field.seasonId,
    onDeleteSuccess,
    onDeleteError
  );

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const onFormSubmit = useCallback(
    async (field: z.infer<typeof FormSchema>) => {
      try {
        const preparedField = {
          ...field,
          geometry: await FieldGeometrySchema.parseAsync(editFieldGeometry),
        };
        updateFieldMutation.mutate({
          fieldId: preparedField.id,
          field: preparedField,
        });
      } catch (err) {
        return;
      }
    },
    [editFieldGeometry, updateFieldMutation]
  );

  const onDelete = useCallback(() => {
    deleteFieldMutation.mutate(field.id);
  }, [deleteFieldMutation, field.id]);

  const onFormCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    form,
    onDelete,
    isLoading: isUpdateLoading || isDeleteLoading,
    onCancel: onFormCancel,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
  };
};

export default useFieldManageForm;
