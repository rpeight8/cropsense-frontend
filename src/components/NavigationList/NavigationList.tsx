import { Fragment, useCallback } from "react";

import { NavigationListItem } from "@/components/NavigationList/NavigationListItem";
import { Separator } from "@/components/ui/Separator";
import List from "@/components/ui/List";
import { ScrollArea } from "@/components/ui/ScrollArea";

type ListItemDeclaration = {
  text: string;
  link: string;
};

const listItemsDeclaration: ListItemDeclaration[] = [
  {
    text: "Fields",
    link: "/fields",
  },
  {
    text: "Sensors",
    link: "/sensors",
  },
];

const NavigationSideBar = () => {
  const renderItem = useCallback((item: ListItemDeclaration) => {
    return (
      <Fragment key={item.text}>
        <NavigationListItem {...item} />
        <Separator className="bg-slate-400" />
      </Fragment>
    );
  }, []);
  return (
    <ScrollArea className="h-full">
      <List items={listItemsDeclaration} renderItem={renderItem}></List>
    </ScrollArea>
  );
};

export default NavigationSideBar;
