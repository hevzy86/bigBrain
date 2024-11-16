import {
  ClipboardPen,
  Cog,
  FilesIcon,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import SideNav from "../_componenets/SideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-24 mx-auto pt-12">
      <SideNav/>
      {children}
    </div>
  );
}
