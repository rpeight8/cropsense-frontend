import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  resetAddField,
  selectAddFieldGeometry,
} from "@/features/forms/formsSlice";
import { useCreateField } from "../services";
import { FieldGeometrySchema } from "../schemas";
import { v1 as uuidv1 } from "uuid";
import { useToast } from "@/components/ui/Toast/useToast";
import { AddFormSchema as FormSchema } from "@/features/fields/schemas";

const useFieldAddForm = (
  seasonsId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const addFieldGeometry = useAppSelector(selectAddFieldGeometry);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAddField());
  }, [dispatch]);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      cropRotations: [
        {
          _key: uuidv1(),
          cropId: null,
          cropPlantingDate: null,
          cropHarvestDate: null,
        },
      ],
      geometry: addFieldGeometry,
    },
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    form.setValue("geometry", addFieldGeometry);
  }, [addFieldGeometry, form]);

  const onFormValidationErrors = useCallback(
    (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
      if (errors.geometry) {
        toast({
          title: "Geometry is invalid.",
          description: "Please draw a valid geometry.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const { isLoading, ...createFieldMutation } = useCreateField(
    seasonsId,
    onSuccess,
    onError
  );

  const onFormSubmit = useCallback(
    async (field: z.infer<typeof FormSchema>) => {
      const fieldForCreate = {
        name: field.name,
        cropRotations: field.cropRotations
          .filter((cropRotation) => cropRotation.cropId !== null)
          .map((cropRotation) => ({
            // TODO: Add typeguard to previous .filter call to ensure TS that cropPlantingDate and cropHarvestDate are not null
            cropId: cropRotation.cropId!,
            startDate: cropRotation.cropPlantingDate!.toISOString(),
            endDate: cropRotation.cropHarvestDate!.toISOString(),
          })),
        geometry: field.geometry,
      };
      createFieldMutation.mutate(fieldForCreate);
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
