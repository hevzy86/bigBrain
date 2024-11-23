"use client";
import SearchForm from "@/app/_componenets/SearchForm";
import { Doc } from "@/convex/_generated/dataModel";
import React, { useState } from "react";

export default function SettingsPage() {
  const [notes, setNotes] = useState<Doc<"notes">[] | null>(
    null
  );
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Search</h1>
      </div>
      <SearchForm setNotes={setNotes} />

      <ul className="space-y-4">
        <li>
          {notes?.map((note) => (
            <div className="bg-slate-800 rounded p-4">
              {/* <h2>{note.title}</h2> */}
              <p>{note.text.substring(0, 500) + "..."}</p>
            </div>
          ))}
        </li>
      </ul>
    </main>
  );
}
