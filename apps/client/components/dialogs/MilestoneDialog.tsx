"use client";

import React from "react";

import { Account, Milestone } from "@wallettuner/resource-types";
import { Pen, PlusCircle, Save } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select";
import DatePicker from "@/components/selectors/DatePicker";

interface MilestoneDialogProps {
  milestone?: Milestone.MilestonePropsWithString;
}

const MilestoneDialog = ({ milestone }: MilestoneDialogProps) => {
  const accounts: Account.AccountPropsWithString[] = [
    {
      _id: "92149128912",
      user_id: "912849129841",
      name: "Test",
      balance: 100,
      total_income: 200,
      total_expense: 100,
      created_at: "09/02/2025 at 12:02",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={milestone ? "ghost" : "outline"} size={milestone ? "icon" : "default"}>
          {milestone ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Milestone
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{milestone ? "Edit Milestone" : "Create a new Milestone"}</DialogTitle>
          <DialogDescription>You can fill or edit the field below then click save.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-start justify-center gap-6">
          <div>
            <div>
              <Label htmlFor="account">Account</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={"Select an account"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {accounts.length > 0 ? (
                      accounts.map((account) => (
                        <SelectItem value={account._id} key={account._id}>
                          {account.name}
                        </SelectItem>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No accounts found</span>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={milestone ? milestone.name : ""} />
            </div>
            <div>
              <Label htmlFor="targetamount">Target Amount</Label>
              <Input type="number" id="targetamount" defaultValue={milestone ? milestone.target_amount : ""} />
            </div>
          </div>
          <div>
            <div>
              <Label htmlFor="startdate">Start Date</Label>
              <DatePicker selectedDate={milestone ? milestone.start_date : undefined} />
            </div>
            <div>
              <Label htmlFor="enddate">End Date</Label>
              <DatePicker selectedDate={milestone ? milestone.end_date : undefined} />
            </div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">Only editable fields are shown.</span>
        <DialogFooter>
          <Button className="w-full">
            <Save /> {"Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneDialog;
