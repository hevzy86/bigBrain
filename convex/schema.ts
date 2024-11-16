import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  chats: defineTable({
    documentId: v.id("documents"),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_documentId_tokenIdentifier", [
    "documentId",
    "tokenIdentifier",
  ]),

  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.string(),
    fileId: v.id("_storage"),
  }).index("by_documentId_token_identifier", [
    "tokenIdentifier",
  ]),
  notes: defineTable({
    text: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_documentId_token_identifier", [
    "tokenIdentifier",
  ])



});
