import SubSideBar from "@/components/SubSideBar";
import Map from "@/components/Map";
import { useEffect } from "react";
import { set, selectFields } from "@/features/fields/fieldsSlice";
import { useAppDispatch, useAppSelector } from "@/store";

export const Fields = () => {
  const dispatch = useAppDispatch();
  const fields = useAppSelector(selectFields);
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
      <SubSideBar className="bg-slate-700 border border-purple-400">
        <ul>
          {fields.map((field) => (
            <li key={field.id}>
              <a href="#">{field.text}</a>
            </li>
          ))}
        </ul>
      </SubSideBar>
      <Map className="flex-1" />
    </>
  );
};
