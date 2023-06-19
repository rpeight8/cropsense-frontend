import { useParams, useNavigate } from "react-router-dom";

import SubSideBar from "@/components/SubSideBar";
import Map from "@/components/Map";
import FieldsList from "@/components/FieldsList/FieldsList";
import FieldAddForm from "@/components/FieldAddForm";
import FieldAddButton from "@/components/FieldAddButton";
import { FieldAction, FieldCoordinates } from "@/types";
import { useFieldAddForm } from "@/hooks/useFieldAddForm";
import { useFields } from "@/services/fields";
import { useEffect } from "react";

export const Fields = () => {
  const { action = "none", id } = useParams() as {
    action: FieldAction;
    id?: string;
  };

  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useFields();
  const {
    fieldAddForm,
    FormProvider,
    onSubmit,
    onErrors,
    newField,
    isLoading: isFieldCreating,
    isSuccess: isFieldCreated,
  } = useFieldAddForm();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isFieldCreating) {
    console.log("creating field...");
  }

  let subSideBarContent: JSX.Element = <> </>;
  switch (action) {
    case "add":
      fieldAddForm.register("coordinates", { value: [[], []] });
      subSideBarContent = (
        <>
          <FieldAddForm
            className="p-2"
            onSubmit={onSubmit}
            onErrors={onErrors}
          />
        </>
      );
      break;
    case "display":
      subSideBarContent = (
        <>
          <FieldsList className="p-0" />
          <FieldAddButton className="m-2" />
        </>
      );
      break;
    case "none":
      subSideBarContent = (
        <>
          <FieldsList className="p-0" />
          <FieldAddButton className="m-2" />
        </>
      );
      break;
    default:
      throw new Error(`Unknown action: ${action}`);
  }

  return (
    <>
      <FormProvider {...fieldAddForm}>
        <SubSideBar className="bg-ternary flex">{subSideBarContent}</SubSideBar>
        <Map
          className="flex-1"
          action={action}
          handleNewField={(coordinates: FieldCoordinates) => {
            fieldAddForm.setValue("coordinates", coordinates, {
              shouldValidate: true,
            });
          }}
        />
      </FormProvider>
    </>
  );
};
