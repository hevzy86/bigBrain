// "use client";

import { ModeToggle } from "@/components/mode-toggle";
// import { Button } from "@/components/ui/button";
// import { createDocument } from "@/convex/documents";
import Image from "next/image";
import React from "react";
import HeaderActions from "./HeaderActions";
import Link from "next/link";

export default function Header() {
  return (
    <div className="z-10 relative dark:bg-slate-900 bg-slate-50 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="flex items-center gap-4 text-2xl"
          >
            <Image
              src="/logo.png"
              width={40}
              height={40}
              className="rounded"
              alt="an image of a brain"
            />
            BIGBRAIN
          </Link>

          <nav className="flex items-center gap-8">
            {/* <OrganizationSwitcher />

            <Authenticated>
              <Link href="/dashboard" className="hover:text-slate-300">
                Dashboard
              </Link>
            </Authenticated> */}

            <Link
              href="/dashboard"
              className=" hover: text-slate-300"
            >
              Documents
            </Link>
          </nav>
        </div>

        <div className="flex gap-4 items-center">
          <ModeToggle />

          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
