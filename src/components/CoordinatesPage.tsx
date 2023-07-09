import { Navigate, Outlet } from "react-router-dom";
import NavigationList from "@/components/NavigationList";
import { cn } from "@/lib/utils";
import { memo, useEffect } from "react";
import UserMenu from "@/features/auth/components/UserMenu";
import { Separator } from "@radix-ui/react-separator";
import WorkspacesMenu from "@/features/workspaces/components/WorkspacesMenu";
import {
  useWorkspaceSeasons,
  useWorkspaces,
} from "@/features/workspaces/services";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectSelectedWorkspaceId,
  selectWorkspaces,
  setSelectedWorkspaceId,
  setWorkspaces,
} from "@/features/workspaces/workspacesSlice";
import SeasonsMenu from "@/features/seasons/components/SeasonsMenu";
import {
  selectSeasons,
  selectSelectedSeasonId,
  setSeasons,
  setSelectedSeasonId,
} from "@/features/seasons/seasonsSlice";
import useURLParametersParser from "@/hooks/useURLParametersParser";

const CoordinatesLayout = memo(() => {
  const { isCoordinatesValid } = useURLParametersParser();
  const { isLoading: isWorkspacesLoading, data: responseWorkspaces } =
    useWorkspaces();
  const selectedWorkspaceId = useAppSelector(selectSelectedWorkspaceId);
  const storedWorkspaces = useAppSelector(selectWorkspaces);
  const {
    isLoading: isSeasonsLoading,
    isFetching: isSeasonsFetching,
    data: responseSeasons,
  } = useWorkspaceSeasons(selectedWorkspaceId);
  const storedSeasons = useAppSelector(selectSeasons);
  const selectedSeasonId = useAppSelector(selectSelectedSeasonId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!responseWorkspaces || !responseWorkspaces.length) {
      dispatch(setWorkspaces([]));
      return;
    }

    dispatch(setWorkspaces(responseWorkspaces));
  }, [dispatch, responseWorkspaces]);

  useEffect(() => {
    if (!storedWorkspaces || !storedWorkspaces.length) {
      if (selectedWorkspaceId) dispatch(setSelectedWorkspaceId(null));
      return;
    }

    if (
      storedWorkspaces.some((workspace) => workspace.id === selectedWorkspaceId)
    )
      return;

    dispatch(setSelectedWorkspaceId(storedWorkspaces[0].id));
  }, [dispatch, storedWorkspaces, selectedWorkspaceId]);

  useEffect(() => {
    if (!responseSeasons || !responseSeasons.length) {
      dispatch(setSeasons([]));
      return;
    }

    dispatch(setSeasons(responseSeasons));
  }, [dispatch, responseSeasons]);

  useEffect(() => {
    if (!responseSeasons || !responseSeasons.length) {
      if (selectedSeasonId) setSelectedSeasonId(null);
      return;
    }

    if (storedSeasons.some((season) => season.id === selectedSeasonId)) return;

    dispatch(setSelectedSeasonId(responseSeasons[0].id));
  }, [
    dispatch,
    responseSeasons,
    selectedSeasonId,
    selectedWorkspaceId,
    storedSeasons,
  ]);

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
          <WorkspacesMenu isLoading={isWorkspacesLoading} />
          <SeasonsMenu isLoading={isWorkspacesLoading || isSeasonsLoading} />
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
