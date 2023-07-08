import { ComponentPropsWithoutRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import List, { ListItem } from "@/components/ui/List";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectSeasons,
  selectSelectedSeasonId,
  setSelectedSeasonId,
} from "../seasonsSlice";

const SeasonsMenu = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  const seasons = useAppSelector(selectSeasons);
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);
  const dispatch = useAppDispatch();

  return (
    <div className={cn(className)} {...props}>
      <NavigationMenu orientation="vertical" placement="bottom">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger placement="bottom" className="text-lg">
              {seasons.find((season) => season.id === selectedSeasonId)?.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-5">
              <List className="space-y-2">
                <ListItem>
                  {seasons.map((season) => (
                    <Button
                      variant="link"
                      key={season.id}
                      className="w-[100px]"
                      onClick={() => {
                        dispatch(setSelectedSeasonId(season.id));
                      }}
                    >
                      {season.name}
                    </Button>
                  ))}
                </ListItem>
              </List>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SeasonsMenu;
