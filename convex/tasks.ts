import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get all tasks for the authenticated user
export const getTasks = query({
  args: {
    filter: v.optional(v.union(v.literal("all"), v.literal("completed"), v.literal("pending"))),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    let query = ctx.db.query("tasks").withIndex("by_user", (q) => q.eq("userId", userId));

    // Apply completion filter
    if (args.filter === "completed") {
      query = ctx.db.query("tasks").withIndex("by_user_and_completed", (q) => 
        q.eq("userId", userId).eq("completed", true)
      );
    } else if (args.filter === "pending") {
      query = ctx.db.query("tasks").withIndex("by_user_and_completed", (q) => 
        q.eq("userId", userId).eq("completed", false)
      );
    }

    let tasks = await query.order("desc").collect();

    // Apply search filter
    if (args.search && args.search.trim()) {
      const searchTerm = args.search.toLowerCase().trim();
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm))
      );
    }

    return tasks;
  },
});

// Create a new task
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    if (!args.title.trim()) {
      throw new Error("Task title cannot be empty");
    }

    return await ctx.db.insert("tasks", {
      title: args.title.trim(),
      description: args.description?.trim(),
      completed: false,
      userId,
      dueDate: args.dueDate,
      priority: args.priority,
    });
  },
});

// Update an existing task
export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }

    if (task.userId !== userId) {
      throw new Error("Not authorized to update this task");
    }

    const updates: any = {};
    if (args.title !== undefined) {
      if (!args.title.trim()) {
        throw new Error("Task title cannot be empty");
      }
      updates.title = args.title.trim();
    }
    if (args.description !== undefined) {
      updates.description = args.description?.trim();
    }
    if (args.dueDate !== undefined) {
      updates.dueDate = args.dueDate;
    }
    if (args.priority !== undefined) {
      updates.priority = args.priority;
    }

    await ctx.db.patch(args.id, updates);
  },
});

// Toggle task completion status
export const toggleTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }

    if (task.userId !== userId) {
      throw new Error("Not authorized to update this task");
    }

    await ctx.db.patch(args.id, {
      completed: !task.completed,
    });
  },
});

// Delete a task
export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }

    if (task.userId !== userId) {
      throw new Error("Not authorized to delete this task");
    }

    await ctx.db.delete(args.id);
  },
});

// Get task statistics
export const getTaskStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const allTasks = await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const completed = allTasks.filter(task => task.completed).length;
    const pending = allTasks.filter(task => !task.completed).length;
    const total = allTasks.length;

    return {
      total,
      completed,
      pending,
    };
  },
});
