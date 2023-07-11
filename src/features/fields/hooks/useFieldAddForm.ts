import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import { selectAddFieldGeometry } from "@/features/forms/formsSlice";
import { CropSchema } from "@/features/crops/schemas";
import { useCreateField } from "../services";
import { FieldGeometrySchema } from "../schemas";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  crop: CropSchema.nullable(),
  geometry: FieldGeometrySchema,
});

const useFieldAddForm = (
  seasonsId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const navigate = useNavigate();
  const addFieldGeometry = useAppSelector(selectAddFieldGeometry);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      crop: null,
      geometry: addFieldGeometry,
    },
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    form.setValue("geometry", addFieldGeometry);
  }, [addFieldGeometry, form]);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    []
  );

  const { isLoading, ...createFieldMutation } = useCreateField(
    seasonsId,
    onSuccess,
    onError
  );

  const onFormSubmit = useCallback(
    async (field: z.infer<typeof FormSchema>) => {
      createFieldMutation.mutate(field);
    },
    [createFieldMutation]
  );

  const onFormCancel = useCallback(() => {
    navigate("");
  }, [navigate]);

  return {
    form,
    onCancel: onFormCancel,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
    isLoading,
  };
};

export { useFieldAddForm };
