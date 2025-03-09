"use client";

import React from "react";

import { Save, Settings } from "lucide-react";

import Formatter from "@/shared/lib/formatter";

import { Button } from "../../base/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../base/dialog";
import { Label } from "../../base/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../base/select";
import { Separator } from "../../base/separator";
import ThemeSelector from "../selectors/ThemeSelector";

const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>You can change the settings then click save.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-between gap-4">
          <Label>Selected Theme</Label>
          <ThemeSelector />
        </div>
        <Separator decorative className="rounded-lg" />
        {Formatter.getCurrencyFormats().map((item) => (
          <div key={item.label} className="flex flex-row items-center justify-between gap-4">
            <Label>{item.label}</Label>
            <Select>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder={"Select"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{item.label}</SelectLabel>
                  {item.options.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                      <span className="inline-block">{option.label}</span>{" "}
                      <span className="inline-block text-xs text-muted-foreground">({option.desc})</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
        <DialogFooter>
          <Button className="w-full">
            <Save /> Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
