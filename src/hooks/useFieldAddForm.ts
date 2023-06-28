import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FormProvider, set, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";
import { useMutateNewField } from "@/services/fields";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CropSchema } from "@/schemas/crop";
import { FieldGeometrySchema } from "@/schemas/field";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectNewLocalFieldGeometry,
  setNewLocalFieldGeometry,
} from "@/features/fields/fieldsSlice";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  geometry: FieldGeometrySchema,
  crop: CropSchema.optional(),
});

const useFieldAddForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const newLocalFieldGeometry = useAppSelector(selectNewLocalFieldGeometry);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      geometry: {
        type: "Polygon",
        coordinates: [],
      },
      crop: {},
    },
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (newLocalFieldGeometry) {
      dispatch(setNewLocalFieldGeometry(undefined));
    }
  }, [dispatch, newLocalFieldGeometry]);

  useEffect(() => {
    if (!newLocalFieldGeometry) {
      return;
    }
    form.setValue("geometry", newLocalFieldGeometry, {
      shouldValidate: true,
    });
  }, [
    form,
    newLocalFieldGeometry,
    newLocalFieldGeometry?.coordinates,
    newLocalFieldGeometry?.type,
  ]);

  const onMutateSuccess = useCallback(
    (respData: typeof data) => {
      toast({
        variant: "default",
        title: "Success",
        description: "Field was successfully created.",
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

  const { isLoading, isSuccess, isError, error, data, ...newFieldMutation } =
    useMutateNewField(onMutateSuccess, onMutateError);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      if ("geometry" in errors) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Valid field needs to be selected.",
        });
      }
    },
    [toast]
  );

  const onFormSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      const newField = {
        ...data,
        color: "pink",
      };
      newFieldMutation.mutate(newField);
    },
    [newFieldMutation]
  );

  const onFormCancel = useCallback(() => {
    form.reset();
    navigate(-1);
  }, [form, navigate]);

  return {
    form,
    onCancel: onFormCancel,
    onSubmit: onFormSubmit,
    onErrors: onFormValidationErrors,
    newField: data,
    error: error,
    isLoading,
    isSuccess,
    isError,
  };
};

export { useFieldAddForm };
