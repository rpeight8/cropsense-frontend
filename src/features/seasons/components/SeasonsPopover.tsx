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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Edit, Plus } from "lucide-react";

const SeasonsMenu = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  const seasons = useAppSelector(selectSeasons);
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);
  const dispatch = useAppDispatch();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          {" "}
          {seasons.find((season) => season.id === selectedSeasonId)?.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" side="right">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Seasons</h4>
          <p className="text-sm text-muted-foreground">Manage your seasons.</p>
        </div>
        {/* <div className="grid gap-4"> */}
        <List>
          {seasons.map((season) => (
            <ListItem
              key={season.id}
              selected={season.id === selectedSeasonId}
              className={cn(
                "w-auto h-12 flex items-center justify-between px-2 rounded-md"
              )}
              onClick={() => {
                dispatch(setSelectedSeasonId(season.id));
              }}
            >
              <div className="w-full flex items-start justify-between">
                <Button variant="link" className="pl-0">
                  {season.name}
                </Button>
                <Button
                  variant="link"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Edit size={16} />
                </Button>
              </div>
            </ListItem>
          ))}
        </List>

        <Button variant="default" className="w-full">
          <Plus className="h-4 w-4 mr-1" />
          Add season
        </Button>
        {/* </div> */}
      </PopoverContent>
    </Popover>
  );
};

export default SeasonsMenu;
