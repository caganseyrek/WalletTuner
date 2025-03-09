"use client";

import React from "react";

import Link from "next/link";

import { useIsMobile } from "@/hooks/interface/useMobile";

import navigation from "../shared/data/navigation";

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
  useSidebar,
} from "./base/sidebar";
import SettingsDialog from "./data_table/dialogs/SettingsDialog";

const MainSidebar = () => {
  const { setOpen } = useSidebar();
  const isMobile: boolean = useIsMobile();

  React.useEffect(() => setOpen(!isMobile), [isMobile]);

  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <h1 className="text-2xl font-semibold tracking-tighter px-2 pt-2">WalletTuner</h1>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.key}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton asChild>
                      <Link href={item.key} target={section.key === "externals" ? "_blank" : "_self"}>
                        <item.icon /> <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-start max-w-[12.25rem]">
          <span className="text-sm font-semibold max-w-[12.25rem] truncate">Çağan Seyrek</span>
          <span className="text-xs text-muted-foreground max-w-[12.25rem] truncate">caganseyrek@outlook.com.tr</span>
        </div>
        <SettingsDialog />
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
