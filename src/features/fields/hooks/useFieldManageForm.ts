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
import { v1 as uuidv1 } from "uuid";
import { useDeleteField, useUpdateField } from "../services";
import { Field } from "../types";
import { ManageFormSchema as FormSchema } from "../schemas";

type UseFieldManageFormProps = {
  field: Field;
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

  const fieldForForm = {
    name: field.name,
    id: field.id,
    seasonId: field.seasonId,
    cropRotations: field.cropRotations.map((cropRotation) => ({
      ...cropRotation,
      _key: cropRotation.id || uuidv1(),
    })),
    geometry: field.geometry,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: fieldForForm,
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
          id: field.id,
          name: field.name,
          seasonId: field.seasonId,
          cropRotations: field.cropRotations
            .filter((cropRotation) => cropRotation.cropId !== null)
            .map((cropRotation) => ({
              // TODO: Add typeguard to previous .filter call to ensure TS that cropPlantingDate and cropHarvestDate are not null
              id: cropRotation.id,
              cropId: cropRotation.cropId!,
              startDate: cropRotation.cropPlantingDate!.toISOString(),
              endDate: cropRotation.cropHarvestDate!.toISOString(),
            })),
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
