import { Navigate, Outlet } from "react-router-dom";
import NavigationList from "@/components/NavigationList/NavigationList";
import { cn } from "@/lib/utils";
import { memo, useEffect } from "react";
import UserMenu from "@/features/auth/components/UserPopover";
import { Separator } from "@radix-ui/react-separator";
import WorkspacesMenu from "@/features/workspaces/components/WorkspacesPopover";
import {
  useWorkspaceSeasons,
  useWorkspaces,
} from "@/features/workspaces/services";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectSelectedWorkspaceId,
  setSelectedWorkspaceId,
  setWorkspaces,
} from "@/features/workspaces/workspacesSlice";
import SeasonsMenu from "@/features/seasons/components/SeasonsPopover";
import {
  setSeasons,
  setSelectedSeasonId,
} from "@/features/seasons/seasonsSlice";
import useURLParametersParser from "@/hooks/useURLParametersParser";

const CoordinatesLayout = memo(() => {
  const { isCoordinatesValid } = useURLParametersParser();
  const { data: workspaces } = useWorkspaces();
  const selectedWorkspaceId = useAppSelector(selectSelectedWorkspaceId);
  const {
    isLoading: isSeasonsLoading,
    isFetching: isSeasonsFetching,
    data: seasons,
  } = useWorkspaceSeasons(selectedWorkspaceId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!workspaces || !workspaces.length) return;

    dispatch(setWorkspaces(workspaces));
  }, [dispatch, workspaces]);

  useEffect(() => {
    if (!workspaces || !workspaces.length) return;

    if (workspaces.length > 0) {
      dispatch(setSelectedWorkspaceId(workspaces[0].id));
    }
  }, [dispatch, workspaces]);

  useEffect(() => {
    if (!seasons || !seasons.length) return;
    dispatch(setSeasons(seasons));
  }, [dispatch, seasons]);

  useEffect(() => {
    if (!seasons) return;

    if (seasons.length > 0) {
      dispatch(setSelectedSeasonId(seasons[0].id));
    }
  }, [dispatch, seasons, selectedWorkspaceId]);

  if (!isCoordinatesValid) {
    return <Navigate to={`/52.4,31,10/fields`} replace />;
  }

  return (
    <>
      <div className={cn("flex h-full gap-1")}>
        <aside
          className={cn("basis-[200px] font-medium text-lg flex flex-col")}
        >
          <WorkspacesMenu />
          <SeasonsMenu />
          <Separator className="h-0.5 bg-border" />

          <nav className="">
            <NavigationList />
          </nav>

          <UserMenu className="my-4 text-xl" />
        </aside>
        <main className={cn("flex w-full h-full overflow-hidden", {})}>
          <Outlet />
        </main>
      </div>
    </>
  );
});

export default CoordinatesLayout;
