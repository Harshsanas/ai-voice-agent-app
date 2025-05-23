import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewRoom = mutation({
  args: {
    coachingOption: v.string(),
    topic: v.string(),
    expertName: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("DiscussionRoom", {
      coachingOption: args.coachingOption,
      topic: args.topic,
      expertName: args.expertName,
    });
    return result;
  },
});

export const GetDiscussionRoom = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  },
});
