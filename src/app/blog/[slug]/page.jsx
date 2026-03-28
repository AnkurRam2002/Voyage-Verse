import React, { Suspense } from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'
import PostUser from '@/components/postUser/postUser';
import { getPost } from '@/lib/data';

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post?.title,
    description: post?.desc,
  };
};

const SinglePostPage = async ({params}) => {
  const {slug} = await params;
  const raw = await getPost(slug);

  if (!raw) return <div>Post not found</div>;

  // Serialize Mongoose doc to plain object so location & all fields pass through
  const post = {
    _id: raw._id.toString(),
    title: raw.title,
    desc: raw.desc,
    img: raw.img,
    slug: raw.slug,
    userId: raw.userId,
    location: raw.location || null,
    lat: raw.lat || null,
    lng: raw.lng || null,
    createdAt: raw.createdAt?.toString() || null,
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {post.img && <Image src={post.img} alt={post.title} fill className={styles.img} priority />}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{post.title}</h1>
        </div>
      </div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading author...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.createdAt?.toString().slice(0, 10)}</span>
          </div>
          {post.location && (
            <div className={styles.detailText}>
              <span className={styles.detailTitle}>Location</span>
              <span className={styles.detailValue}>{post.location}</span>
            </div>
          )}
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.desc }}
        />
      </div>
    </div>
  );
};

export default SinglePostPage