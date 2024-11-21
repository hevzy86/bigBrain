import { ConvexError, v } from "convex/values";
import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import { api, internal } from "../convex/_generated/api";
import OpenAI from "openai";
import { Id } from "./_generated/dataModel";
import { access } from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export const getNotes = query({
  args: {
    orgId: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())
      ?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_documentId_token_identifier", (q) =>
        q.eq("tokenIdentifier", userId)
      )
      .order("desc")
      .collect();
    return notes;
  },
});

export const getNote = query({
  args: {
    noteId: v.id("notes"), // Ensure noteId is validated as a valid ID for the 'notes' table
  },
  async handler(ctx, args) {
    try {
      const userId = (await ctx.auth.getUserIdentity())
        ?.tokenIdentifier;

      if (!userId) {
        // Throw a detailed error if user is not found
        throw new ConvexError("User not found");
      }

      // Fetch the note by noteId
      const note = await ctx.db.get(args.noteId);

      // Check if the note exists, if not, throw an error
      if (!note) {
        throw new ConvexError(
          `Note with ID ${args.noteId} not found`
        );
      }

      return note;
    } catch (error) {
      // Log error details for debugging purposes
      console.error("Error fetching note:", error);

      // Return a general error message to the client
      throw new ConvexError("Internal server error");
    }
  },
});

export const createNote = mutation({
  args: {
    text: v.string(),
  },

  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())
      ?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Unauthorized, please login");
    }

    // const embedding = await embed(args.text);

    const noteId = await ctx.db.insert("notes", {
      text: args.text,
      tokenIdentifier: userId,
      // embedding,
    });

    await ctx.scheduler.runAfter(
      0,
      internal.notes.createNoteEmbedding,
      {
        noteId,
        text: args.text,
      }
    );
    // return note;
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },

  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())
      ?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Unauthorized, please login");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new ConvexError("Note not found");
    }

    // Check if the user has permission to delete the note
    if (note.tokenIdentifier !== userId) {
      throw new ConvexError(
        "You do not have permission to delete this note"
      );
    }

    // Delete the note
    await ctx.db.delete(args.noteId);
    return note;
  },
});
async function embed(text: string) {
  const embedding = await client.embeddings.create({
    model: "text-embedding-ada-002",
    dimensions: 1536,
    input: text,
  });
  return embedding.data[0].embedding;
}

export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.number()),
  },

  async handler(ctx, args) {
    // const embedding = await embed(args.text);

    const note = await ctx.db.patch(args.noteId, {
      embedding: args.embedding,
    });
    return note;
  },
});

export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },

  async handler(ctx, args) {
    const embedding = await embed(args.text);

    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding,
    });

    // return note;
  },
});
