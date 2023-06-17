import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import ListItem from "@/components/ui/List/ListItem";

type NavigationListItemProps = {
  link: string;
  text: string;
} & ComponentPropsWithoutRef<"li">;

const NavigationListItem = ({ link, text }: NavigationListItemProps) => {
  return (
    <ListItem className={cn("text-white flex hover:bg-slate-800")}>
      <Link to={link} className="w-full p-2">
        {text}
      </Link>
    </ListItem>
  );
};

export default NavigationListItem;
