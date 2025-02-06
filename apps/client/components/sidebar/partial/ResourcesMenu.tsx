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
import resources from "../data/resources";

const ResourcesMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Resources</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {resources.map((item) => (
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

export default ResourcesMenu;
