"use client";
import { cn } from "@/lib/utils";
import {
  ClipboardPen,
  Cog,
  FilesIcon,
  LayoutDashboard,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathName = usePathname();
  return (
    <nav>
      <ul className="space-y-6">
        <li>
          <Link
            className={cn("nav-link", {
              "text-cyan-400 font-bold": pathName.endsWith(
                "/dashboard/search"
              ),
            })}
            href="/dashboard/search"
          >
            <SearchIcon />
            Search
          </Link>
        </li>

        <li>
          <Link
            className={cn("nav-link", {
              "text-cyan-400 font-bold": pathName.endsWith(
                "/dashboard/documents"
              ),
            })}
            href="/dashboard/documents"
          >
            <FilesIcon />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn("nav-link", {
              "text-cyan-400 font-bold": pathName.endsWith(
                "/dashboard/notes"
              ),
            })}
            href="/dashboard/notes"
          >
            <ClipboardPen />
            Notes
          </Link>
        </li>
        <li>
          <Link
            className={cn("nav-link", {
              "text-cyan-400 font-bold": pathName.endsWith(
                "/dashboard/settings"
              ),
            })}
            href="/dashboard/settings"
          >
            <Cog />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
