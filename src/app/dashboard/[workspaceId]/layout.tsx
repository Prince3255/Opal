import { getUserProfile, onAuthenticateUser } from "@/app/action/user";
import {
  getAllUserVideos,
  getNotifications,
  getWorkspaceFolders,
  getWorkSpaces,
  VerifyAccessToWorkspace,
} from "@/app/action/workspace";
import { redirect } from "next/navigation";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SidebarSuspense from "@/components/global/sidebar/SidebarSuspense";
import GlobalHeader from "@/components/global/global-header";
import VoiceflowAgent from "@/components/global/voiceflow";
import UserProvider from "@/components/global/user-provider";
// import RouteLoading from "@/components/global/route-loading";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { workspaceId }, children }: Props) => {
  const auth = await onAuthenticateUser();

  if (!auth.user?.workspace) {
    redirect("/auth/sign-in");
  }
  if (!auth.user.workspace.length) {
    redirect("/auth/sign-in");
  }

  const hasAccess = await VerifyAccessToWorkspace(workspaceId);
  if (hasAccess?.status !== 200) {
    let user = {
      id: auth.user?.id || null,
      firstname: auth.user?.firstname || null,
      lastname: auth.user?.lastname || null,
      email: auth.user?.email || null,
    };
    const jsonString = JSON.stringify(user);
    const encodeData = encodeURIComponent(jsonString);
    redirect(`/dashboard/${auth.user?.workspace[0].id}?data=${encodeData}`);
  }

  if (!hasAccess?.data?.workspace) return null;

  const query = new QueryClient();

  // Run all queries in parallel for better performance
  await Promise.all([
    query.prefetchQuery({
      queryKey: ["workspace-folder"],
      queryFn: () => getWorkspaceFolders(workspaceId),
    }),
    query.prefetchQuery({
      queryKey: ["user-videos"],
      queryFn: () => getAllUserVideos(workspaceId),
    }),
    query.prefetchQuery({
      queryKey: ["user-workspaces"],
      queryFn: () => getWorkSpaces(),
    }),
    query.prefetchQuery({
      queryKey: ["user-notification"],
      queryFn: () => getNotifications(),
    }),
    query.prefetchQuery({
      queryKey: ["user-profile"],
      queryFn: () => getUserProfile(),
    }),
  ]);

  const userData = {
    id: auth.user?.id || null,
    firstname: auth.user?.firstname || null,
    lastname: auth.user?.lastname || null,
    email: auth.user?.email || null,
    workspaceId: auth.user?.workspace[0]?.id || workspaceId || null,
  };

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <UserProvider user={userData}>
        <div className="flex h-screen w-screen scrollbar-thin">
          <SidebarSuspense activeWorkspaceId={workspaceId} />
          <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
            <GlobalHeader workspace={hasAccess?.data?.workspace} />
            <div className="mt-4">{children}</div>
          </div>
          <VoiceflowAgent
            userId={auth?.user?.id}
            plan={auth?.user?.subscription?.plan || null}
          />
        </div>
      </UserProvider>
    </HydrationBoundary>
  );
};

export default Layout;
