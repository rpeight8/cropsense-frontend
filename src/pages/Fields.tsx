import SubSideBar from "@/components/SubSideBar";
import { Link, useParams } from "react-router-dom";
import Map from "@/components/Map";
import { useEffect } from "react";
import { set, selectFields } from "@/features/fields/fieldsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import FieldsList from "@/components/FieldsList/FieldsList";
import AddFieldButton from "@/components/AddFieldButton";

export const Fields = () => {
  const { id } = useParams();
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
  return (
    <>
      <SubSideBar className="bg-ternary flex">
        <FieldsList className="p-0" />
        <AddFieldButton className="m-2" />
      </SubSideBar>
      <Map className="flex-1" />
    </>
  );
};
