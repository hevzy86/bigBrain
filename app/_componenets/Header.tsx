"use client";

import { ModeToggle } from "@/components/mode-toggle";
// import { Button } from "@/components/ui/button";
// import { createDocument } from "@/convex/documents";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="bg-slate-900 py-4">
      <div className="mx-auto conainer flex justify-between items-center">
          <div className="flex items-center gap-4 text-2xl">
            <Image src="/logo.png" alt="BigBrain" width={40} height={40} className="rounded "/>
            BigBrain</div>
            <div>
                <Unauthenticated>
                  <SignInButton />
                </Unauthenticated>
                <Authenticated>
                  <div className="flex items-center gap-4">
                      <ModeToggle />
                      <UserButton />
                  </div>
                </Authenticated>
            </div>
      </div>
    </div>
  );
}
