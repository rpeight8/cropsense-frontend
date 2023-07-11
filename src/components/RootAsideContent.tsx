import { useWorkspaceSeasons } from "@/features/seasons/services";
import WorkspacesMenu from "@/features/workspaces/components/WorkspacesMenu";
import { useWorkspaces } from "@/features/workspaces/services";
import useURLParametersParser from "@/hooks/useURLParametersParser";

const RootAsideContent = () => {
  const { workspaceId } = useURLParametersParser();

  const { data: workspaces } = useWorkspaces();

  return (
    <>
      <WorkspacesMenu />
      <SeasonsMenu />
      <Separator className="h-0.5 bg-border" />

      <nav className="">
        <NavigationList />
      </nav>

      <UserMenu className="my-4 text-xl" />
    </>
  );
};

export default RootAsideContent;
