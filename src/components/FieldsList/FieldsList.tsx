import { selectFields } from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";
import List from "@/components/ui/List";
import FieldListItem from "@/components/FieldsList/FieldListItem";

const FieldsList = () => {
  const fields = useAppSelector(selectFields);

  return (
    <List>
      {fields.map((field) => (
        <FieldListItem id={field.id} text={field.text} />
      ))}
    </List>
  );
};

export default FieldsList;
