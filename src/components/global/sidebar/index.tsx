"use client";

import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../../ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getNotifications, getWorkSpaces } from "@/app/action/workspace";
import { NotificationProps, WorkspaceProps } from "@/type/index.type";
import Modal from "../modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEM } from "@/constant";
import SidebarItem from "./SidebarItem";
import WorkspacePlaceholder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../info-bar";
import Loader from "../loader";
import PaymentButton from "../payment-button";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const onChangeActiveWorkspace = (value: string) => {
    router.prefetch(`/dashboard/${value}`);
    router.push(`/dashboard/${value}`);
  };

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: notification } = useQueryData(
    ["user-notification"],
    getNotifications
  );

  const data1 = data as WorkspaceProps;
  const { data: count } = notification as NotificationProps;

  const currentWorkspace = data1?.data?.workspace?.find(
    (w) => w.id === activeWorkspaceId
  );

  const menuItem = MENU_ITEM(activeWorkspaceId);

  const sidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div
        className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-3 absolute top-0 left-0 right-0"
        onClick={() => router.push(`/dashboard/${activeWorkspaceId}`)}
        style={{ cursor: "pointer" }}
      >
        <Image alt="logo" src="/opal-logo.svg" width={40} height={40} />
        <p className="text-2xl">Opal</p>
      </div>
      <Select value={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace" />
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel className="text-white">Workspaces</SelectLabel>
            <Separator />
            {data1?.data?.workspace?.map((workspace) => (
              <SelectItem
                value={workspace.id}
                key={workspace.id}
                className="text-slate-300"
              >
                {workspace.name}
              </SelectItem>
            ))}
            {data1?.data?.members.length > 0 &&
              data1.data.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === "PUBLIC" &&
        data1?.data?.subscription?.plan === "PRO" && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Workspace
                </span>
              </span>
            }
            title="Invite to Workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#9D9D9D] font-bold mt-1.5">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItem?.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              title={item.title}
              selected={pathName === item.href}
              key={item.title}
              notification={
                item.title === "Notifications"
                  ? count._count && count._count.notification
                  : 0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <div className="overflow-y-scroll hide-scrollbar">
        <p className="w-full text-[#9D9D9D] font-bold my-2">Workspaces</p>
        {data1?.data?.workspace.length === 1 &&
          data1?.data?.members.length === 0 && (
            <div className="w-full mt-[-8px]">
              <p className="text-[#3c3c3c] font-medium text-sm">
                {data1?.data?.subscription?.plan === "FREE"
                  ? "Upgrade to create workspaces"
                  : "No Workspaces"}
              </p>
            </div>
          )}
        <nav className="w-full">
          <ul className={`${data1?.data?.subscription?.plan === "FREE" ? 'h-[160px]' : 'h-[180px]'} overflow-auto overflow-x-hidden fade-layer scrollbar-thin`}>
            {data1.data?.workspace.length > 0 &&
              data1.data?.workspace.map(
                (item) =>
                  item.type !== "PERSONAL" && (
                    <SidebarItem
                      href={`/dashboard/${item.id}`}
                      selected={pathName === `/dashboard/${item.id}`}
                      title={item.name}
                      notification={0}
                      key={item.name}
                      icon={
                        <WorkspacePlaceholder>
                          {item.name.charAt(0)}
                        </WorkspacePlaceholder>
                      }
                    />
                  )
              )}
            {data1.data?.members.length > 0 &&
              data1.data?.members.map((item) => (
                <SidebarItem
                  href={`/dashboard/${item.WorkSpace.id}`}
                  selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                  title={item.WorkSpace.name}
                  notification={0}
                  key={item.WorkSpace.name}
                  icon={
                    <WorkspacePlaceholder>
                      {item.WorkSpace.name.charAt(0)}
                    </WorkspacePlaceholder>
                  }
                />
              ))}
          </ul>
        </nav>
        <Separator className="w-4/5" />
        {data1?.data?.subscription?.plan === "FREE" && (
          <GlobalCard
            title="Upgrade to Pro"
            descripition="Unlock AI features like transcription, AI summary, and more."
            footer={<PaymentButton />}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="w-auto">
      <InfoBar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-fit h-full">
            {sidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{sidebarSection}</div>
    </div>
  );
};

export default Sidebar;
