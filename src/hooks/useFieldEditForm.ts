import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";
import { useMutateField } from "@/services/fields";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CropSchema } from "@/schemas/crop";
import { FieldGeometrySchema } from "@/schemas/field";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectEditFieldGeometry,
  setEditFieldGeometry,
} from "@/features/forms/formsSlice";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  geometry: FieldGeometrySchema,
  crop: CropSchema.nullable(),
  id: z.string(),
});

const useFieldEditForm = (field: z.infer<typeof FormSchema>) => {
  const { toast } = useToast();
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
      try {
        console.log(editFieldGeometry);
        const newField = {
          ...data,
          geometry: FieldGeometrySchema.parse(editFieldGeometry),
        };
        fieldMutation.mutate(newField);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Valid field needs to be selected.",
        });
        return;
      }
    },
    [editFieldGeometry, fieldMutation, toast]
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
