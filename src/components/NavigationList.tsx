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

const navigationItems = [
  {
    text: "Fields",
    link: `fields`,
  },
  {
    text: "Sensors",
    link: `sensors`,
  },
];

const NavigationList = () => {
  return (
    <ScrollArea className="h-full">
      <List>
        {navigationItems.map((item) => (
          <li key={item.text} className="flex">
            <NavLink
              to={`${item.link}`}
              className={({ isActive }) => {
                return cn("flex-1 p-2", {
                  "bg-accent": isActive,
                  "hover:bg-accent": !isActive,
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
