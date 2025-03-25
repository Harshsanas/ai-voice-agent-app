import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check if user exists
      const existingUsers = await ctx.db.query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .collect();

      // If no user exists, create a new one
      if (existingUsers.length === 0) {
        const newUserData = {
          name: args.name,
          email: args.email,
          credits: 50000,
        };

        const userId = await ctx.db.insert("users", newUserData);
        const newUser = await ctx.db.get(userId);
        return newUser;
      }

      // If user already exists, return the existing user
      return existingUsers[0];
    } catch (error) {
      console.error("Error in CreateUser mutation:", error);
      throw new Error(`Failed to create/retrieve user: ${error.message}`);
    }
  },
});