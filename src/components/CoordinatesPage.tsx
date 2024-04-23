import { Navigate, Outlet } from "react-router-dom";
import NavigationList from "@/components/NavigationList";
import { cn } from "@/lib/utils";
import { memo, useEffect } from "react";
import { useWorkspaces } from "@/features/workspaces/services";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectSelectedWorkspaceId,
  setSelectedWorkspaceId,
} from "@/features/workspaces/workspacesSlice";
import SeasonsMenu from "@/features/seasons/components/SeasonsMenu";
import {
  selectSelectedSeasonId,
  setSelectedSeasonId,
} from "@/features/seasons/seasonsSlice";
import useURLParametersParser from "@/hooks/useURLParametersParser";
import { useWorkspaceSeasons } from "@/features/seasons/services";
import WorkspacesMenu from "@/features/workspaces/components/WorkspacesMenu";
import { Separator } from "@radix-ui/react-separator";
import UserMenu from "@/features/auth/components/UserMenu";

const CoordinatesPage = memo(() => {
  const { isCoordinatesValid } = useURLParametersParser();
  const { data: workspaces } = useWorkspaces();
  const selectedWorkspaceId = useAppSelector(selectSelectedWorkspaceId);
  const { data: seasons } = useWorkspaceSeasons(selectedWorkspaceId);
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!workspaces || workspaces.length === 0) {
      dispatch(setSelectedWorkspaceId(null));
      return;
    }

    dispatch(setSelectedWorkspaceId(workspaces[0].id));
  }, [dispatch, workspaces]);

  useEffect(() => {
    if (!seasons || seasons.length === 0) {
      dispatch(setSelectedSeasonId(null));
      return;
    }

    dispatch(setSelectedSeasonId(seasons[0].id));
  }, [dispatch, seasons]);

  if (!isCoordinatesValid) {
    return <Navigate to={`/52.4,31,10/fields`} replace />;
  }

  return (
    <>
      <div className={cn("flex h-full gap-1")}>
        <aside
          className={cn(
            "basis-[200px] font-medium text-lg flex flex-col p-1 gap-y-2"
          )}
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

export default CoordinatesPage;
