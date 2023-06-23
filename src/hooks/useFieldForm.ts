import { z } from "zod";
import { FieldAction } from "@/types";
import {
  useFieldEditForm,
  FormSchema as FormUpdateSchema,
} from "@hooks/useFieldEditForm";
import { useFieldAddForm } from "@hooks/useFieldAddForm";

// https://github.com/microsoft/TypeScript/issues/44392
// https://github.com/microsoft/TypeScript/issues/1805
// It supposed to be replace for useFieldAddForm() and useFieldEditForm()
function useFieldForm(): undefined;
function useFieldForm(
  action: "edit",
  field: z.infer<typeof FormUpdateSchema> | undefined
): ReturnType<typeof useFieldEditForm>;
function useFieldForm(
  action: "add",
  field?: z.infer<typeof FormUpdateSchema>
): ReturnType<typeof useFieldAddForm>;
function useFieldForm(
  action: Exclude<FieldAction, "add" | "edit">,
  field?: z.infer<typeof FormUpdateSchema>
): undefined;
function useFieldForm(
  action?: FieldAction,
  field?: z.infer<typeof FormUpdateSchema>
) {
  const useFieldAddFormValues = useFieldAddForm();

  const useFieldEditFormValues = useFieldEditForm(field);

  switch (action) {
    case "add":
      return useFieldAddFormValues;
    case "edit":
      return useFieldEditFormValues;
    default:
      return undefined;
  }
}

export default useFieldForm;
