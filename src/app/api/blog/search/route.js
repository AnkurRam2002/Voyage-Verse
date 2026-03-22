import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDb();
    const { searchParams } = new URL(req.url);

    const q        = searchParams.get("q")        || "";
    const location = searchParams.get("location") || "";
    const from     = searchParams.get("from")     || "";
    const to       = searchParams.get("to")       || "";

    // Build query object
    const query = {};

    // Full-text filter on title + desc using $regex (case-insensitive)
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { desc:  { $regex: q, $options: "i" } },
      ];
    }

    // Location substring filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Date range filter
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to)   query.createdAt.$lte = new Date(to + "T23:59:59.999Z");
    }

    const posts = await Post.find(query).sort({ createdAt: -1 }).limit(100);

    const serialized = posts.map((p) => ({
      _id:       p._id.toString(),
      title:     p.title,
      desc:      p.desc,
      img:       p.img,
      slug:      p.slug,
      userId:    p.userId?.toString() || null,
      location:  p.location || null,
      lat:       p.lat  || null,
      lng:       p.lng  || null,
      createdAt: p.createdAt?.toString() || null,
    }));

    return NextResponse.json(serialized);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
};
