"use client";
import SearchForm from "@/app/_componenets/SearchForm";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import React, { useState } from "react";

export default function SettingsPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Search</h1>
      </div>
      <SearchForm setResults={setResults} />

      <ul className="flex flex-col gap-4">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <Link
                key={result.record._id} // Move the key here
                href={`/dashboard/notes/${result.record._id}`}
              >
                <li key={result.record._id}>
                  <div className=" hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
                    type: Note
                    {result.record.text.substring(0, 500) +
                      "..."}
                  </div>
                </li>
              </Link>
            );
          } else {
            return (
              <Link
                key={result.record._id} // Move the key here
                href={`/dashboard/documents/${result.record._id}`}
              >
                <li key={result.record._id}>
                  <div className=" hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
                    type: Document
                    {result.record.title.substring(0, 500) +
                      "..."}
                    {/* {result.record.description.substring( */}
                    {/* 0,
                      500
                    ) + "..."} */}
                  </div>{" "}
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </main>
  );
}
