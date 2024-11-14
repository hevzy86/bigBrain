import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard/documents">Documents</Link>
          </li>
          <li>
            <Link href="/dashboard/notes">Notes</Link>
          </li>
          <li>
            <Link href="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
}
