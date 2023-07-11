import { Navigate, Outlet } from "react-router-dom";
import NavigationList from "@/components/NavigationList";
import { cn } from "@/lib/utils";
import { memo, useEffect } from "react";
import UserMenu from "@/features/auth/components/UserMenu";
import { Separator } from "@radix-ui/react-separator";
import WorkspacesMenu from "@/features/workspaces/components/WorkspacesMenu";
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
import RootAsideContent from "./RootAsideContent";

const CoordinatesLayout = memo(() => {
  const {
    isCoordinatesValid,
    isWorkspaceIdValid,
    isSeasonIdValid,
    isFieldsParamsValid,
  } = useURLParametersParser();

  if (
    !isCoordinatesValid ||
    !isWorkspaceIdValid ||
    !isSeasonIdValid ||
    !isFieldsParamsValid
  ) {
    return <Navigate to={`/52.4,31,10`} replace />;
  }

  return (
    <>
      <div className={cn("flex h-full gap-1")}>
        <aside
          className={cn(
            "basis-[200px] font-medium text-lg flex flex-col p-1 gap-y-2"
          )}
        >
          <RootAsideContent />
        </aside>
        <main className={cn("flex w-full h-full overflow-hidden", {})}>
          <Outlet />
        </main>
      </div>
    </>
  );
});

export default CoordinatesLayout;
