import FieldsList from "@/components/FieldsList/FieldsList";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { useAppSelector } from "@/store";
import { selectFields } from "@/features/fields/fieldsSlice";

const FieldsSideBar = () => {
  const fields = useAppSelector(selectFields);
  
  return (
    <aside>
      <FieldsList />
    </aside>
  );
};
