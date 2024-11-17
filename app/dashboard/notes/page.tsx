"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import CreateNoteButton from "./CreateNoteButton";

export default function Notes() {
  const notes = useQuery(api.notes.getNotes, {});
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Notes</h1>
        <CreateNoteButton>Create a note</CreateNoteButton>
      </div>

  <ul>
  {notes?.map((note) => {
    console.log(note); // Move console.log outside JSX
    return (
      <li key={note._id}>
        <Link href={`/dashboard/notes/${note._id}`}>
          {note.text.substring(0, 20) + "..."}
        </Link>
      </li>
    );
  })}
</ul>
    </main>
  );
}