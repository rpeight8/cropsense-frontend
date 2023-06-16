import { selectFields } from "@/features/fields/fieldsSlice";
import { useAppSelector } from "@/store";
import List from "@/components/ui/List";
import FieldListItem from "@/components/FieldsList/FieldListItem";
import { ComponentPropsWithoutRef } from "react";

type FieldListProps = ComponentPropsWithoutRef<"ul">;

const FieldsList = ({ className, ...props }: FieldListProps) => {
  const fields = useAppSelector(selectFields);

  return (
    <List className={className} {...props}>
      {fields.map((field) => (
        <FieldListItem id={field.id} text={field.text} />
      ))}
    </List>
  );
};

export default FieldsList;
