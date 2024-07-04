import React, { Suspense } from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'
import PostUser from '@/components/postUser/postUser';
import { getPost } from '@/lib/data';

const SinglePostPage = async ({params}) => {

  const {slug} = params;

  const posts = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
          <Image src={posts.img} alt="" fill className={styles.img} />
        </div>
      <div className={styles.textContainer}>
      <h1 className={styles.title}>{posts.title}</h1>
      <div className={styles.detail}>
      <Suspense fallback={<div>Loading...</div>}>
       <PostUser userId={posts.userId} />
       </Suspense>
        <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>Date</span>
       </div>
      </div>
      <div className={styles.content}>{posts.desc}</div>
      </div>
    </div>
  )
}

export default SinglePostPage