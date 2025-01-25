"use client";

import React from "react";

import { BadgeEuro, BookText, ChartArea, CircleUserRound, Command, SquareTerminal } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

const menuLinks = [
  {
    title: "Application",
    items: [
      {
        title: "Accounts",
        url: "#",
        icon: CircleUserRound,
      },
      {
        title: "Transactions",
        url: "#",
        icon: BadgeEuro,
      },
      {
        title: "Graphs",
        url: "#",
        icon: ChartArea,
      },
    ],
  },
  {
    title: "External",
    items: [
      {
        title: "Shortcuts",
        url: "#",
        icon: Command,
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookText,
      },
    ],
  },
];

const LayoutSidebar = () => {
  const [isCommandOpen, setIsCommandOpen] = React.useState(false);

  return (
    <aside className="flex flex-col p-[15px] w-[260px] h-[100vh] gap-y-[30px] bg-accent border-r">
      <div className="flex flex-col gap-y-[15px]">
        <h2 className="text-2xl font-bold px-[10px]">WalletTuner</h2>
      </div>
      {menuLinks.map((section) => (
        <div key={section.title} className="flex flex-col w-[100%] gap-y-[5px]">
          <span className="text-muted-foreground text-sm font-semibold tracking-tight px-[10px] pb-[5px]">
            {section.title}
          </span>
          {section.items.map((link) => (
            <Button key={link.title} variant="ghost" className="items-center justify-start hover:bg-border">
              <link.icon />
              <Link href={link.url}>{link.title}</Link>
            </Button>
          ))}
        </div>
      ))}
      <div></div>
    </aside>
  );
};

export default LayoutSidebar;
