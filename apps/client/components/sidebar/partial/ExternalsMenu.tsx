import React from "react";

import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../base/sidebar";
import externals from "../data/external";

const ExternalsMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>External</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {externals.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton asChild>
                <Link href={item.path}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ExternalsMenu;
