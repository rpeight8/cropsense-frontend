import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";
import { useMutateField } from "@/services/fields";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  coordinates: z.tuple([
    z
      .array(
        z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)])
      )
      .min(4),
    z.array(
      z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)])
    ),
  ]),
  color: z.string(),
  id: z.string(),
});

const useFieldEditForm = (
  field: z.infer<typeof FormSchema> = {
    name: "",
    coordinates: [[], []],
    color: "",
    id: "",
  }
) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: field,
    resolver: zodResolver(FormSchema),
  });

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
      const newField = {
        ...data,
        color: "pink",
      };
      console.log("mutate");
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
