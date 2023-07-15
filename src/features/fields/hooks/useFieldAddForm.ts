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

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Field name must be at least 1 characters.",
  }),
  cropRotations: z.array(
    z
      .object({
        _key: z.string(),
        cropId: z.string().nullable(),
        cropPlantingDate: z.date().nullable(),
        cropHarvestDate: z.date().nullable(),
      })
      .refine(
        (data) => {
          if (!data.cropId) return true;
          if (!data.cropPlantingDate || !data.cropHarvestDate) return true;
          return data.cropPlantingDate < data.cropHarvestDate;
        },
        {
          message: "Harvest Date must be after Planting Date.",
          path: ["cropHarvestDate"],
        }
      )
      .refine(
        (data) => {
          if (!data.cropId) return true;
          if (!data.cropPlantingDate) return false;
          return true;
        },
        {
          message: "Planting Date must be specified.",
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
          message: "Harvest Date must be specified.",
          path: ["cropHarvestDate"],
        }
      )
  ),

  geometry: FieldGeometrySchema,
});

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
