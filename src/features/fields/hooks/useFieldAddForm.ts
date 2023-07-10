import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectAddFieldGeometry } from "@/features/forms/formsSlice";
import { CropSchema } from "@/features/crops/schemas";
import { useAddField } from "../services";
import { FieldGeometrySchema } from "../schemas";
import { selectSelectedSeasonId } from "@/features/seasons/seasonsSlice";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  crop: CropSchema.nullable(),
});

const useFieldAddForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const addFieldGeometry = useAppSelector(selectAddFieldGeometry);
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);
  // const addField = useAppSelector(selectAddField);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      crop: null,
    },
    resolver: zodResolver(FormSchema),
  });

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      console.error(errors);
    },
    [toast]
  );

  const onMutateSuccess = useCallback(
    (respData: typeof data) => {
      toast({
        variant: "default",
        title: "Success",
        description: "Field was successfully created.",
      });
      form.reset();
      navigate("");
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
    useAddField(selectedSeasonId, onMutateSuccess, onMutateError);

  const onFormSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        const newField = {
          ...data,
          geometry: await FieldGeometrySchema.parseAsync(addFieldGeometry),
        };

        newFieldMutation.mutate(newField);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Valid field needs to be selected.",
        });
        return;
      }
    },
    [addFieldGeometry, newFieldMutation, toast]
  );

  const onFormCancel = useCallback(() => {
    form.reset();
    navigate("");
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
