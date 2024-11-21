"use client";
import React, { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import CreateNoteButton from "./CreateNoteButton";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function NotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notes = useQuery(api.notes.getNotes, {});
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
const hasNotes = notes && notes?.length >0 ;
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton children={"Add a Note"} />
      </div>



      {!hasNotes && (

<div>
  <div className="py-12 flex flex-col justify-center items-center gap-8">
  <Image
    src="/documents.svg"
    width={200}
    height={200}
    alt="A picture of a girl holding documents"
  />
  <h2 className="text-2xl">You have no notes</h2>
  <CreateNoteButton children={"Add a Note"} />
  </div>
</div>



      )}

{hasNotes && (

      <div className="flex gap-12">
        <ul className="space-y-2 w-[200px]">
          {notes?.map((note) => {
            // console.log(note); // Move console.log outside JSX
            return (
              <li
                key={note._id}
                className={cn("text-base hover:text-cyan-100", {
                  "text-cyan-300": note._id === noteId,
                })}
              >
                <Link href={`/dashboard/notes/${note._id}`}>
                  {note.text.substring(0, 24) + "..."}
                </Link>
              </li>
            );
          })}
        </ul>
      <div className="w-full rounded p-4">{children}</div>
      </div>

)}
    </main>
  );
}
