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




// export const createDocument = mutation({
//   args: {
//     title: v.string(),
//     fileId: v.id("_storage"),
//     orgId: v.optional(v.string()),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       throw new ConvexError("Not authenticated");
//     }

//     let documentId: Id<"documents">;

//     if (args.orgId) {
//       const isMember = await hasOrgAccess(ctx, args.orgId);
//       if (!isMember) {
//         throw new ConvexError("You do not have access to this organization");
//       }

//       documentId = await ctx.db.insert("documents", {
//         title: args.title,
//         fileId: args.fileId,
//         description: "",
//         orgId: args.orgId,
//       });
//     } else {
//       documentId = await ctx.db.insert("documents", {
//         title: args.title,
//         tokenIdentifier: userId,
//         fileId: args.fileId,
//         description: "",
//       });
//     }

//     await ctx.scheduler.runAfter(
//       0,
//       internal.documents.generateDocumentDescription,
//       {
//         fileId: args.fileId,
//         documentId,
//       }
//     );
//   },
// });