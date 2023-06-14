import { ComponentPropsWithoutRef, Fragment } from "react";
import { NavigationListItem } from "./NavigationListItem";
import { Separator } from "@/components/ui/Separator";
import List from "@/components/ui/List";

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
  const listItems = listItemsDeclaration.map((item) => {
    return (
      <Fragment key={item.text}>
        <NavigationListItem {...item} />
        <Separator className="bg-slate-400" />
      </Fragment>
    );
  });

  return <List>{listItems}</List>;
};

export default NavigationSideBar;
