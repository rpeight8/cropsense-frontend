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
import { CropRotationSchema, CropSchema } from "@/features/crops/schemas";
import { useCreateField } from "../services";
import { FieldGeometrySchema } from "../schemas";

export const FormSchema = z
  .object({
    name: z.string().min(1, {
      message: "Field name must be at least 1 characters.",
    }),
    cropId: z.string().nullable(),
    cropPlantingDate: z.date().nullable(),
    cropHarvestDate: z.date().nullable(),
    geometry: FieldGeometrySchema,
  })
  .refine(
    (data) => {
      debugger;
      if (!data.cropId) return true;
      if (!data.cropPlantingDate) return false;
      return true;
    },
    {
      message: "Start date must be less than or equal to end date.",
      path: ["cropPlantingDate"],
    }
  )
  .refine(
    (data) => {
      if (!data.cropId) return true;
      if (!data.cropHarvestDate) return false;
      return true;
    },
    {
      message: "End date must be greater than or equal to start date.",
      path: ["cropHarvestDate"],
    }
  );

const useFieldAddForm = (
  seasonsId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const navigate = useNavigate();
  const addFieldGeometry = useAppSelector(selectAddFieldGeometry);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAddField());
  }, [dispatch]);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      cropId: null,
      cropPlantingDate: null,
      cropHarvestDate: null,
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
      const fieldForCreate = {
        name: field.name,
        crop:
          (field.cropId && {
            id: field.cropId,
            startDate: field.cropPlantingDate!.toISOString(),
            endDate: field.cropHarvestDate!.toISOString(),
          }) ||
          null,
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
