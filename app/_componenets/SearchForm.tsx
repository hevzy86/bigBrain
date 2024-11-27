"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
// import { createDocument } from "@/convex/documetns";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { doesNotMatch } from "assert";
import {
  Authenticated,
  Unauthenticated,
  useAction,
  useMutation,
  useQuery,
} from "convex/react";
import { v } from "convex/values";

export default function SearchForm({
  setResults,
}: {
 setResults: (notes: typeof api.search.searchAction._returnType) => void;


}) {
  const searchAction = useAction(api.search.searchAction);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const text = formData.get("text") as string;
        await searchAction({ search: text }).then(setResults);
        form.reset();
      }}
    >
      <div className="flex gap-2">
        <Input
          placeholder="Search over all your notes and documents using vector search"
          required
          name="text"
        />
        <Button>Search</Button>
      </div>
    </form>
  );
}
