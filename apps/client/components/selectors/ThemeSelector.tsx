"use client";

import React from "react";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import Formatter from "@/shared/lib/formatter";

import { Button } from "../base/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../base/dropdown-menu";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {theme === "dark" ? <Moon /> : theme === "light" ? <Sun /> : <SunMoon />}
          {Formatter.capitalize(theme ?? "")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem onClick={() => setTheme("light")} checked={theme === "light"}>
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={() => setTheme("dark")} checked={theme === "dark"}>
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={() => setTheme("system")} checked={theme === "system"}>
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
