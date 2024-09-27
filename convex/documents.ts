import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const getDocuments = query({
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});

// Create a new task with the given text
export const createDocument = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("documents", { title: args.title });
    return newTaskId;
  },
});