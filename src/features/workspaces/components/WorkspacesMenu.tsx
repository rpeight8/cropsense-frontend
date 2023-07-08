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
  selectSelectedWorkspaceId,
  selectWorkspace,
  setSelectedWorkspaceId,
} from "../workspacesSlice";

const WorkspacesMenu = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  const workspaces = useAppSelector(selectWorkspace);
  const selectedWorkspaceId = useAppSelector(selectSelectedWorkspaceId);
  const dispatch = useAppDispatch();

  return (
    <div className={cn(className)} {...props}>
      <NavigationMenu orientation="vertical" placement="bottom">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger placement="bottom" className="text-lg">
              {
                workspaces.find(
                  (workspace) => workspace.id === selectedWorkspaceId
                )?.name
              }
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-5">
              <List className="space-y-2">
                <ListItem>
                  {workspaces.map((workspace) => (
                    <Button
                      variant="link"
                      key={workspace.id}
                      className="w-[100px]"
                      onClick={() => {
                        dispatch(setSelectedWorkspaceId(workspace.id));
                      }}
                    >
                      {workspace.name}
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

export default WorkspacesMenu;
