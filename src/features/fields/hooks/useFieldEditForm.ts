import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
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
import { useEditField } from "../services";
import { selectSelectedSeasonId } from "@/features/seasons/seasonsSlice";

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
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);

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
    useEditField(field.id, selectedSeasonId, onMutateSuccess, onMutateError);

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
    async (data: z.infer<typeof FormSchema>) => {
      try {
        console.log(editFieldGeometry);
        const newField = {
          ...data,
          geometry: await FieldGeometrySchema.parseAsync(editFieldGeometry),
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
