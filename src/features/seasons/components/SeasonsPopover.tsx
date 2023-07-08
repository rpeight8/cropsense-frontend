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
      <PopoverContent className="w-auto" side="right">
        <div className="flex flex-col">
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
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SeasonsMenu;
