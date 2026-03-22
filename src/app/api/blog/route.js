import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    const serialized = posts.map(p => ({
      _id: p._id.toString(),
      title: p.title,
      desc: p.desc,
      img: p.img,
      slug: p.slug,
      userId: p.userId?.toString() || null,
      location: p.location || null,
      lat: p.lat || null,
      lng: p.lng || null,
      createdAt: p.createdAt?.toString() || null,
    }));
    return NextResponse.json(serialized);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};