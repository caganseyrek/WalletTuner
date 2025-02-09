"use client";

import React from "react";

import { useIsMobile } from "@/hooks/interface/useMobile";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "../base/sidebar";
import SettingsDialog from "../dialogs/SettingsDialog";
import ExternalsMenu from "./partial/ExternalsMenu";
import ResourcesMenu from "./partial/ResourcesMenu";

const MainSidebar = () => {
  const { setOpen } = useSidebar();
  const isMobile: boolean = useIsMobile();

  React.useEffect(() => setOpen(!isMobile), [isMobile]);

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-semibold tracking-tighter px-2 pt-2">WalletTuner</h1>
      </SidebarHeader>
      <SidebarContent>
        <ResourcesMenu />
        <ExternalsMenu />
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
