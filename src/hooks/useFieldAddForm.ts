import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast/useToast";
import { z } from "zod";

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
});

const useFieldAddForm = () => {
  const { toast } = useToast();
  const onErrors = (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
    if ("coordinates" in errors) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Field should be created with at least 3 coordinates.",
      });
    }
  };
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return {
    fieldAddForm: useForm<z.infer<typeof FormSchema>>({
      defaultValues: {
        name: "",
        coordinates: [],
      },
      resolver: zodResolver(FormSchema),
    }),
    onSubmit,
    onErrors,
    FormProvider,
  };
};

export { useFieldAddForm };
