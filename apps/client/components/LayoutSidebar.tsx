"use client";

import React, { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

import Link from "next/link";

import {
  BadgeEuro,
  BookText,
  ChartArea,
  ChevronUp,
  CircleUserRound,
  CodeXml,
  FileJson2,
  LogOut,
  LucideProps,
  MessageSquareMore,
  NotebookTabs,
  Settings,
} from "lucide-react";

import useLogoutMutation from "@/hooks/user/useLogoutMutation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../packages/interface/src/components/base/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../packages/interface/src/components/base/sidebar";
import Icon from "./Icon";

const menuLinks: {
  key: string;
  title: string;
  items: {
    key: string;
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  }[];
}[] = [
  {
    key: "sidebar_application",
    title: "Application",
    items: [
      {
        key: "sidebar_application_accounts",
        title: "Accounts",
        url: "/app/accounts",
        icon: NotebookTabs,
      },
      {
        key: "sidebar_application_transactions",
        title: "Transactions",
        url: "/app/transactions",
        icon: BadgeEuro,
      },
      {
        key: "sidebar_application_graphs",
        title: "Graphs",
        url: "/app/graphs",
        icon: ChartArea,
      },
    ],
  },
  {
    key: "sidebar_user",
    title: "User",
    items: [
      {
        key: "sidebar_user_details",
        title: "User Details",
        url: "/app/user",
        icon: CircleUserRound,
      },
      {
        key: "sidebar_user_settings",
        title: "Settings",
        url: "/app/settings",
        icon: Settings,
      },
    ],
  },
  {
    key: "sidebar_external",
    title: "External",
    items: [
      {
        key: "sidebar_external_docs",
        title: "Documentation",
        url: "/docs",
        icon: BookText,
      },
      {
        key: "sidebar_external_dev_docs",
        title: "Developer Docs",
        url: "/docs/developers",
        icon: FileJson2,
      },
      {
        key: "sidebar_external_repo",
        title: "Repository",
        url: "https://github.com/caganseyrek/WalletTuner",
        icon: CodeXml,
      },
      {
        key: "sidebar_external_feedback",
        title: "Feedback",
        url: "https://github.com/caganseyrek/WalletTuner/issues",
        icon: MessageSquareMore,
      },
    ],
  },
];

const LayoutSidebar = () => {
  const logout = useLogoutMutation();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-start gap-2 px-4 pt-3">
        <Icon className="w-[28px]" />
        <h1 className="text-xl font-semibold tracking-tight">WalletTuner</h1>
      </SidebarHeader>
      <SidebarContent>
        {menuLinks.map((section) => (
          <SidebarGroup key={section.key}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} target={section.title === "External" ? "_blank" : "_self"}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto">
                  <div className="flex flex-col">
                    <b>Çağan Seyrek</b>
                    <span>caganseyrek@outlook.com.tr</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem onClick={() => logout.mutateAsync()}>
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default LayoutSidebar;
