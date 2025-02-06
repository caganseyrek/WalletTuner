import React from "react";

import { Settings } from "lucide-react";

import { Button } from "../base/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../base/sidebar";
import ExternalsMenu from "./partial/ExternalsMenu";
import ResourcesMenu from "./partial/ResourcesMenu";

const MainSidebar = () => {
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
          <span className="text-sm text-muted-foreground max-w-[12.25rem] truncate">caganseyrek@outlook.com.tr</span>
        </div>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
