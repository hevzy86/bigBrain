"use client";
import React, { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import CreateNoteButton from "./CreateNoteButton";

export default function NotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notes = useQuery(api.notes.getNotes, {});
   
  return (
    <main className="w-full space-y-8">
       
    

      {children}
    </main>
  );
}
