import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "@/store";
import { set } from "@/features/fields/fieldsSlice";

import SubSideBar from "@/components/SubSideBar";
import Map from "@/components/Map";
import FieldsList from "@/components/FieldsList/FieldsList";
import FieldAddForm from "@/components/FieldAddForm";
import FieldAddButton from "@/components/FieldAddButton";
import { FieldAction, FieldCoordinates } from "@/types";

export const Fields = () => {
  const { action = "none", id } = useParams() as {
    action: FieldAction;
    id?: string;
  };
  const [newFieldCoordinates, setNewFieldCoordinates] =
    useState<FieldCoordinates | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/fields`).then((res) => {
      res.json().then((data) => {
        dispatch(set(data.fields));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let subSideBarContent: JSX.Element = <> </>;
  switch (action) {
    case "add":
      subSideBarContent = (
        <>
          <FieldAddForm className="p-2" />
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
      <SubSideBar className="bg-ternary flex">{subSideBarContent}</SubSideBar>
      <Map
        className="flex-1"
        action={action}
        setNewFieldCoordinates={setNewFieldCoordinates}
      />
    </>
  );
};
