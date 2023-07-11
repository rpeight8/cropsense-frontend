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
import { CropSchema } from "@/features/crops/schemas";
import { useUpdateField } from "../services";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  geometry: FieldGeometrySchema,
  seasonId: z.string(),
  crop: CropSchema.nullable(),
  id: z.string(),
});

type UseFieldEditFormProps = {
  field: z.infer<typeof FormSchema>;
  onSuccess?: () => void;
  onError?: () => void;
};

const useFieldEditForm = ({
  field,
  onSuccess,
  onError,
}: UseFieldEditFormProps) => {
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

  const { isLoading, ...updateFieldMutation } = useUpdateField(
    field.seasonId,
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

  const onFormCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    form,
    isLoading,
    onCancel: onFormCancel,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
  };
};

export { useFieldEditForm };
