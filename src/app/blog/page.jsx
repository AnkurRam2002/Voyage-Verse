import BlogList from './BlogList'
import styles from './blog.module.css'
import React from 'react'

export const metadata = {
  title: "Stories | Voyage Verse",
  description: "Explore a collection of captivating travel stories from around the globe.",
};

const BASE_URL = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_DEV_URL
  : process.env.NEXT_PUBLIC_PROD_URL;

const BlogPage = async () => {
  let posts = [];
  try {
    const res = await fetch(`${BASE_URL}/api/blog`, { next: { revalidate: 60 } });
    if (res.ok) posts = await res.json();
  } catch (e) {
    console.error('Failed to fetch posts:', e);
  }

  return (
    <div className={styles.container}>
      <BlogList posts={posts} />
    </div>
  );
};

export default BlogPage