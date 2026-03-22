import styles from './skeleton.module.css'

export const PostSkeleton = () => {
  return (
    <div className={styles.postSkeleton}>
      <div className={styles.imgSkeleton}></div>
      <div className={styles.textSkeleton}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.descSkeleton}></div>
        <div className={styles.descSkeleton}></div>
        <div className={styles.footerSkeleton}></div>
      </div>
    </div>
  )
}

export const BlogSkeleton = () => {
    return (
        <div className={styles.blogSkeleton}>
            {[...Array(6)].map((_, i) => (
                <PostSkeleton key={i} />
            ))}
        </div>
    )
}
