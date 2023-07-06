import { Fragment, useCallback } from "react";

import { Separator } from "@/components/ui/Separator";
import List from "@/components/ui/List";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Link, NavLink } from "react-router-dom";
import { ItemText } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

type ListItemDeclaration = {
  text: string;
  link: string;
};

type NavigationListProps = {
  items: ListItemDeclaration[];
};

const NavigationList = ({ items }: NavigationListProps) => {
  return (
    <ScrollArea className="h-full">
      <List>
        {items.map((item) => (
          <li key={item.text} className="flex">
            <NavLink
              to={`${item.link}`}
              className={({ isActive }) => {
                return cn("flex-1 p-2 hover:bg-secondary/20", {
                  "bg-secondary/70": isActive,
                  "hover:bg-secondary/70": isActive,
                });
              }}
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </List>
    </ScrollArea>
  );
};

export default NavigationList;
