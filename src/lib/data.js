import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find().lean();
    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    }));
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug }).lean();
    if (!post) return null;
    return {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const getPostById = async (id) => {
  try {
    connectToDb();
    const post = await Post.findById(id).lean();
    if (!post) return null;
    return {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post by ID!");
  }
};

export const getUser = async (id) => {
  noStore();
  try {
    connectToDb();
    const user = await User.findById(id).lean();
    if (!user) return null;
    return {
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find().lean();
    return users.map(user => ({
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    }));
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const getUserPosts = async (userId) => {
  try {
    connectToDb();
    const posts = await Post.find({ userId }).lean();
    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    }));
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user posts!");
  }
};

export const getAdminStats = async () => {
  noStore();
  try {
    connectToDb();
    
    // Get stats from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const postStats = await Post.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const userStats = await User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return { postStats, userStats };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch admin stats!");
  }
};