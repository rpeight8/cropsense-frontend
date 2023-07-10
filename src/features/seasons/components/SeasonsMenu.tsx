import { ComponentPropsWithoutRef, useState } from "react";
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
import SeasonAddButton from "./SeasonAddButton";
import { Skeleton } from "@/components/ui/Skeleton";
import { selectSelectedWorkspaceId } from "@/features/workspaces/workspacesSlice";
import { Season } from "../types";
import SeasonAddDialog from "./SeasonAddDialog";
import SeasonManageDialog from "./SeasonManageDialog";

type SeasonMenuProps = ComponentPropsWithoutRef<"div"> & {
  isLoading?: boolean;
};

const SeasonsMenu = ({ className, isLoading, ...props }: SeasonMenuProps) => {
  const seasons = useAppSelector(selectSeasons);
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);
  const selectedWorkspaceId = useAppSelector(selectSelectedWorkspaceId);
  const dispatch = useAppDispatch();

  const [isManageDialogOpen, setIsManageDialogOpen] = useState<boolean>(false);
  const [managingSeason, setManagingSeason] = useState<Season | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  if (isLoading) {
    return <Skeleton className="w-full h-9" />;
  }

  if (!selectedWorkspaceId) {
    return <SeasonAddButton className="w-full" disabled />;
  }

  const selectedSeason = seasons.find(
    (season) => season.id === selectedSeasonId
  );

  return (
    <>
      <SeasonAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        addToWorkspaceId={selectedWorkspaceId}
      />
      {((!seasons || seasons.length === 0) && (
        <SeasonAddButton
          className="w-full"
          onClick={() => {
            setIsAddDialogOpen(true);
          }}
        />
      )) || (
        <Popover>
          {managingSeason && (
            <SeasonManageDialog
              seasonToManage={managingSeason}
              isOpen={isManageDialogOpen}
              setIsOpen={setIsManageDialogOpen}
            />
          )}
          <PopoverTrigger asChild>
            <Button variant="ghost"> {selectedSeason?.name}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" side="right">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Seasons</h4>
              <p className="text-sm text-muted-foreground">
                Manage your seasons.
              </p>
            </div>
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
                        // Prevent the list item from being selected
                        e.stopPropagation();
                        setIsManageDialogOpen(true);
                        setManagingSeason({ ...season });
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>

            <SeasonAddButton
              className="w-full"
              onClick={() => {
                setIsAddDialogOpen(true);
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default SeasonsMenu;
