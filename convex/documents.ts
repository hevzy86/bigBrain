import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getDocuments = query({
  handler: async (ctx) => {
    const userID = (await ctx.auth.getUserIdentity())
      ?.tokenIdentifier;

    // console.log(userID);

    if (!userID) {
      return [];
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_token_identifier", (q) =>
        q.eq("tokenIdentifier", userID)
      )
      .collect();
  },
});

// Create a new task with the given text
export const createDocument = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const userID = (await ctx.auth.getUserIdentity())
      ?.tokenIdentifier;

    // console.log(userID);

    if (!userID) {
      throw new ConvexError("Unauthorized");
    }
    const newTaskId = await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userID,
    });
    return newTaskId;
  },
});
