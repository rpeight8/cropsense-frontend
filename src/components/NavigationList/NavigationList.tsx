import { Fragment, useCallback } from "react";

import { Separator } from "@/components/ui/Separator";
import List from "@/components/ui/List/List";
import NavigationListItem from "@/components/NavigationList/NavigationListItem";
import { ScrollArea } from "@/components/ui/ScrollArea";

type ListItemDeclaration = {
  text: string;
  link: string;
};

type NavigationListProps = {
  items: ListItemDeclaration[];
};

const NavigationList = ({ items }: NavigationListProps) => {
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
      <List items={items} renderItem={renderItem}></List>
    </ScrollArea>
  );
};

export default NavigationList;
