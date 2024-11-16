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

    const note = await ctx.db.insert("notes", {
      text: args.text,
      tokenIdentifier: userId,
    });
    return note;
  },
});
