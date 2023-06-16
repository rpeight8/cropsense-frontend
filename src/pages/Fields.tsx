import SubSideBar from "@/components/SubSideBar";
import { useParams } from "react-router-dom";
import Map from "@/components/Map";
import { useEffect } from "react";
import { set } from "@/features/fields/fieldsSlice";
import { useAppDispatch } from "@/store";
import FieldsList from "@/components/FieldsList/FieldsList";
import FieldAddForm from "@/components/FieldAddForm";
import FieldAddButton from "@/components/FieldAddButton";

export const Fields = () => {
  const { action, id } = useParams();
  console.log(action);
  console.log(id);
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
    default:
      subSideBarContent = (
        <>
          <FieldsList className="p-0" />
          <FieldAddButton className="m-2" />
        </>
      );
      break;
  }

  return (
    <>
      <SubSideBar className="bg-ternary flex">{subSideBarContent}</SubSideBar>
      <Map className="flex-1" />
    </>
  );
};
