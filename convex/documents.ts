import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

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
export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },

  handler: async (ctx, args) => {
    const userID = (await ctx.auth.getUserIdentity())
      ?.tokenIdentifier;

    // console.log(userID);

    if (!userID) {
      return [];
    }
    const document = await ctx.db.get(args.documentId);

    if (!document) {
      return null;
    }

    if (document?.tokenIdentifier !== userID) {
      return null;
    }
    return {...document, documentUrl:await ctx.storage.getUrl(document.fileId)};
  },
});

// Create a new task with the given text
export const createDocument = mutation({
  args: { title: v.string(), fileId: v.id("_storage") },
  handler: async (ctx, args) => {
    const userID = (await ctx.auth.getUserIdentity())
      ?.tokenIdentifier;

    if (!userID) {
      throw new ConvexError("Unauthorized");
    }
    await ctx.db.insert("documents", {
      title: args.title,
      fileId: args.fileId,
      tokenIdentifier: userID,
    });
  },
});
