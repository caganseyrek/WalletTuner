import React from "react";

import Link from "next/link";

import { ExternalLink } from "lucide-react";

import LinkedButton from "@/components/LinkedButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Icon from "./Icon";

const LandingHeader = () => {
  return (
    <header className="p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center justify-start gap-8">
          <h1 className="text-3xl font-semibold tracking-tight flex flex-row items-center justify-start gap-4">
            <Icon />
            WalletTuner
          </h1>
          <nav className="w-fit flex flex-row items-center justify-center">
            <LinkedButton variant="ghost" href="/docs">
              Docs
            </LinkedButton>
            <LinkedButton variant="ghost" href="/docs/developers">
              Developers
            </LinkedButton>
            <LinkedButton variant="ghost" href="https://github.com/caganseyrek/WalletTuner" isExternal>
              Source
              <ExternalLink />
            </LinkedButton>
          </nav>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="flex flex-row items-center justify-center h-5 gap-2">
            <LinkedButton variant="ghost" href="https://github.com/caganseyrek/WalletTuner/issues" isExternal>
              Support
            </LinkedButton>
            <Separator orientation="vertical" decorative className="rounded-lg" />
            <LinkedButton variant="ghost" href="/auth/login">
              Log In
            </LinkedButton>
          </div>
          <Button>
            <Link href="/auth/register">Get WalletTuner for Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
