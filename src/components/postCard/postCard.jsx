import React from "react"
import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"
import { Clock, MapPin } from "lucide-react"

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

const PostCard = ({post, view = "grid"}) => {
  return (
    <div className={`${styles.container} ${view === "list" ? styles.listView : ""}`}>
      <div className={styles.imageContainer}>
        {post.img ? (
          <Image src={post.img} alt={post.title} fill className={styles.img} />
        ) : (
          <Image src="/noavatar.png" alt="No Avatar" fill className={styles.img} />
        )}
        <div className={styles.overlay} />
        <span className={styles.date}>{post.createdAt?.toString().slice(0, 10)}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.metadata}>
          <span className={styles.pill}>
            <Clock size={12} />
            {calculateReadingTime(post.desc || post.body || "")} min read
          </span>
          {post.location && (
            <span className={styles.pillAccent}>
              <MapPin size={12} />
              {post.location}
            </span>
          )}
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.desc}>{post.desc || post.body}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          Explore Story <span>&rarr;</span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard