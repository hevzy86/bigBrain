import React from "react";
import CreateNoteForm from "./CreateNoteForm";
import CreateNoteButton from "./CreateNoteButton";

export default function Notes() {
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Notes</h1>
        <CreateNoteButton children="Create a note"/>
      </div>
    </main>
  );
}
