import FieldsList from "@/features/fields/components/FieldsList/FieldsList";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { useAppSelector } from "@/store";
import { selectFields } from "@/features/fields/fieldsSlice";
import FieldAddButton from "@/features/fields/components/FieldAddButton";
import FieldAddForm from "@/features/fields/components/FieldAddForm";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type FieldsSideBarProps = ComponentPropsWithoutRef<"aside">;

const FieldsSideBar = ({ className }: FieldsSideBarProps) => {
  const { action } = useURLParametersParser();

  return (
    <aside className={cn("flex flex-col", className)}>
      {action === "add" ? (
        <FieldAddForm />
      ) : (
        <>
          <FieldsList /> <FieldAddButton />
        </>
      )}
    </aside>
  );
};

export default FieldsSideBar;
