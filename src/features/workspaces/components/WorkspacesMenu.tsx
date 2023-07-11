import { useState } from "react";

import List, { ListItem } from "@/components/ui/List";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectSelectedWorkspaceId,
  setSelectedWorkspaceId,
} from "../workspacesSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Edit } from "lucide-react";
import WorkspaceManageDialog from "./WorkspaceManageDialog";
import WorkspaceAddButton from "./WorkspaceAddButton";
import { Workspace } from "../types";
import WorkspaceAddDialog from "./WorkspaceAddDialog";
import { Skeleton } from "@/components/ui/Skeleton";
import { useWorkspaces } from "../services";

// type WorkspacesMenuProps = ComponentPropsWithoutRef<"div">;

const WorkspacesMenu = () => {
  const { data: workspaces, isLoading } = useWorkspaces();
  const selectedWorkspaceId = useAppSelector(selectSelectedWorkspaceId);
  const dispatch = useAppDispatch();

  const [isManageDialogOpen, setIsManageDialogOpen] = useState<boolean>(false);
  const [managingWorkspace, setManagingWorkspace] = useState<Workspace | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  if (isLoading) {
    return <Skeleton className="w-full h-9" />;
  }

  if (!workspaces) {
    return <WorkspaceAddButton className="w-full" disabled />;
  }

  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id === selectedWorkspaceId
  );

  return (
    <>
      <WorkspaceAddDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
      {(workspaces.length === 0 && (
        <WorkspaceAddButton
          className="w-full"
          onClick={() => {
            setIsAddDialogOpen(true);
          }}
        />
      )) || (
        <Popover>
          {managingWorkspace && (
            <WorkspaceManageDialog
              isOpen={isManageDialogOpen}
              setIsOpen={setIsManageDialogOpen}
              workspaceToManage={managingWorkspace}
            />
          )}

          <PopoverTrigger asChild>
            <Button variant="ghost"> {selectedWorkspace?.name}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" side="right">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Workspaces</h4>
              <p className="text-sm text-muted-foreground">
                Manage your workspaces .
              </p>
            </div>
            <List>
              {workspaces.map((workspace) => (
                <ListItem
                  key={workspace.id}
                  selected={workspace.id === selectedWorkspaceId}
                  className={cn(
                    "w-auto h-12 flex items-center justify-between px-2 rounded-md"
                  )}
                  onClick={() => {
                    dispatch(setSelectedWorkspaceId(workspace.id));
                  }}
                >
                  <div className="w-full flex items-start justify-between">
                    <Button variant="link" className="pl-0">
                      {workspace.name}
                    </Button>
                    <Button
                      variant="link"
                      onClick={(e) => {
                        // Prevent the list item from being selected
                        e.stopPropagation();
                        setIsManageDialogOpen(true);
                        setManagingWorkspace({ ...workspace });
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
            <WorkspaceAddButton
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

export default WorkspacesMenu;
