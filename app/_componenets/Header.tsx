// "use client";

import { ModeToggle } from "@/components/mode-toggle";
// import { Button } from "@/components/ui/button";
// import { createDocument } from "@/convex/documents";
import Image from "next/image";
import React from "react";
import HeaderActions from "./HeaderActions";

export default function Header() {
  return (
    <div className="bg-slate-900 py-4">
      <div className="mx-auto conainer flex justify-between items-center">
        <div className="flex items-center gap-4 text-2xl">
          <Image
            src="/logo.png"
            alt="BigBrain"
            width={40}
            height={40}
            className="rounded "
          />
          BigBrain
        </div>
        <div className="flex  gap-4 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
