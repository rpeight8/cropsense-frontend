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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

const WorkspacesMenu = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  const workspaces = useAppSelector(selectWorkspace);
  const selectedWorkspaceId = useAppSelector(selectSelectedWorkspaceId);
  const dispatch = useAppDispatch();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          {" "}
          {
            workspaces.find((workspace) => workspace.id === selectedWorkspaceId)
              ?.name
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto" side="right">
        <div className="flex flex-col">
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
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WorkspacesMenu;
