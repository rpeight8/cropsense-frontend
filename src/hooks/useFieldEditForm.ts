import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";
import { useMutateField } from "@/services/fields";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CropSchema } from "@/schemas/crop";
import { FieldGeometrySchema } from "@/schemas/field";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectEditLocalFieldGeometry,
  setEditLocalFieldGeometry,
} from "@/features/fields/fieldsSlice";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  geometry: FieldGeometrySchema,
  crop: z.string().optional(),
  color: z.string().optional(),
  id: z.string(),
});

const useFieldEditForm = (field: z.infer<typeof FormSchema>) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const editLocalFieldGeometry = useAppSelector(selectEditLocalFieldGeometry);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: field,
    resolver: zodResolver(FormSchema),
  });

  // reset geometry for edit once field changes
  useEffect(() => {
    dispatch(setEditLocalFieldGeometry(field.geometry));
  }, [field.id]);

  // send geometry to form once it's set
  useEffect(() => {
    if (!editLocalFieldGeometry) {
      return;
    }
    form.setValue("geometry", editLocalFieldGeometry, {
      shouldValidate: true,
    });
  }, [form, editLocalFieldGeometry?.coordinates, editLocalFieldGeometry?.type]);

  const onMutateSuccess = useCallback(
    (respData: typeof data) => {
      toast({
        variant: "default",
        title: "Success",
        description: "Field was updated created.",
      });
      form.reset();
      navigate(respData ? `${respData.id}/display` : "/fields");
    },
    [form, navigate, toast]
  );
  const onMutateError = useCallback(
    (respError: typeof error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: respError?.message,
      });
    },
    [toast]
  );

  const { isLoading, isSuccess, isError, error, data, ...fieldMutation } =
    useMutateField(field.id, onMutateSuccess, onMutateError);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      if ("coordinates" in errors) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Field should be created with at least 3 coordinates.",
        });
      }
    },
    [toast]
  );

  const onFormSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      if (!data.id) {
        console.error("Field id is missing");
        return;
      }
      const newField = {
        ...data,
        color: data.color || "",
      };
      fieldMutation.mutate(newField);
    },
    [fieldMutation]
  );

  return {
    form,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
    newField: data,
    error: error,
    isLoading,
    isSuccess,
    isError,
  };
};

export { useFieldEditForm };
