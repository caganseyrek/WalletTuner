import React from "react";

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

import { AccountProps } from "../columns/AccountColumns";

interface AccountDialogProps {
  account?: AccountProps;
}

const AccountDialog = ({ account }: AccountDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={account ? "ghost" : "outline"} size={account ? "icon" : "default"}>
          {account ? (
            <Pen />
          ) : (
            <>
              <PlusCircle /> Create a new Account
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{account ? "Edit Account" : "Create a new Account"}</DialogTitle>
          <DialogDescription>You fill or edit the field below then click save.</DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="accountname">Account Name</Label>
          <Input id="accountname" defaultValue={account ? account.name : ""} />
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

export default AccountDialog;
